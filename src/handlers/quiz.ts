import { Context } from "grammy";
import { InlineKeyboard } from "grammy";
import { getCategoryById } from "../data/questions";
import {
  getSession,
  setSession,
  clearSession,
  createSession,
} from "../utils/session";
import { getScoreEmoji, getScoreMessage, formatAnswerHistory } from "../utils/score";
import { UserSession } from "../utils/types";

// User stats stored in memory
const userStats = new Map<number, { played: number; totalScore: number; bestScore: number }>();

export async function handleCategorySelect(ctx: Context, categoryId: string): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  const category = getCategoryById(categoryId);
  if (!category) {
    await ctx.answerCallbackQuery("❌ Категорія не знайдена");
    return;
  }

  const session = createSession(categoryId, category.questions.length);
  setSession(userId, session);

  await ctx.answerCallbackQuery(`${category.emoji} Починаємо!`);
  await sendQuestion(ctx, session);
}

async function sendQuestion(ctx: Context, session: UserSession): Promise<void> {
  const category = getCategoryById(session.categoryId);
  if (!category) return;

  const question = category.questions[session.currentQuestionIndex];
  const questionNumber = session.currentQuestionIndex + 1;
  const total = session.totalQuestions;

  const keyboard = new InlineKeyboard();
  question.options.forEach((option, index) => {
    keyboard.text(`${String.fromCharCode(65 + index)}. ${option}`, `answer:${index}`).row();
  });

  const progressBar = buildProgressBar(questionNumber - 1, total);

  await ctx.reply(
    `${category.emoji} *${category.name}* | Запитання ${questionNumber}/${total}\n` +
      `${progressBar}\n\n` +
      `❓ *${question.text}*`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }
  );
}

export async function handleAnswer(ctx: Context, answerIndex: number): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = getSession(userId);
  if (!session) {
    await ctx.answerCallbackQuery("⚠️ Сесія не знайдена. Почніть знову: /start");
    return;
  }

  const category = getCategoryById(session.categoryId);
  if (!category) return;

  const question = category.questions[session.currentQuestionIndex];
  const isCorrect = answerIndex === question.correctIndex;

  // Update session
  session.answers.push(isCorrect);
  if (isCorrect) session.score++;
  session.currentQuestionIndex++;
  setSession(userId, session);

  // Answer callback
  await ctx.answerCallbackQuery(isCorrect ? "✅ Правильно!" : "❌ Неправильно!");

  // Send result for this question
  const correctOption = question.options[question.correctIndex];
  const selectedOption = question.options[answerIndex];

  let resultText = isCorrect
    ? `✅ *Правильно!*\n\n`
    : `❌ *Неправильно!*\n` +
      `Ваша відповідь: _${selectedOption}_\n` +
      `Правильна відповідь: *${correctOption}*\n\n`;

  resultText += `💡 ${question.explanation}`;

  await ctx.reply(resultText, { parse_mode: "Markdown" });

  // Check if quiz is done
  if (session.currentQuestionIndex >= session.totalQuestions) {
    await showResults(ctx, session, userId);
  } else {
    // Short delay feel, then next question
    await sendQuestion(ctx, session);
  }
}

async function showResults(ctx: Context, session: UserSession, userId: number): Promise<void> {
  const { score, totalQuestions, answers } = session;
  const emoji = getScoreEmoji(score, totalQuestions);
  const message = getScoreMessage(score, totalQuestions);
  const history = formatAnswerHistory(answers);

  // Update stats
  const existing = userStats.get(userId) || { played: 0, totalScore: 0, bestScore: 0 };
  existing.played++;
  existing.totalScore += score;
  existing.bestScore = Math.max(existing.bestScore, score);
  userStats.set(userId, existing);

  clearSession(userId);

  const keyboard = new InlineKeyboard()
    .text("🔄 Грати знову", "restart")
    .row()
    .text("📊 Статистика", "show_stats");

  await ctx.reply(
    `${emoji} *Вікторина завершена!*\n\n` +
      `📊 Результат: *${score}/${totalQuestions}*\n` +
      `${history}\n\n` +
      `💬 ${message}`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }
  );
}

export async function handleRestart(ctx: Context): Promise<void> {
  const { InlineKeyboard: IK } = await import("grammy");
  const { categories } = await import("../data/questions");

  const keyboard = new IK();
  categories.forEach((cat) => {
    keyboard.text(`${cat.emoji} ${cat.name}`, `category:${cat.id}`).row();
  });

  await ctx.answerCallbackQuery("🔄 Нова гра!");
  await ctx.reply(`📂 *Оберіть категорію:*`, {
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });
}

export async function handleStats(ctx: Context, fromCallback = false): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  if (fromCallback) await ctx.answerCallbackQuery();

  const stats = userStats.get(userId);
  if (!stats || stats.played === 0) {
    const text = `📊 *Ваша статистика*\n\nВи ще не зіграли жодної гри!\nНатисніть /start щоб почати.`;
    if (fromCallback) {
      await ctx.reply(text, { parse_mode: "Markdown" });
    } else {
      await ctx.reply(text, { parse_mode: "Markdown" });
    }
    return;
  }

  const avg = (stats.totalScore / stats.played).toFixed(1);
  const text =
    `📊 *Ваша статистика*\n\n` +
    `🎮 Ігор зіграно: *${stats.played}*\n` +
    `⭐ Найкращий результат: *${stats.bestScore}/5*\n` +
    `📈 Середній бал: *${avg}/5*\n` +
    `🏆 Загальний бал: *${stats.totalScore}*`;

  await ctx.reply(text, { parse_mode: "Markdown" });
}

function buildProgressBar(current: number, total: number): string {
  const filled = "█".repeat(current);
  const empty = "░".repeat(total - current);
  return `[${filled}${empty}]`;
}
