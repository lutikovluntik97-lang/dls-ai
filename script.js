/* =========================================
   DLS AI — MAIN JAVASCRIPT
========================================= */

let currentLanguage = localStorage.getItem("dlsLanguage") || "ru";
let aiLanguage = "auto";


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    ru: {
        "nav.home": "Главная",
        "nav.diary": "Дневник",
        "nav.students": "Ученики",
        "nav.schedule": "Расписание",
        "nav.homework": "Домашнее задание",
        "nav.grades": "Оценки",
        "nav.ai": "AI Chat",
        "nav.profile": "Профиль",
        "nav.news": "Новости",
        "nav.achievements": "Достижения",
        "nav.logout": "Выйти",

        "language.title": "Язык",
        "status.online": "Система онлайн",

        "home.eyebrow": "Добро пожаловать",
        "home.title": "Добро пожаловать в DLS AI",
        "home.text": "Твоя школьная система для учёбы, расписания, домашних заданий и общения с AI.",
        "home.askAI": "Спросить DLS AI",
        "home.today": "Сегодня",
        "home.overview": "Обзор дня",
        "home.lessons": "Уроков сегодня",
        "home.homework": "Домашних задания",
        "home.average": "Средний балл",
        "home.achievements": "Достижений",
        "home.scheduleLabel": "На сегодня",
        "home.schedule": "Расписание",
        "home.aiLabel": "DLS AI",
        "home.aiTitle": "AI-помощник",
        "home.aiText": "Задай вопрос по математике, физике, программированию или любому школьному предмету.",
        "home.openChat": "Открыть AI Chat",

        "common.more": "Подробнее",

        "diary.kicker": "Личный дневник",
        "diary.title": "Дневник",
        "diary.text": "Твои уроки, оценки и домашние задания в одном месте.",
        "diary.today": "Сегодня",
        "diary.lessons": "Уроки",
        "diary.hw1": "Упражнения 24–26",
        "diary.hw2": "Изучить §12",
        "diary.hw3": "Выучить 15 новых слов",

        "students.kicker": "Учебные группы",
        "students.title": "Ученики",
        "students.text": "Ученики и спортивные направления DLS.",

        "schedule.kicker": "Учебная неделя",
        "schedule.title": "Расписание",
        "schedule.text": "Core 3 · 7 класс · BJJ",
        "schedule.teacher": "Преподаватель",
        "schedule.room": "Кабинет",

        "homework.kicker": "Учебные задачи",
        "homework.title": "Домашнее задание",
        "homework.text": "Не забудь выполнить задания до следующего урока.",
        "homework.task1": "Решить упражнения 24–26",
        "homework.task2": "Прочитать §12 и ответить на вопросы",
        "homework.task3": "Выучить 15 новых слов",
        "homework.due1": "До завтра",
        "homework.due2": "До завтра",
        "homework.due3": "До пятницы",

        "grades.kicker": "Успеваемость",
        "grades.title": "Оценки",
        "grades.text": "Твои текущие оценки по учебным предметам.",
        "grades.average": "Средний балл",
        "grades.progress": "Отличная успеваемость",

        "ai.title": "AI-помощник",
        "ai.subtitle": "Задавай вопросы на русском, английском или казахском.",
        "ai.newChat": "+ Новый чат",
        "ai.language": "Язык ответа:",
        "ai.welcomeTitle": "Привет! Я DLS AI 👋",
        "ai.welcomeText": "Я помогу тебе с учёбой, домашними заданиями, математикой, физикой, программированием и английским языком.",
        "ai.placeholder": "Напиши вопрос...",
        "ai.note": "DLS AI может допускать ошибки. Проверяй важную информацию.",

        "suggestion.math": "📘 Помоги с математикой",
        "suggestion.physics": "⚡ Помоги с физикой",
        "suggestion.code": "💻 Объясни программирование",
        "suggestion.english": "🇬🇧 Помоги с английским",

        "profile.kicker": "Личный кабинет",
        "profile.title": "Профиль",
        "profile.student": "Ученик",
        "profile.class": "Класс",
        "profile.group": "Группа",
        "profile.direction": "Направление",
        "profile.status": "Статус",
        "profile.active": "Активен",

        "news.kicker": "DLS",
        "news.title": "Новости",
        "news.text": "Последние новости школы.",
        "news.item1.title": "Новый учебный семестр",
        "news.item1.text": "Расписание и учебные материалы обновлены.",
        "news.item2.title": "Обновление DLS AI",
        "news.item2.text": "В AI Chat добавлена поддержка трёх языков.",
        "news.item3.title": "Спортивное направление",
        "news.item3.text": "Добавлены группы BJJ и Judo.",

        "achievements.kicker": "Твои результаты",
        "achievements.title": "Достижения",
        "achievements.text": "Следи за своими успехами.",
        "achievement.first.title": "Первый шаг",
        "achievement.first.text": "Выполнено первое домашнее задание.",
        "achievement.ai.title": "AI Explorer",
        "achievement.ai.text": "Использовал DLS AI для учёбы.",
        "achievement.goal.title": "10 задач",
        "achievement.goal.text": "Реши ещё несколько задач.",

        "table.time": "Время",
        "table.subject": "Предмет",
        "table.grade": "Оценка",
        "table.homework": "Домашнее задание",
        "table.grades": "Оценки",
        "table.average": "Средний",

        "subjects.math": "Математика",
        "subjects.physics": "Физика",
        "subjects.english": "Английский",
        "subjects.informatics": "Информатика",

        "week.mon": "Пн",
        "week.tue": "Вт",
        "week.wed": "Ср",
        "week.thu": "Чт",
        "week.fri": "Пт"
    },

    en: {
        "nav.home": "Home",
        "nav.diary": "Diary",
        "nav.students": "Students",
        "nav.schedule": "Schedule",
        "nav.homework": "Homework",
        "nav.grades": "Grades",
        "nav.ai": "AI Chat",
        "nav.profile": "Profile",
        "nav.news": "News",
        "nav.achievements": "Achievements",
        "nav.logout": "Log out",

        "language.title": "Language",
        "status.online": "System online",

        "home.eyebrow": "Welcome",
        "home.title": "Welcome to DLS AI",
        "home.text": "Your school system for learning, schedules, homework and AI assistance.",
        "home.askAI": "Ask DLS AI",
        "home.today": "Today",
        "home.overview": "Day overview",
        "home.lessons": "Lessons today",
        "home.homework": "Homework",
        "home.average": "Average grade",
        "home.achievements": "Achievements",
        "home.scheduleLabel": "Today",
        "home.schedule": "Schedule",
        "home.aiLabel": "DLS AI",
        "home.aiTitle": "AI assistant",
        "home.aiText": "Ask about mathematics, physics, programming or any school subject.",
        "home.openChat": "Open AI Chat",

        "common.more": "View more",

        "diary.kicker": "Personal diary",
        "diary.title": "Diary",
        "diary.text": "Your lessons, grades and homework in one place.",
        "diary.today": "Today",
        "diary.lessons": "Lessons",
        "diary.hw1": "Exercises 24–26",
        "diary.hw2": "Study section 12",
        "diary.hw3": "Learn 15 new words",

        "students.kicker": "Study groups",
        "students.title": "Students",
        "students.text": "DLS students and sports directions.",

        "schedule.kicker": "School week",
        "schedule.title": "Schedule",
        "schedule.text": "Core 3 · Grade 7 · BJJ",
        "schedule.teacher": "Teacher",
        "schedule.room": "Room",

        "homework.kicker": "Study tasks",
        "homework.title": "Homework",
        "homework.text": "Remember to complete your assignments before the next lesson.",
        "homework.task1": "Solve exercises 24–26",
        "homework.task2": "Read section 12 and answer the questions",
        "homework.task3": "Learn 15 new words",
        "homework.due1": "Due tomorrow",
        "homework.due2": "Due tomorrow",
        "homework.due3": "Due Friday",

        "grades.kicker": "Performance",
        "grades.title": "Grades",
        "grades.text": "Your current grades by subject.",
        "grades.average": "Average grade",
        "grades.progress": "Excellent performance",

        "ai.title": "AI assistant",
        "ai.subtitle": "Ask questions in Russian, English or Kazakh.",
        "ai.newChat": "+ New chat",
        "ai.language": "Response language:",
        "ai.welcomeTitle": "Hi! I’m DLS AI 👋",
        "ai.welcomeText": "I can help you with schoolwork, homework, mathematics, physics, programming and English.",
        "ai.placeholder": "Type your question...",
        "ai.note": "DLS AI can make mistakes. Check important information.",

        "suggestion.math": "📘 Help with math",
        "suggestion.physics": "⚡ Help with physics",
        "suggestion.code": "💻 Explain programming",
        "suggestion.english": "🇬🇧 Help with English",

        "profile.kicker": "Personal account",
        "profile.title": "Profile",
        "profile.student": "Student",
        "profile.class": "Grade",
        "profile.group": "Group",
        "profile.direction": "Direction",
        "profile.status": "Status",
        "profile.active": "Active",

        "news.kicker": "DLS",
        "news.title": "News",
        "news.text": "Latest school news.",
        "news.item1.title": "New school semester",
        "news.item1.text": "The schedule and study materials have been updated.",
        "news.item2.title": "DLS AI update",
        "news.item2.text": "AI Chat now supports three languages.",
        "news.item3.title": "Sports direction",
        "news.item3.text": "BJJ and Judo groups have been added.",

        "achievements.kicker": "Your results",
        "achievements.title": "Achievements",
        "achievements.text": "Track your progress.",
        "achievement.first.title": "First step",
        "achievement.first.text": "Completed the first homework assignment.",
        "achievement.ai.title": "AI Explorer",
        "achievement.ai.text": "Used DLS AI for learning.",
        "achievement.goal.title": "10 tasks",
        "achievement.goal.text": "Solve a few more tasks.",

        "table.time": "Time",
        "table.subject": "Subject",
        "table.grade": "Grade",
        "table.homework": "Homework",
        "table.grades": "Grades",
        "table.average": "Average",

        "subjects.math": "Mathematics",
        "subjects.physics": "Physics",
        "subjects.english": "English",
        "subjects.informatics": "Computer Science",

        "week.mon": "Mon",
        "week.tue": "Tue",
        "week.wed": "Wed",
        "week.thu": "Thu",
        "week.fri": "Fri"
    },

    kk: {
        "nav.home": "Басты бет",
        "nav.diary": "Күнделік",
        "nav.students": "Оқушылар",
        "nav.schedule": "Сабақ кестесі",
        "nav.homework": "Үй тапсырмасы",
        "nav.grades": "Бағалар",
        "nav.ai": "AI Chat",
        "nav.profile": "Профиль",
        "nav.news": "Жаңалықтар",
        "nav.achievements": "Жетістіктер",
        "nav.logout": "Шығу",

        "language.title": "Тіл",
        "status.online": "Жүйе онлайн",

        "home.eyebrow": "Қош келдің",
        "home.title": "DLS AI жүйесіне қош келдің",
        "home.text": "Оқу, сабақ кестесі, үй тапсырмалары және AI көмегі үшін мектеп жүйесі.",
        "home.askAI": "DLS AI-дан сұрау",
        "home.today": "Бүгін",
        "home.overview": "Күн қорытындысы",
        "home.lessons": "Бүгінгі сабақтар",
        "home.homework": "Үй тапсырмалары",
        "home.average": "Орташа баға",
        "home.achievements": "Жетістіктер",
        "home.scheduleLabel": "Бүгін",
        "home.schedule": "Сабақ кестесі",
        "home.aiLabel": "DLS AI",
        "home.aiTitle": "AI көмекшісі",
        "home.aiText": "Математика, физика, бағдарламалау немесе кез келген мектеп пәні туралы сұрақ қой.",
        "home.openChat": "AI Chat ашу",

        "common.more": "Толығырақ",

        "diary.kicker": "Жеке күнделік",
        "diary.title": "Күнделік",
        "diary.text": "Сабақтар, бағалар және үй тапсырмалары бір жерде.",
        "diary.today": "Бүгін",
        "diary.lessons": "Сабақтар",
        "diary.hw1": "24–26 жаттығулар",
        "diary.hw2": "12-параграфты оқу",
        "diary.hw3": "15 жаңа сөз жаттау",

        "students.kicker": "Оқу топтары",
        "students.title": "Оқушылар",
        "students.text": "DLS оқушылары және спорт бағыттары.",

        "schedule.kicker": "Оқу аптасы",
        "schedule.title": "Сабақ кестесі",
        "schedule.text": "Core 3 · 7 сынып · BJJ",
        "schedule.teacher": "Мұғалім",
        "schedule.room": "Кабинет",

        "homework.kicker": "Оқу тапсырмалары",
        "homework.title": "Үй тапсырмасы",
        "homework.text": "Келесі сабаққа дейін тапсырмаларды орындауды ұмытпа.",
        "homework.task1": "24–26 жаттығуларды орындау",
        "homework.task2": "12-параграфты оқып, сұрақтарға жауап беру",
        "homework.task3": "15 жаңа сөз жаттау",
        "homework.due1": "Ертеңге дейін",
        "homework.due2": "Ертеңге дейін",
        "homework.due3": "Жұмаға дейін",

        "grades.kicker": "Үлгерім",
        "grades.title": "Бағалар",
        "grades.text": "Пәндер бойынша ағымдағы бағаларың.",
        "grades.average": "Орташа баға",
        "grades.progress": "Өте жақсы үлгерім",

        "ai.title": "AI көмекшісі",
        "ai.subtitle": "Сұрақтарды орыс, ағылшын немесе қазақ тілінде қой.",
        "ai.newChat": "+ Жаңа чат",
        "ai.language": "Жауап тілі:",
        "ai.welcomeTitle": "Сәлем! Мен DLS AI 👋",
        "ai.welcomeText": "Мен саған сабақ, үй тапсырмасы, математика, физика, бағдарламалау және ағылшын тілі бойынша көмектесе аламын.",
        "ai.placeholder": "Сұрағыңды жаз...",
        "ai.note": "DLS AI қателесуі мүмкін. Маңызды ақпаратты тексер.",

        "suggestion.math": "📘 Математикаға көмектес",
        "suggestion.physics": "⚡ Физикаға көмектес",
        "suggestion.code": "💻 Бағдарламалауды түсіндір",
        "suggestion.english": "🇬🇧 Ағылшын тіліне көмектес",

        "profile.kicker": "Жеке кабинет",
        "profile.title": "Профиль",
        "profile.student": "Оқушы",
        "profile.class": "Сынып",
        "profile.group": "Топ",
        "profile.direction": "Бағыт",
        "profile.status": "Мәртебе",
        "profile.active": "Белсенді",

        "news.kicker": "DLS",
        "news.title": "Жаңалықтар",
        "news.text": "Мектептің соңғы жаңалықтары.",
        "news.item1.title": "Жаңа оқу семестрі",
        "news.item1.text": "Сабақ кестесі мен оқу материалдары жаңартылды.",
        "news.item2.title": "DLS AI жаңартуы",
        "news.item2.text": "AI Chat енді үш тілді қолдайды.",
        "news.item3.title": "Спорт бағыты",
        "news.item3.text": "BJJ және Judo топтары қосылды.",

        "achievements.kicker": "Нәтижелерің",
        "achievements.title": "Жетістіктер",
        "achievements.text": "Өз жетістіктеріңді бақыла.",
        "achievement.first.title": "Алғашқы қадам",
        "achievement.first.text": "Бірінші үй тапсырмасы орындалды.",
        "achievement.ai.title": "AI Explorer",
        "achievement.ai.text": "DLS AI-ды оқу үшін пайдаландың.",
        "achievement.goal.title": "10 тапсырма",
        "achievement.goal.text": "Тағы бірнеше тапсырманы орында.",

        "table.time": "Уақыты",
        "table.subject": "Пән",
        "table.grade": "Баға",
        "table.homework": "Үй тапсырмасы",
        "table.grades": "Бағалар",
        "table.average": "Орташа",

        "subjects.math": "Математика",
        "subjects.physics": "Физика",
        "subjects.english": "Ағылшын тілі",
        "subjects.informatics": "Информатика",

        "week.mon": "Дс",
        "week.tue": "Сс",
        "week.wed": "Ср",
        "week.thu": "Бс",
        "week.fri": "Жм"
    }
};


