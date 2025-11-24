
export enum CEFRLevel {
  A1 = "A1 (Beginner)",
  A2 = "A2 (Elementary)",
  B1 = "B1 (Intermediate)",
  UNKNOWN = "Unknown"
}

export type User = {
  name: string;
  level: CEFRLevel;
};

export type AppView = "login" | "dashboard" | "diagnostic" | "chat" | "exercise";

export type QuestionType = 'multiple-choice' | 'fill-in-the-blank' | 'order-sentence';

export type DiagnosticQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  options: string[]; // For multiple choice or the words to order
  correctAnswer: string;
};

export type ExerciseQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export type IncorrectAnswer = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};
