export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan — .env faylini tekshiring.",
    );
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!res.ok) {
      console.error("Telegram API xatosi:", await res.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error("Telegramga yuborishda xatolik:", err);
    return false;
  }
}