/* =========================================
   PAGE NAMES
========================================= */

const pageNames = {
    ru: {
        home: "Главная",
        diary: "Дневник",
        students: "Ученики",
        schedule: "Расписание",
        homework: "Домашнее задание",
        grades: "Оценки",
        ai: "AI Chat",
        profile: "Профиль",
        news: "Новости",
        achievements: "Достижения"
    },

    en: {
        home: "Home",
        diary: "Diary",
        students: "Students",
        schedule: "Schedule",
        homework: "Homework",
        grades: "Grades",
        ai: "AI Chat",
        profile: "Profile",
        news: "News",
        achievements: "Achievements"
    },

    kk: {
        home: "Басты бет",
        diary: "Күнделік",
        students: "Оқушылар",
        schedule: "Сабақ кестесі",
        homework: "Үй тапсырмасы",
        grades: "Бағалар",
        ai: "AI Chat",
        profile: "Профиль",
        news: "Жаңалықтар",
        achievements: "Жетістіктер"
    }
};


/* =========================================
   STUDENTS
========================================= */

const students = {

    "Core 1": [
        ["Осман Дінмұхаммед", "7", "BJJ"],
        ["Турлыбек Ахмад", "7", "Judo"],
        ["Алтынбек Ділмұхаммед", "8", "Judo"],
        ["Салават Искандер", "8", "BJJ"]
    ],

    "Core 2": [
        ["Мехнин Олег", "9", "Judo"],
        ["Сәндібек Сағадат", "9", "Judo"],
        ["Ахметали Абылай", "9", "Judo"],
        ["Кадырхан Мансур", "10", "Judo"]
    ],

    "Core 3": [
        ["Байрамов Али", "7", "BJJ"],
        ["Абдильбар Илшат", "7", "Judo"],
        ["Юсуфали Али", "8", "BJJ"],
        ["Серікұлы Дамир", "8", "BJJ"]
    ],

    "ADV 1": [
        ["Темірболат Нұрали", "7", "BJJ"],
        ["Ақсақалов Алисұлтан", "8", "BJJ"],
        ["Комбатуров Жангир", "8", "Judo"]
    ]
};


