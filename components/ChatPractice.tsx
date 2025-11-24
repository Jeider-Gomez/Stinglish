import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { User, ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface ChatPracticeProps {
  user: User;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);


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
    try {
      const session = createChatSession(user.level);
      setChat(session);
      setMessages([{ role: 'model', text: `Hello ${user.name}! I'm Stinglish. Let's practice your English. You can start by asking me a question or telling me about your day.` }]);
    } catch (error) {
       console.error("Failed to initialize chat:", error);
       const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
       setMessages([{ role: 'model', text: `Sorry, I couldn't start our conversation. There might be an issue with the configuration.\n\nPlease ensure the API Key is set up correctly for this deployment.\n\nError: ${errorMessage}` }]);
    }
  }, [user.name, user.level]);


  const handleSend = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !chat) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the model's response to show the typing indicator
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const result = await chat.sendMessage({ message: currentInput });
      const modelResponse: ChatMessage = { role: 'model', text: result.text };
      
      setMessages((prev) => {
          const newMessages = [...prev];
          // Replace the last message (the placeholder) with the actual response
          newMessages[newMessages.length - 1] = modelResponse;
          return newMessages;
      });

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = errorMessage;
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, chat]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl shadow-2xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-secondary">Conversational Practice</h2>
        <p className="text-sm text-neutral-dark">Chat with Stinglish to improve your fluency.</p>
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-6">
        {messages.map((msg, index) => {
            const isLastMessage = index === messages.length - 1;
            const isModelTyping = isLastMessage && msg.role === 'model' && isLoading;

            return (
              <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md">S</div>
                )}
                <div
                  className={`max-w-md p-4 rounded-2xl shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-secondary rounded-bl-none border border-gray-200'}`}
                >
                  {isModelTyping && !msg.text ? <TypingIndicator /> : msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md">{user.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
            )
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                    handleSend(e);
                }
            }}
            placeholder={chat ? "Type your message..." : "Chat is unavailable."}
            className="flex-1 w-full px-5 py-3 bg-gray-100 text-secondary border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-neutral-dark"
            disabled={isLoading || !chat}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !chat}
            className="w-12 h-12 flex-shrink-0 bg-primary text-white rounded-full hover:bg-opacity-90 disabled:bg-neutral disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-lg"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPractice;