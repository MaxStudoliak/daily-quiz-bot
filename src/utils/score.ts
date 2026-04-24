export function getScoreEmoji(score: number, total: number): string {
  const percent = (score / total) * 100;
  if (percent === 100) return "🏆";
  if (percent >= 80) return "🥇";
  if (percent >= 60) return "🥈";
  if (percent >= 40) return "🥉";
  return "📚";
}

export function getScoreMessage(score: number, total: number): string {
  const percent = (score / total) * 100;
  if (percent === 100) return "Неймовірно! Ти справжній експерт!";
  if (percent >= 80) return "Чудовий результат! Ти дуже добре знаєш цю тему!";
  if (percent >= 60) return "Непоганий результат! Є над чим попрацювати.";
  if (percent >= 40) return "Хороша спроба! Варто повторити матеріал.";
  return "Не здавайся! Спробуй ще раз і покращ результат!";
}

export function formatAnswerHistory(answers: boolean[]): string {
  return answers.map((a) => (a ? "✅" : "❌")).join(" ");
}
