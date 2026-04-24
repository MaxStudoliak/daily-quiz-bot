import { Context } from "grammy";
import { InlineKeyboard } from "grammy";
import { categories } from "../data/questions";
import { clearSession } from "../utils/session";

export async function handleStart(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  if (userId) clearSession(userId);

  const keyboard = new InlineKeyboard();
  categories.forEach((cat) => {
    keyboard.text(`${cat.emoji} ${cat.name}`, `category:${cat.id}`).row();
  });

  await ctx.reply(
    `👋 *Привіт, ${ctx.from?.first_name || "друже"}!*\n\n` +
      `🎯 Ласкаво просимо до *DailyQuiz Bot*!\n\n` +
      `Тут тебе чекають цікаві запитання з різних тематик.\n` +
      `Кожна вікторина містить *5 запитань* з варіантами відповідей.\n\n` +
      `📂 *Оберіть категорію:*`,
    {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    }
  );
}

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    `ℹ️ *Як грати в DailyQuiz Bot:*\n\n` +
      `1️⃣ Натисніть /start або /quiz\n` +
      `2️⃣ Оберіть категорію\n` +
      `3️⃣ Відповідайте на 5 запитань\n` +
      `4️⃣ Отримайте свій результат!\n\n` +
      `📋 *Команди:*\n` +
      `/start — почати заново\n` +
      `/quiz — обрати категорію\n` +
      `/help — ця довідка\n` +
      `/stats — переглянути статистику\n\n` +
      `💡 *Підказка:* після кожної відповіді ти дізнаєшся правильну відповідь та пояснення!`,
    { parse_mode: "Markdown" }
  );
}