/* =========================================
   SECURITY
========================================= */

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


/* =========================================
   TRANSLATIONS
========================================= */

function applyTranslations() {

    document.documentElement.lang =
        currentLanguage === "kk"
            ? "kk"
            : currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");
        const value = translations[currentLanguage]?.[key];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.getAttribute("data-i18n-placeholder");
        const value = translations[currentLanguage]?.[key];

        if (value !== undefined) {
            element.placeholder = value;
        }
    });

    updatePageName();
}


function updatePageName() {

    const visiblePage =
        document.querySelector(".page:not(.hidden)");

    const pageName =
        document.getElementById("pageName");

    if (!visiblePage || !pageName) {
        return;
    }

    pageName.textContent =
        pageNames[currentLanguage][visiblePage.id] ||
        visiblePage.id;
}


/* =========================================
   LANGUAGE
========================================= */

function setLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage = language;

    localStorage.setItem(
        "dlsLanguage",
        language
    );

    document.querySelectorAll(".language-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });

    applyTranslations();
    updateAIWelcome();
}


/* =========================================
   AI LANGUAGE
========================================= */

function setAILanguage(language) {

    aiLanguage = language;

    document.querySelectorAll(".ai-lang").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.aiLang === language
        );

    });
}


/* =========================================
   NAVIGATION
========================================= */

