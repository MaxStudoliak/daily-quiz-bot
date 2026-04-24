import "dotenv/config";
import { Bot } from "grammy";
import { handleStart, handleHelp } from "./commands/start";
import {
  handleCategorySelect,
  handleAnswer,
  handleRestart,
  handleStats,
} from "./handlers/quiz";

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ BOT_TOKEN is not set in .env file");
  process.exit(1);
}

const bot = new Bot(token);

// ──────────────────────────────────────────────
//  Commands
// ──────────────────────────────────────────────
bot.command("start", handleStart);
bot.command("quiz", handleStart);
bot.command("help", handleHelp);
bot.command("stats", (ctx) => handleStats(ctx, false));

// ──────────────────────────────────────────────
//  Callback Query handlers
// ──────────────────────────────────────────────
bot.callbackQuery(/^category:(.+)$/, async (ctx) => {
  const categoryId = ctx.match[1];
  await handleCategorySelect(ctx, categoryId);
});

bot.callbackQuery(/^answer:(\d+)$/, async (ctx) => {
  const answerIndex = parseInt(ctx.match[1], 10);
  await handleAnswer(ctx, answerIndex);
});

bot.callbackQuery("restart", handleRestart);

bot.callbackQuery("show_stats", async (ctx) => {
  await handleStats(ctx, true);
});

// ──────────────────────────────────────────────
//  Error handling
// ──────────────────────────────────────────────
bot.catch((err) => {
  console.error("🔴 Bot error:", err.message);
});

// ──────────────────────────────────────────────
//  Start bot
// ──────────────────────────────────────────────
bot.start({
  onStart: (info) => {
    console.log(`✅ Bot started: @${info.username}`);
    console.log(`🎯 DailyQuiz Bot is running!`);
  },
});
