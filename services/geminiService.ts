import { GoogleGenAI, Chat } from "@google/genai";
import type { IncorrectAnswer } from '../types';

// Initialize the AI client.
// The API key is injected from the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const topics = ["Present Simple vs. Continuous", "Past Simple", "Prepositions of Time", "Phrasal Verbs (Common)", "Articles (a, an, the)"];

export const createChatSession = (level: string): Chat => {
  return ai.chats.create({
    model: 'gemini-flash-latest',
    config: {
      systemInstruction: `You are Stinglish, a friendly and supportive English tutor. You are chatting with a student whose level is ${level}. Your tone should be professional, pedagogical, and motivating. Keep your responses tailored to their level. Do not reveal you are an AI model.`,
    },
  });
};

export const getWeaknessTopic = async (incorrectAnswers: IncorrectAnswer[]): Promise<string | null> => {
  if (incorrectAnswers.length === 0) return null;
  try {
    const prompt = `Based on these incorrect answers from an English learner, identify the single most important grammar or vocabulary topic they should practice. The available topics are: ${topics.join(', ')}. Please respond with only one of these topic names. If no specific topic fits well, suggest the most relevant one based on the errors.

Incorrect Answers:
${incorrectAnswers.map(a => `- Question: "${a.question}", User Answer: "${a.userAnswer}", Correct: "${a.correctAnswer}"`).join('\n')}

Topic to practice:`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    
    let topic = response.text.trim();
    topic = topic.replace(/[\`"']/g, '');

    if (topics.includes(topic)) {
      return topic;
    }
    
    console.warn("Gemini suggested a topic not in the list:", topic);
    const foundTopic = topics.find(t => t.toLowerCase().includes(topic.toLowerCase()));
    if (foundTopic) {
        return foundTopic;
    }

    return null;
  } catch (error) {
    console.error("Error generating weakness topic:", error);
    return null;
  }
};