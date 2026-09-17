const { GoogleGenAI } = require("@google/genai");

module.exports = async (req, res) => {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Только POST
    if (req.method !== "POST") {
        return res.status(405).json({
            reply: "Метод не поддерживается."
        });
    }

    try {
        // Проверяем API key
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY отсутствует");
            return res.status(500).json({
                reply: "GEMINI_API_KEY не настроен в Vercel."
            });
        }

        // Получаем сообщение
        const message = req.body?.message;

        if (!message || !message.trim()) {
            return res.status(400).json({
                reply: "Напиши вопрос."
            });
        }

        // Gemini
        const ai = new GoogleGenAI({
            apiKey: apiKey
        });

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",

            contents: message,

            config: {
                systemInstruction: `
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
Если пользователь пишет на английском — отвечай на английском.
Если пользователь пишет на казахском — отвечай на казахском.

Для задач объясняй решение пошагово.

Отвечай дружелюбно и понятно.
`
            }
        });

        console.log("Gemini ответил успешно");

        return res.status(200).json({
            reply: response.text,
            model: "gemini-3.8-flash"
        });

    } catch (error) {
        console.error("GEMINI ERROR:", error);

        return res.status(500).json({
            reply: "Ошибка Gemini API. Посмотри Runtime Logs в Vercel."
        });
    }
};