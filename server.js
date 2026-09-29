const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

const PORT = process.env.PORT || 3000;
const MODEL = "gemini-3.5-flash-lite";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

/* =========================
   FRONTEND
========================= */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

app.get("/script.js", (req, res) => {
    res.sendFile(__dirname + "/script.js");
});

/* =========================
   GEMINI
========================= */

const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    })
    : null;

console.log(
    ai
        ? "Gemini: подключён"
        : "Gemini: НЕТ КЛЮЧА"
);

/* =========================
   HEALTH
========================= */

app.get("/api/health", (req, res) => {
    res.json({
        online: true,
        ai: Boolean(ai),
        provider: "Gemini",
        model: MODEL
    });
});

/* =========================
   AI CHAT
========================= */

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Пустое сообщение"
            });
        }

        if (!ai) {
            return res.status(500).json({
                error: "GEMINI_API_KEY не найден",
                reply: "AI не настроен на сервере."
            });
        }

        console.log("Модель:", MODEL);
        console.log("Сообщение:", message);

        const response = await ai.models.generateContent({
            model: MODEL,
            contents: message
        });

        const reply = response.text;

        console.log("Gemini ответил");

        return res.status(200).json({
            reply: reply,
            model: MODEL
        });

    } catch (error) {
        console.error(
            "[DLS AI] Gemini error:",
            error.message || error
        );

        return res.status(503).json({
            error: "Gemini временно недоступен",
            reply: "Gemini сейчас временно перегружен. Попробуй ещё раз."
        });
    }
});

/* =========================
   START
========================= */

app.listen(PORT, () => {
    console.log("");
    console.log("================================");
    console.log("        DLS AI SERVER");
    console.log("================================");
    console.log("");
    console.log("Сайт: http://localhost:" + PORT);
    console.log("AI: " + (ai ? "подключён" : "НЕТ КЛЮЧА"));
    console.log("Модель: " + MODEL);
    console.log("");
});