function showPage(id, button = null) {

    console.log("DLS navigation:", id);

    const target =
        document.getElementById(id);

    if (!target) {
        console.error(
            "DLS: page not found:",
            id
        );
        return;
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    target.classList.remove("hidden");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {

        const navButton =
            document.querySelector(
                `.nav-item[onclick*="'${id}'"]`
            );

        if (navButton) {
            navButton.classList.add("active");
        }
    }

    updatePageName();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "students") {
        renderStudents();
    }
}


/* =========================================
   OPEN AI
========================================= */

function openAI() {

    showPage("ai");

    const aiButton =
        document.querySelector(
            `.nav-item[onclick*="'ai'"]`
        );

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (aiButton) {
        aiButton.classList.add("active");
    }

    const input =
        document.getElementById("question");

    if (input) {
        setTimeout(() => {
            input.focus();
        }, 150);
    }
}


/* =========================================
   STUDENTS
========================================= */

function renderStudents() {

    const container =
        document.getElementById("studentsList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    Object.entries(students).forEach(
        ([group, list]) => {

            const groupElement =
                document.createElement("div");

            groupElement.className =
                "student-group-card";

            groupElement.innerHTML = `
                <div class="student-group-header">
                    <div>
                        <span>GROUP</span>
                        <h3>${escapeHTML(group)}</h3>
                    </div>

                    <div class="student-count">
                        ${list.length}
                    </div>
                </div>

                <div class="student-list"></div>
            `;

            const listContainer =
                groupElement.querySelector(
                    ".student-list"
                );

            list.forEach(student => {

                const element =
                    document.createElement("div");

                element.className =
                    "student-row";

                element.innerHTML = `
                    <div class="student-avatar">
                        ${escapeHTML(
                            student[0].charAt(0)
                        )}
                    </div>

                    <div class="student-data">
                        <strong>
                            ${escapeHTML(student[0])}
                        </strong>

                        <span>
                            ${escapeHTML(student[1])} ·
                            ${escapeHTML(student[2])}
                        </span>
                    </div>

                    <div class="student-status"></div>
                `;

                listContainer.appendChild(element);
            });

            container.appendChild(groupElement);
        }
    );
}


