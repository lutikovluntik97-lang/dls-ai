const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY не настроен в Vercel");
}

const ai = new GoogleGenAI({
    apiKey
});

const models = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash"
];

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
Если пользователь пишет на английском — отвечай на английском.
Если пользователь пишет на казахском — отвечай на казахском.

Для задач объясняй решение пошагово.

Отвечай дружелюбно и понятно.
`;

module.exports = async (req, res) => {
    // Разрешаем CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Проверка CORS
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Разрешаем только POST
    if (req.method !== "POST") {
        return res.status(405).json({
            reply: "Метод не поддерживается."
        });
    }

    const message = req.body?.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            reply: "Напиши вопрос."
        });
    }

    for (const model of models) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: message,
                config: {
                    systemInstruction
                }
            });

            return res.status(200).json({
                reply: response.text,
                model
            });

        } catch (error) {
            const status =
                error?.status ||
                error?.error?.code ||
                error?.response?.status;

            console.error(`Ошибка модели ${model}:`, status || error.message);

            if (status === 429 || status === 503) {
                continue;
            }

            return res.status(500).json({
                reply: "Ошибка Gemini API."
            });
        }
    }

    return res.status(503).json({
        reply: "Gemini сейчас временно недоступен. Попробуй ещё раз."
    });
};