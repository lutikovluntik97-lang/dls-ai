require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// НАСТРОЙКИ
// ===============================

app.use(cors());
app.use(express.json());

// Раздаём все файлы сайта
app.use(express.static(__dirname));

// Главная страница
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Страница входа
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// CSS
app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

// ===============================
// GEMINI
// ===============================

const apiKey = process.env.GEMINI_API_KEY;

let ai = null;

if (apiKey) {
    ai = new GoogleGenAI({
        apiKey: apiKey
    });

    console.log("Gemini: подключён");
} else {
    console.log("GEMINI_API_KEY не найден.");
}

// ===============================
// DLS AI
// ===============================

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

Не давай просто ответ без объяснения, если ученик просит решить задачу.

Отвечай дружелюбно и понятно.
`;

// ===============================
// API CHAT
// ===============================

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body?.message;

        if (!message || !message.trim()) {
            return res.status(400).json({
                reply: "Напиши вопрос."
            });
        }

        if (!ai) {
            return res.status(500).json({
                reply: "Gemini API не настроен на сервере."
            });
        }

        console.log("Пользователь:", message);

        const response = await ai.models.generateContent({

            model: "gemini-3.8-flash",

            contents: message,

            config: {
                systemInstruction: systemInstruction
            }

        });

        const answer = response.text;

        console.log("DLS AI: ответ получен");

        return res.status(200).json({
            reply: answer,
            model: "gemini-3.8-flash"
        });

    } catch (error) {

        console.error("Gemini error:");
        console.error(error);

        return res.status(500).json({
            reply: "Произошла ошибка Gemini API."
        });

    }

});

// ===============================
// STATUS
// ===============================

app.get("/api/status", (req, res) => {

    res.json({
        online: true,
        ai: !!ai,
        provider: "Gemini"
    });

});

// ===============================
// 404
// ===============================

app.use((req, res) => {

    res.status(404).send("Страница не найдена.");

});

// ===============================
// SERVER
// ===============================

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("        DLS AI SERVER");
    console.log("================================");
    console.log(`Сайт: http://localhost:${PORT}`);
    console.log(`Login: http://localhost:${PORT}/login`);
    console.log(`API: http://localhost:${PORT}/api/chat`);
    console.log("Gemini:", ai ? "подключён" : "не подключён");
    console.log("================================");
    console.log("");

});