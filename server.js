require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 3000;

// -----------------------------
// Настройки сервера
// -----------------------------

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// -----------------------------
// Gemini
// -----------------------------

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY не найден в .env");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: apiKey
});

// Модели по очереди
const models = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash"
];

// -----------------------------
// DLS AI инструкция
// -----------------------------

const systemInstruction = `
Ты — DLS AI, помощник школьной системы Divergents Leadership School.

Ученик:
Имя: Али Байрамов
Класс: 7
Группа: Core 3
Направление: BJJ

Помогай ученику:
- с математикой;
- с физикой;
- с информатикой;
- с английским;
- с программированием;
- с домашними заданиями;
- с объяснением школьных тем.

Объясняй простыми словами.

Если пользователь пишет на русском — отвечай на русском.
Если пишет на английском — отвечай на английском.

Для задач объясняй решение пошагово.

Отвечай дружелюбно и понятно.
`;

// -----------------------------
// API CHAT
// -----------------------------

app.post("/api/chat", async (req, res) => {
    const message = req.body?.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            reply: "Напиши вопрос."
        });
    }

    console.log("👤 Пользователь:", message);

    // Пробуем модели по очереди
    for (const model of models) {
        try {
            console.log("🤖 Используем:", model);

            const response = await ai.models.generateContent({
                model: model,
                contents: message,
                config: {
                    systemInstruction: systemInstruction
                }
            });

            const answer = response.text;

            console.log("✅ Ответ получен");

            return res.json({
                reply: answer,
                model: model
            });

        } catch (error) {
            const status =
                error?.status ||
                error?.error?.code ||
                error?.response?.status;

            console.error(
                `❌ Ошибка модели ${model}:`,
                status || error.message
            );

            // 503 = модель временно перегружена
            // 429 = превышен лимит
            // В этих случаях пробуем следующую модель
            if (status === 503 || status === 429) {
                continue;
            }

            console.error(error);

            return res.status(500).json({
                reply: "❌ Ошибка Gemini API."
            });
        }
    }

    console.error("❌ Все модели временно недоступны.");

    return res.status(503).json({
        reply: "❌ Gemini сейчас перегружен. Попробуй отправить сообщение ещё раз."
    });
});

// -----------------------------
// STATUS
// -----------------------------

app.get("/api/status", (req, res) => {
    res.json({
        online: true,
        ai: true,
        provider: "Gemini"
    });
});

// -----------------------------
// ЗАПУСК
// -----------------------------

app.listen(PORT, () => {
    console.log("");
    console.log("================================");
    console.log("🚀 DLS AI SERVER");
    console.log("================================");
    console.log(`🌍 http://localhost:${PORT}`);
    console.log("🤖 Gemini: подключён");
    console.log("================================");
    console.log("");
});