/* =========================================
   AI CHAT
========================================= */

async function askAI() {

    const input =
        document.getElementById("question");

    const chat =
        document.getElementById("chat");

    const sendButton =
        document.getElementById("sendAI");

    if (!input || !chat) {
        return;
    }

    const message =
        input.value.trim();

    if (!message) {
        return;
    }

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-msg";

    userMessage.textContent =
        message;

    chat.appendChild(userMessage);

    input.value = "";
    input.style.height = "56px";

    if (sendButton) {
        sendButton.disabled = true;
    }

    const botMessage =
        document.createElement("div");

    botMessage.className =
        "bot-msg";

    botMessage.innerHTML = `
        <div class="message-avatar">✦</div>

        <div class="message-bubble loading-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chat.appendChild(botMessage);

    scrollChat();

    try {

        const response =
            await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message,
                    language: aiLanguage
                })
            });

        let data = {};

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            throw new Error(
                data.reply ||
                `Ошибка сервера: ${response.status}`
            );
        }

        const answer =
            data.reply ||
            "AI не вернул ответ.";

        botMessage.innerHTML = `
            <div class="message-avatar">✦</div>

            <div class="message-bubble">
                ${formatAIText(answer)}
            </div>
        `;

    } catch (error) {

        console.error(
            "DLS AI:",
            error
        );

        botMessage.innerHTML = `
            <div class="message-avatar">✦</div>

            <div class="message-bubble error-bubble">
                ❌ ${escapeHTML(
                    error.message ||
                    "Не удалось получить ответ от AI."
                )}
            </div>
        `;

    } finally {

        if (sendButton) {
            sendButton.disabled = false;
        }

        scrollChat();
    }
}


/* =========================================
   AI TEXT
========================================= */

function formatAIText(text) {

    return escapeHTML(
        String(text)
    )
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )
        .replace(
            /\n/g,
            "<br>"
        );
}


/* =========================================
   SUGGESTIONS
========================================= */

function sendSuggestion(text) {

    const input =
        document.getElementById("question");

    if (!input) {
        return;
    }

    input.value = text;

    input.focus();

    askAI();
}


/* =========================================
   CLEAR CHAT
========================================= */

function clearChat() {

    const chat =
        document.getElementById("chat");

    if (!chat) {
        return;
    }

    chat.innerHTML = `
        <div class="bot-msg welcome-message">

            <div class="message-avatar">✦</div>

            <div class="message-bubble">

                <strong>
                    ${escapeHTML(
                        translations[currentLanguage]["ai.welcomeTitle"]
                    )}
                </strong>

                <p>
                    ${escapeHTML(
                        translations[currentLanguage]["ai.welcomeText"]
                    )}
                </p>

            </div>

        </div>
    `;

    scrollChat();
}


/* =========================================
   AI WELCOME
========================================= */

function updateAIWelcome() {

    const welcome =
        document.querySelector(
            ".welcome-message"
        );

    if (!welcome) {
        return;
    }

    const title =
        welcome.querySelector("strong");

    const text =
        welcome.querySelector("p");

    if (title) {
        title.textContent =
            translations[currentLanguage]["ai.welcomeTitle"];
    }

    if (text) {
        text.textContent =
            translations[currentLanguage]["ai.welcomeText"];
    }
}


/* =========================================
   CHAT SCROLL
========================================= */

function scrollChat() {

    const chat =
        document.getElementById("chat");

    if (!chat) {
        return;
    }

    requestAnimationFrame(() => {
        chat.scrollTop =
            chat.scrollHeight;
    });
}


/* =========================================
   DOM READY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🚀 DLS AI frontend loaded"
        );

        applyTranslations();

        document.querySelectorAll(".language-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.lang === currentLanguage
                );

            });

        document.querySelectorAll(".ai-lang")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.aiLang === aiLanguage
                );

            });

        renderStudents();

        document.querySelectorAll(".week")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".week")
                            .forEach(item => {
                                item.classList.remove("active");
                            });

                        button.classList.add("active");

                    }
                );

            });

        const input =
            document.getElementById("question");

        if (input) {

            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" &&
                        !event.shiftKey
                    ) {

                        event.preventDefault();

                        askAI();
                    }
                }
            );

            input.addEventListener(
                "input",
                () => {

                    input.style.height = "56px";

                    input.style.height =
                        Math.min(
                            input.scrollHeight,
                            140
                        ) + "px";
                }
            );
        }
    }
);