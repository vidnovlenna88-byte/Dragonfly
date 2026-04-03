import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const { name, contact, message, page } = JSON.parse(event.body || "{}");

    // Validation
    if (!name || !contact) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Name and contact are required" }),
      };
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: "Server configuration error" }),
      };
    }

    // Format message for Telegram (Plain Text for safety)
    const telegramMessage = [
      "📩 Нова заявка з сайту",
      "",
      `👤 Ім’я: ${name}`,
      `📞 Контакт: ${contact}`,
      `📄 Сторінка: ${page || "Головна"}`,
      "",
      "💬 Повідомлення:",
      message || "Без повідомлення"
    ].join("\n");

    // Send to Telegram API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return {
        statusCode: 502,
        body: JSON.stringify({ success: false, error: "Failed to send message to Telegram" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Internal Server Error" }),
    };
  }
};

export { handler };
