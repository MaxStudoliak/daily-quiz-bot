export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  questions: Question[];
}

export interface UserSession {
  categoryId: string;
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  answers: boolean[];
}

export type BotContext = import("grammy").Context & {
  session?: UserSession;
};
