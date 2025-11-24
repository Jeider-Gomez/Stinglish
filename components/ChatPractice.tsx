
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { User, ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';
import Loader from './common/Loader';

interface ChatPracticeProps {
  user: User;
}

const ChatPractice: React.FC<ChatPracticeProps> = ({ user }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const session = createChatSession(user.level);
    setChat(session);
    setMessages([{ role: 'model', text: `Hello ${user.name}! I'm Stinglish. Let's practice your English. You can start by asking me a question or telling me about your day.` }]);
  }, [user.name, user.level]);


  const handleSend = useCallback(async () => {
    if (!input.trim() || !chat) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: input });
      let modelResponse = '';
      for await (const chunk of result) {
        modelResponse += chunk.text;
        setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {...lastMessage, text: modelResponse};
                return newMessages;
            }
            return [...prev, {role: 'model', text: modelResponse}];
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, chat]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-secondary">Conversational Practice</h2>
        <p className="text-sm text-neutral-dark">Chat with Stinglish to improve your fluency.</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">S</div>
            )}
            <div
              className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-neutral-light text-secondary rounded-bl-none'}`}
            >
              {msg.text}
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 self-end mr-2"></div>
            <div className="p-3 rounded-2xl bg-neutral-light rounded-bl-none">
              <Loader size="sm" text="" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-white rounded-b-xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-white text-secondary border border-neutral rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder-neutral-dark"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary text-white rounded-full hover:bg-opacity-90 disabled:bg-neutral disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPractice;
