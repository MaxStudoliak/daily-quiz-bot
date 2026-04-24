import { UserSession } from "./types";

const sessions = new Map<number, UserSession>();

export function getSession(userId: number): UserSession | undefined {
  return sessions.get(userId);
}

export function setSession(userId: number, session: UserSession): void {
  sessions.set(userId, session);
}

export function clearSession(userId: number): void {
  sessions.delete(userId);
}

export function createSession(categoryId: string, totalQuestions: number): UserSession {
  return {
    categoryId,
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions,
    answers: [],
  };
}
