/* ============================================================
   DLS AI — application logic
   ============================================================ */

/* ---------------------------------------------------------
   0. Auth guard — redirect to login if not "authenticated"
   --------------------------------------------------------- */
(function authGuard() {
  try {
    if (!sessionStorage.getItem('dls_auth')) {
      window.location.href = 'login.html';
    }
  } catch (err) {
    // sessionStorage unavailable (e.g. private mode) — allow access
  }
})();

function logout() {
  try { sessionStorage.removeItem('dls_auth'); } catch (err) { /* ignore */ }
  window.location.href = 'login.html';
}

/* ---------------------------------------------------------
   1. i18n dictionary
   --------------------------------------------------------- */
const I18N = {
  ru: {
    'nav.dashboard': 'Главная', 'nav.diary': 'Дневник', 'nav.students': 'Ученики',
    'nav.schedule': 'Расписание', 'nav.homework': 'Домашнее задание', 'nav.grades': 'Оценки',
    'nav.ai': 'AI Chat', 'nav.profile': 'Профиль', 'nav.news': 'Новости',
    'nav.achievements': 'Достижения', 'nav.logout': 'Выйти',

    'dash.hello': 'Добрый день, Али', 'dash.sub': 'Вот что происходит сегодня в DLS.',
    'dash.statToday': 'Уроков сегодня', 'dash.statHw': 'Активных заданий',
    'dash.statAvg': 'Средняя оценка', 'dash.statAch': 'Достижений',
    'dash.nextLessons': 'Ближайшие уроки', 'dash.aiTitle': '🤖 AI-помощник',
    'dash.aiSub': 'Спроси что угодно об учёбе — объясню, помогу, переведу.',
    'dash.aiOpen': 'Открыть AI Chat', 'dash.hwTitle': 'Домашние задания',
    'dash.gradesTitle': 'Последние оценки',
    'dash.q1': 'Объясни тему', 'dash.q2': 'Помоги с домашним заданием', 'dash.q3': 'Переведи текст',

    'diary.hwLabel': 'Дз:',
    'students.search': 'Поиск ученика…', 'students.allGroups': 'Все группы',
    'schedule.morning': 'Утро', 'schedule.afternoon': 'День', 'schedule.time': 'Время',
    'schedule.subject': 'Предмет', 'schedule.teacher': 'Преподаватель', 'schedule.room': 'Аудитория',
    'schedule.status': 'Статус', 'schedule.live': 'Идёт', 'schedule.next': 'Далее', 'schedule.done': 'Прошёл',

    'hw.due': 'Срок',
    'hw.new': 'Новое', 'hw.progress': 'В процессе', 'hw.done': 'Выполнено',

    'grades.academic': 'Учебные предметы', 'grades.subject': 'Предмет', 'grades.grade': 'Оценка',
    'grades.date': 'Дата', 'grades.type': 'Тип работы', 'grades.sport': 'Спортивное направление · BJJ',

    'ai.clear': 'Очистить чат', 'ai.placeholder': 'Напиши сообщение…',
    'ai.note': 'DLS AI использует Google Gemini и может ошибаться — проверяй важные факты.',
    'ai.s1': 'Объясни тему', 'ai.s2': 'Помоги с домашним заданием', 'ai.s3': 'Переведи текст', 'ai.s4': 'Объясни проще',
    'ai.greeting': 'Привет, Али! Я DLS AI — твой помощник в учёбе. О чём хочешь поговорить?',
    'ai.offline': 'Сейчас AI временно недоступен. Проверь подключение к серверу и попробуй снова через минуту.',

    'profile.coreLabel': '7 класс · Core 3', 'profile.subtitle': 'Ученик Divergents Leadership School',
    'profile.class': '7 класс', 'profile.info': 'Информация', 'profile.fullName': 'Полное имя',
    'profile.classLabel': 'Класс', 'profile.groupLabel': 'Группа', 'profile.direction': 'Направление',
    'profile.mentor': 'Куратор',
  },
  en: {
    'nav.dashboard': 'Home', 'nav.diary': 'Diary', 'nav.students': 'Students',
    'nav.schedule': 'Schedule', 'nav.homework': 'Homework', 'nav.grades': 'Grades',
    'nav.ai': 'AI Chat', 'nav.profile': 'Profile', 'nav.news': 'News',
    'nav.achievements': 'Achievements', 'nav.logout': 'Log out',

    'dash.hello': 'Good afternoon, Ali', 'dash.sub': "Here's what's happening at DLS today.",
    'dash.statToday': 'Lessons today', 'dash.statHw': 'Active assignments',
    'dash.statAvg': 'Average grade', 'dash.statAch': 'Achievements',
    'dash.nextLessons': 'Upcoming lessons', 'dash.aiTitle': '🤖 AI Assistant',
    'dash.aiSub': 'Ask anything about your studies — I can explain, help, translate.',
    'dash.aiOpen': 'Open AI Chat', 'dash.hwTitle': 'Homework', 'dash.gradesTitle': 'Recent grades',
    'dash.q1': 'Explain a topic', 'dash.q2': 'Help with homework', 'dash.q3': 'Translate a text',

    'diary.hwLabel': 'HW:',
    'students.search': 'Search a student…', 'students.allGroups': 'All groups',
    'schedule.morning': 'Morning', 'schedule.afternoon': 'Afternoon', 'schedule.time': 'Time',
    'schedule.subject': 'Subject', 'schedule.teacher': 'Teacher', 'schedule.room': 'Room',
    'schedule.status': 'Status', 'schedule.live': 'Live', 'schedule.next': 'Next', 'schedule.done': 'Done',

    'hw.due': 'Due', 'hw.new': 'New', 'hw.progress': 'In progress', 'hw.done': 'Done',

    'grades.academic': 'Academic subjects', 'grades.subject': 'Subject', 'grades.grade': 'Grade',
    'grades.date': 'Date', 'grades.type': 'Type of work', 'grades.sport': 'Sports track · BJJ',

    'ai.clear': 'Clear chat', 'ai.placeholder': 'Write a message…',
    'ai.note': 'DLS AI runs on Google Gemini and can make mistakes — verify important facts.',
    'ai.s1': 'Explain a topic', 'ai.s2': 'Help with homework', 'ai.s3': 'Translate a text', 'ai.s4': 'Explain more simply',
    'ai.greeting': "Hi Ali! I'm DLS AI, your study assistant. What would you like to talk about?",
    'ai.offline': 'The AI is temporarily unavailable. Check the server connection and try again in a minute.',

    'profile.coreLabel': 'Grade 7 · Core 3', 'profile.subtitle': 'Student at Divergents Leadership School',
    'profile.class': 'Grade 7', 'profile.info': 'Information', 'profile.fullName': 'Full name',
    'profile.classLabel': 'Class', 'profile.groupLabel': 'Group', 'profile.direction': 'Track',
    'profile.mentor': 'Mentor',
  },
  kz: {
    'nav.dashboard': 'Басты бет', 'nav.diary': 'Күнделік', 'nav.students': 'Оқушылар',
    'nav.schedule': 'Сабақ кестесі', 'nav.homework': 'Үй тапсырмасы', 'nav.grades': 'Бағалар',
    'nav.ai': 'AI Chat', 'nav.profile': 'Профиль', 'nav.news': 'Жаңалықтар',
    'nav.achievements': 'Жетістіктер', 'nav.logout': 'Шығу',

    'dash.hello': 'Қайырлы күн, Али', 'dash.sub': 'Бүгін DLS-те не болып жатыр.',
    'dash.statToday': 'Бүгінгі сабақтар', 'dash.statHw': 'Белсенді тапсырмалар',
    'dash.statAvg': 'Орташа баға', 'dash.statAch': 'Жетістіктер',
    'dash.nextLessons': 'Келесі сабақтар', 'dash.aiTitle': '🤖 AI көмекшісі',
    'dash.aiSub': 'Оқу туралы кез келген сұрақ қой — түсіндіремін, көмектесемін, аударамын.',
    'dash.aiOpen': 'AI Chat ашу', 'dash.hwTitle': 'Үй тапсырмалары', 'dash.gradesTitle': 'Соңғы бағалар',
    'dash.q1': 'Тақырыпты түсіндір', 'dash.q2': 'Үй тапсырмасына көмектес', 'dash.q3': 'Мәтінді аудар',

    'diary.hwLabel': 'ҮТ:',
    'students.search': 'Оқушыны іздеу…', 'students.allGroups': 'Барлық топтар',
    'schedule.morning': 'Таңғы', 'schedule.afternoon': 'Күндізгі', 'schedule.time': 'Уақыты',
    'schedule.subject': 'Пән', 'schedule.teacher': 'Мұғалім', 'schedule.room': 'Аудитория',
    'schedule.status': 'Мәртебесі', 'schedule.live': 'Жүріп жатыр', 'schedule.next': 'Келесі', 'schedule.done': 'Өтті',

    'hw.due': 'Мерзімі', 'hw.new': 'Жаңа', 'hw.progress': 'Орындалуда', 'hw.done': 'Орындалды',

    'grades.academic': 'Оқу пәндері', 'grades.subject': 'Пән', 'grades.grade': 'Баға',
    'grades.date': 'Күні', 'grades.type': 'Жұмыс түрі', 'grades.sport': 'Спорттық бағыт · BJJ',

    'ai.clear': 'Чатты тазарту', 'ai.placeholder': 'Хабарлама жаз…',
    'ai.note': 'DLS AI Google Gemini негізінде жұмыс істейді және қателесуі мүмкін — маңызды деректерді тексеріңіз.',
    'ai.s1': 'Тақырыпты түсіндір', 'ai.s2': 'Үй тапсырмасына көмектес', 'ai.s3': 'Мәтінді аудар', 'ai.s4': 'Қарапайым түсіндір',
    'ai.greeting': 'Сәлем, Али! Мен DLS AI — сенің оқу көмекшің. Не туралы сөйлесеміз?',
    'ai.offline': 'AI уақытша қолжетімсіз. Сервермен байланысты тексеріп, бір минуттан кейін қайта көріңіз.',

    'profile.coreLabel': '7 сынып · Core 3', 'profile.subtitle': 'Divergents Leadership School оқушысы',
    'profile.class': '7 сынып', 'profile.info': 'Ақпарат', 'profile.fullName': 'Толық аты-жөні',
    'profile.classLabel': 'Сынып', 'profile.groupLabel': 'Топ', 'profile.direction': 'Бағыт',
    'profile.mentor': 'Куратор',
  },
};

let currentLang = 'ru';
let aiLang = 'auto';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.ru[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('#langSwitch button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.documentElement.lang = lang === 'kz' ? 'kk' : lang;
  applyTranslations();
  renderAll();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  const active = document.querySelector('.nav-item.active span[data-i18n]');
  if (active) document.getElementById('pageTitle').textContent = active.textContent;
}

/* ---------------------------------------------------------
   2. Navigation
   --------------------------------------------------------- */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');

  document.querySelectorAll('.nav-item[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === pageId));

  const activeLabel = document.querySelector(`.nav-item[data-page="${pageId}"] span[data-i18n]`);
  if (activeLabel) document.getElementById('pageTitle').textContent = activeLabel.textContent;

  closeSidebar();

  if (pageId === 'ai' && chatLog.length === 0) {
    pushMessage('ai', t('ai.greeting'));
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('overlay').addEventListener('click', closeSidebar);
});

function goToAiWith(i18nKey) {
  showPage('ai');
  document.getElementById('chatInput').value = t(i18nKey);
}

/* ---------------------------------------------------------
   3. Mock data
   --------------------------------------------------------- */
const DIARY_DAYS = [
  {
    label: { ru: 'Понедельник, 22 сентября', en: 'Monday, September 22', kz: 'Дүйсенбі, 22 қыркүйек' },
    items: [
      { time: '09:00', subject: { ru: 'Математика', en: 'Mathematics', kz: 'Математика' }, lesson: { ru: 'Уравнения с одной переменной', en: 'Equations with one variable', kz: 'Бір айнымалысы бар теңдеулер' }, hw: { ru: 'Повторить тему', en: 'Review the topic', kz: 'Тақырыпты қайталау' }, grade: 5, comment: { ru: 'Отличная работа на уроке', en: 'Great work in class', kz: 'Сабақта тамаша жұмыс' } },
      { time: '10:00', subject: { ru: 'Английский язык', en: 'English', kz: 'Ағылшын тілі' }, lesson: { ru: 'Present Perfect', en: 'Present Perfect', kz: 'Present Perfect' }, hw: { ru: 'Подготовить упражнение', en: 'Prepare the exercise', kz: 'Жаттығуды дайындау' }, grade: null, comment: null },
      { time: '11:10', subject: { ru: 'История', en: 'History', kz: 'Тарих' }, lesson: { ru: 'Великий Шёлковый путь', en: 'The Great Silk Road', kz: 'Ұлы Жібек жолы' }, hw: { ru: 'Прочитать материал', en: 'Read the material', kz: 'Материалды оқу' }, grade: 4, comment: null },
      { time: '13:00', subject: { ru: 'BJJ', en: 'BJJ', kz: 'BJJ' }, lesson: { ru: 'Работа из гарда', en: 'Working from guard', kz: 'Гардтан жұмыс' }, hw: null, comment: { ru: 'Хорошая динамика', en: 'Good dynamics', kz: 'Жақсы динамика' } },
    ],
  },
  {
    label: { ru: 'Вторник, 23 сентября', en: 'Tuesday, September 23', kz: 'Сейсенбі, 23 қыркүйек' },
    items: [
      { time: '09:00', subject: { ru: 'Физика', en: 'Physics', kz: 'Физика' }, lesson: { ru: 'Законы Ньютона', en: "Newton's laws", kz: 'Ньютон заңдары' }, hw: { ru: 'Решить задачи №4-8', en: 'Solve problems 4-8', kz: '4-8 есептерді шығару' }, grade: null, comment: null },
      { time: '10:00', subject: { ru: 'Казахский язык', en: 'Kazakh', kz: 'Қазақ тілі' }, lesson: { ru: 'Сложные предложения', en: 'Complex sentences', kz: 'Күрделі сөйлемдер' }, hw: { ru: 'Написать эссе', en: 'Write an essay', kz: 'Эссе жазу' }, grade: 5, comment: null },
      { time: '11:10', subject: { ru: 'Информатика', en: 'Computer Science', kz: 'Информатика' }, lesson: { ru: 'Основы алгоритмов', en: 'Algorithm basics', kz: 'Алгоритм негіздері' }, hw: null, grade: null, comment: null },
    ],
  },
];
let diaryIndex = 0;

const STUDENTS = [
  { name: 'Osman Dinmuhammed', group: 'Core 1', grade: 7, dir: 'BJJ' },
  { name: 'Turlybek Ahmad', group: 'Core 1', grade: 7, dir: 'Judo' },
  { name: 'Altynbek Dilmuhammed', group: 'Core 1', grade: 8, dir: 'Judo' },
  { name: 'Salavat Iskander', group: 'Core 1', grade: 8, dir: 'BJJ' },
  { name: 'Mekhnin Oleg', group: 'Core 2', grade: 9, dir: 'Judo' },
  { name: 'Sandibek Sagadat', group: 'Core 2', grade: 9, dir: 'Judo' },
  { name: 'Akhmetali Abylai', group: 'Core 2', grade: 9, dir: 'Judo' },
  { name: 'Kadyrkhan Mansur', group: 'Core 2', grade: 10, dir: 'Judo' },
  { name: 'Bayramov Ali', group: 'Core 3', grade: 7, dir: 'BJJ' },
  { name: 'Abdilbar Ilshat', group: 'Core 3', grade: 7, dir: 'Judo' },
];

const SCHEDULE = {
  'Core 3': {
    morning: [
      { time: '09:00–09:45', subject: { ru: 'Математика', en: 'Mathematics', kz: 'Математика' }, teacher: 'А. Нурланова', room: '204', status: 'done' },
      { time: '09:55–10:40', subject: { ru: 'Английский язык', en: 'English', kz: 'Ағылшын тілі' }, teacher: 'J. Miller', room: '108', status: 'live' },
      { time: '10:50–11:35', subject: { ru: 'История', en: 'History', kz: 'Тарих' }, teacher: 'Б. Ахметов', room: '210', status: 'next' },
      { time: '11:45–12:30', subject: { ru: 'Казахский язык', en: 'Kazakh', kz: 'Қазақ тілі' }, teacher: 'Г. Сатпаева', room: '112', status: 'upcoming' },
    ],
    afternoon: [
      { time: '13:30–14:15', subject: { ru: 'Физика', en: 'Physics', kz: 'Физика' }, teacher: 'Р. Досов', room: '301', status: 'upcoming' },
      { time: '14:25–15:10', subject: { ru: 'BJJ', en: 'BJJ', kz: 'BJJ' }, teacher: 'Т. Есенов', room: 'Зал 1', status: 'upcoming' },
      { time: '15:20–16:05', subject: { ru: 'Информатика', en: 'Computer Science', kz: 'Информатика' }, teacher: 'Д. Каримов', room: '405', status: 'upcoming' },
    ],
  },
  'Core 1': {
    morning: [
      { time: '09:00–09:45', subject: { ru: 'Английский язык', en: 'English', kz: 'Ағылшын тілі' }, teacher: 'J. Miller', room: '108', status: 'done' },
      { time: '09:55–10:40', subject: { ru: 'Математика', en: 'Mathematics', kz: 'Математика' }, teacher: 'А. Нурланова', room: '204', status: 'live' },
    ],
    afternoon: [
      { time: '13:30–14:15', subject: { ru: 'Judo', en: 'Judo', kz: 'Дзюдо' }, teacher: 'С. Ким', room: 'Зал 2', status: 'upcoming' },
    ],
  },
  'Core 2': {
    morning: [
      { time: '09:00–09:45', subject: { ru: 'История', en: 'History', kz: 'Тарих' }, teacher: 'Б. Ахметов', room: '210', status: 'done' },
      { time: '09:55–10:40', subject: { ru: 'Физика', en: 'Physics', kz: 'Физика' }, teacher: 'Р. Досов', room: '301', status: 'live' },
    ],
    afternoon: [
      { time: '13:30–14:15', subject: { ru: 'Judo', en: 'Judo', kz: 'Дзюдо' }, teacher: 'С. Ким', room: 'Зал 2', status: 'upcoming' },
    ],
  },
};
let currentGroup = 'Core 3';
let currentPart = 'morning';

const HOMEWORK = [
  { subject: { ru: 'Математика', en: 'Mathematics', kz: 'Математика' }, title: { ru: 'Повторить тему', en: 'Review the topic', kz: 'Тақырыпты қайталау' }, desc: { ru: 'Уравнения с одной переменной, §12', en: 'One-variable equations, §12', kz: 'Бір айнымалысы бар теңдеулер, §12' }, due: '24.09', status: 'progress' },
  { subject: { ru: 'Английский язык', en: 'English', kz: 'Ағылшын тілі' }, title: { ru: 'Подготовить упражнение', en: 'Prepare the exercise', kz: 'Жаттығуды дайындау' }, desc: { ru: 'Present Perfect, упражнения 3–5', en: 'Present Perfect, exercises 3–5', kz: 'Present Perfect, 3–5 жаттығулар' }, due: '25.09', status: 'new' },
  { subject: { ru: 'История', en: 'History', kz: 'Тарих' }, title: { ru: 'Прочитать материал', en: 'Read the material', kz: 'Материалды оқу' }, desc: { ru: 'Великий Шёлковый путь, глава 4', en: 'The Great Silk Road, chapter 4', kz: 'Ұлы Жібек жолы, 4-тарау' }, due: '23.09', status: 'done' },
  { subject: { ru: 'Казахский язык', en: 'Kazakh', kz: 'Қазақ тілі' }, title: { ru: 'Написать эссе', en: 'Write an essay', kz: 'Эссе жазу' }, desc: { ru: 'Тема: «Мой родной край»', en: 'Topic: "My homeland"', kz: 'Тақырыбы: «Менің туған өлкем»' }, due: '26.09', status: 'new' },
  { subject: { ru: 'Физика', en: 'Physics', kz: 'Физика' }, title: { ru: 'Решить задачи №4–8', en: 'Solve problems 4–8', kz: '4–8 есептерді шығару' }, desc: { ru: 'Законы Ньютона', en: "Newton's laws", kz: 'Ньютон заңдары' }, due: '27.09', status: 'new' },
  { subject: { ru: 'Информатика', en: 'Computer Science', kz: 'Информатика' }, title: { ru: 'Мини-проект', en: 'Mini project', kz: 'Шағын жоба' }, desc: { ru: 'Алгоритм сортировки на выбор', en: 'A sorting algorithm of your choice', kz: 'Таңдау бойынша сұрыптау алгоритмі' }, due: '29.09', status: 'progress' },
];

const GRADES = [
  { subject: { ru: 'Математика', en: 'Mathematics', kz: 'Математика' }, grade: 5, date: '22.09', type: { ru: 'Самостоятельная', en: 'Quiz', kz: 'Өзіндік жұмыс' } },
  { subject: { ru: 'Английский язык', en: 'English', kz: 'Ағылшын тілі' }, grade: 4, date: '20.09', type: { ru: 'Устный ответ', en: 'Oral answer', kz: 'Ауызша жауап' } },
  { subject: { ru: 'История', en: 'History', kz: 'Тарих' }, grade: 4, date: '19.09', type: { ru: 'Домашнее задание', en: 'Homework', kz: 'Үй тапсырмасы' } },
  { subject: { ru: 'Казахский язык', en: 'Kazakh', kz: 'Қазақ тілі' }, grade: 5, date: '18.09', type: { ru: 'Эссе', en: 'Essay', kz: 'Эссе' } },
  { subject: { ru: 'Физика', en: 'Physics', kz: 'Физика' }, grade: 3, date: '17.09', type: { ru: 'Контрольная', en: 'Test', kz: 'Бақылау жұмысы' } },
];

const BELTS = [
  { color: '#f2f2f7', label: { ru: 'Белый пояс', en: 'White belt', kz: 'Ақ белбеу' }, note: { ru: 'Получен', en: 'Earned', kz: 'Алынды' } },
  { color: '#e3b34d', label: { ru: 'Жёлто-белая степень', en: 'Yellow-white stripe', kz: 'Сары-ақ дәреже' }, note: { ru: 'Текущий уровень', en: 'Current level', kz: 'Ағымдағы деңгей' } },
];

const NEWS = [
  { date: '20.09.2026', title: { ru: 'Турнир DLS Open начнётся 5 октября', en: 'DLS Open tournament starts October 5', kz: 'DLS Open турнирі 5 қазанда басталады' }, desc: { ru: 'Регистрация участников по BJJ и Judo уже открыта.', en: 'Registration for BJJ and Judo participants is now open.', kz: 'BJJ және Judo бойынша қатысушыларды тіркеу басталды.' } },
  { date: '15.09.2026', title: { ru: 'Новое расписание для Core 3', en: 'New schedule for Core 3', kz: 'Core 3 үшін жаңа кесте' }, desc: { ru: 'С понедельника физика переносится на вторую половину дня.', en: 'Starting Monday, Physics moves to the afternoon.', kz: 'Дүйсенбіден бастап физика түстен кейінге ауысады.' } },
  { date: '10.09.2026', title: { ru: 'Запущен DLS AI помощник', en: 'DLS AI assistant has launched', kz: 'DLS AI көмекшісі іске қосылды' }, desc: { ru: 'Теперь каждый ученик может задавать вопросы прямо в дневнике.', en: 'Every student can now ask questions right from the diary.', kz: 'Енді әрбір оқушы сұрақтарды тікелей күнделіктен қоя алады.' } },
];

const ACHIEVEMENTS = [
  { emoji: '🥇', title: { ru: 'Отличник четверти', en: 'Top of the term', kz: 'Тоқсан үздігі' }, desc: { ru: 'Средний балл выше 4.5', en: 'Average above 4.5', kz: 'Орташа балл 4.5-тен жоғары' }, locked: false },
  { emoji: '🥋', title: { ru: 'Жёлтая степень BJJ', en: 'BJJ yellow stripe', kz: 'BJJ сары дәрежесі' }, desc: { ru: 'Получена на аттестации', en: 'Earned at grading', kz: 'Аттестацияда алынды' }, locked: false },
  { emoji: '📚', title: { ru: '30 дней без пропусков', en: '30 days no absences', kz: '30 күн қалмай' }, desc: { ru: 'Посещаемость 100%', en: '100% attendance', kz: '100% қатысу' }, locked: false },
  { emoji: '🤖', title: { ru: 'Друг AI', en: 'AI friend', kz: 'AI досы' }, desc: { ru: '50 диалогов с DLS AI', en: '50 chats with DLS AI', kz: 'DLS AI-мен 50 сұхбат' }, locked: false },
  { emoji: '🏆', title: { ru: 'Чемпион DLS Open', en: 'DLS Open champion', kz: 'DLS Open чемпионы' }, desc: { ru: 'Ещё не получено', en: 'Not yet earned', kz: 'Әлі алынған жоқ' }, locked: true },
  { emoji: '🌐', title: { ru: 'Трилингв', en: 'Trilingual', kz: 'Үш тілде' }, desc: { ru: 'Использовал все 3 языка интерфейса', en: 'Used all 3 interface languages', kz: 'Интерфейстің 3 тілін де қолданды' }, locked: true },
];

/* ---------------------------------------------------------
   4. Render functions
   --------------------------------------------------------- */
function renderAll() {
  renderDashboard();
  renderDiary();
  renderStudents();
  renderScheduleTabs();
  renderSchedule();
  renderHomework();
  renderGrades();
  renderNews();
  renderAchievements();
}

function renderDashboard() {
  const lessons = SCHEDULE[currentGroup].morning.concat(SCHEDULE[currentGroup].afternoon).slice(0, 4);
  document.getElementById('dashLessons').innerHTML = lessons.map(l => `
    <div class="lesson-row">
      <div class="lesson-time">${l.time.split('–')[0]}</div>
      <div class="lesson-main" style="flex:1">
        <strong>${l.subject[currentLang]}</strong>
        <span>${l.teacher} · ${l.room}</span>
      </div>
      <span class="status-dot ${l.status === 'live' ? 'live' : l.status === 'next' ? 'next' : ''}">${t('schedule.' + l.status) || ''}</span>
    </div>
  `).join('');

  document.getElementById('dashHw').innerHTML = HOMEWORK.slice(0, 3).map(h => `
    <div class="hw-row">
      <div class="lesson-main">
        <strong>${h.title[currentLang]}</strong>
        <span>${h.subject[currentLang]} · ${t('hw.due')} ${h.due}</span>
      </div>
      <span class="pill pill-${h.status === 'new' ? 'new' : h.status === 'progress' ? 'progress' : 'done'}">${t('hw.' + h.status)}</span>
    </div>
  `).join('');

  document.getElementById('dashGrades').innerHTML = GRADES.slice(0, 4).map(g => `
    <div class="grade-row">
      <div class="lesson-main">
        <strong>${g.subject[currentLang]}</strong>
        <span>${g.type[currentLang]} · ${g.date}</span>
      </div>
      <span class="grade-cell ${g.grade <= 3 ? 'low' : ''}">${g.grade}</span>
    </div>
  `).join('');
}

function renderDiary() {
  const day = DIARY_DAYS[diaryIndex];
  document.getElementById('diaryDayLabel').textContent = day.label[currentLang];
  document.getElementById('diaryList').innerHTML = day.items.map(it => `
    <div class="diary-item">
      <div class="diary-time">${it.time}</div>
      <div>
        <p class="diary-subject">${it.subject[currentLang]}</p>
        <p class="diary-lesson">${it.lesson[currentLang]}</p>
        ${it.hw ? `<span class="diary-hw">${t('diary.hwLabel')} ${it.hw[currentLang]}</span>` : ''}
        ${it.comment ? `<p class="diary-comment">${it.comment[currentLang]}</p>` : ''}
      </div>
      ${it.grade ? `<div class="diary-grade">${it.grade}</div>` : '<div></div>'}
    </div>
  `).join('');
}
function shiftDay(delta) {
  diaryIndex = Math.min(DIARY_DAYS.length - 1, Math.max(0, diaryIndex + delta));
  renderDiary();
}

function renderStudents() {
  const q = (document.getElementById('studentSearch').value || '').toLowerCase();
  const groupFilter = document.getElementById('studentGroupFilter').value;
  const groups = ['Core 1', 'Core 2', 'Core 3'];
  let html = '';
  groups.forEach(g => {
    if (groupFilter !== 'all' && groupFilter !== g) return;
    const list = STUDENTS.filter(s => s.group === g && s.name.toLowerCase().includes(q));
    if (list.length === 0) return;
    html += `<div class="group-heading">${g}</div><div class="grid grid-2">`;
    html += list.map(s => `
      <div class="card student-card">
        <div class="student-av">${initials(s.name)}</div>
        <div>
          <strong>${s.name}</strong>
          <span>${s.grade} · ${s.dir}</span>
        </div>
      </div>
    `).join('');
    html += '</div>';
  });
  document.getElementById('studentsList').innerHTML = html || '<p style="color:var(--fog)">Ничего не найдено.</p>';
}
function initials(name) {
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

function renderScheduleTabs() {
  document.getElementById('scheduleGroupTabs').innerHTML = Object.keys(SCHEDULE).map(g => `
    <button class="${g === currentGroup ? 'active' : ''}" onclick="setScheduleGroup('${g}')">${g}</button>
  `).join('');
}
function setScheduleGroup(g) {
  currentGroup = g;
  renderScheduleTabs();
  renderSchedule();
  renderDashboard();
}
function setSchedulePart(part) {
  currentPart = part;
  document.querySelectorAll('#schedulePartTabs button').forEach(b => b.classList.toggle('active', b.dataset.part === part));
  renderSchedule();
}
function renderSchedule() {
  const rows = SCHEDULE[currentGroup][currentPart] || [];
  document.getElementById('scheduleList').innerHTML = rows.map(r => `
    <div class="sched-row">
      <span>${r.time}</span>
      <span>${r.subject[currentLang]}</span>
      <span class="sr-teacher">${r.teacher}</span>
      <span>${r.room}</span>
      <span class="sr-status"><span class="status-dot ${r.status === 'live' ? 'live' : r.status === 'next' ? 'next' : ''}">${r.status === 'upcoming' ? '' : t('schedule.' + r.status)}</span></span>
    </div>
  `).join('');
}

function renderHomework() {
  document.getElementById('homeworkList').innerHTML = HOMEWORK.map(h => `
    <div class="card hw-card">
      <div class="hw-top">
        <div>
          <div class="hw-subject">${h.subject[currentLang]}</div>
          <div class="hw-title">${h.title[currentLang]}</div>
        </div>
        <span class="pill pill-${h.status === 'new' ? 'new' : h.status === 'progress' ? 'progress' : 'done'}">${t('hw.' + h.status)}</span>
      </div>
      <p class="hw-desc">${h.desc[currentLang]}</p>
      <p class="hw-due">${t('hw.due')}: ${h.due}</p>
    </div>
  `).join('');
}

function renderGrades() {
  document.getElementById('gradesTable').innerHTML = GRADES.map(g => `
    <tr>
      <td>${g.subject[currentLang]}</td>
      <td><span class="grade-cell ${g.grade <= 3 ? 'low' : ''}">${g.grade}</span></td>
      <td>${g.date}</td>
      <td>${g.type[currentLang]}</td>
    </tr>
  `).join('');
  document.getElementById('beltList').innerHTML = BELTS.map(b => `
    <div class="belt-row">
      <div class="belt-swatch" style="background:${b.color}"></div>
      <div>
        <strong style="display:block;font-size:13.5px">${b.label[currentLang]}</strong>
        <span style="color:var(--fog);font-size:12px">${b.note[currentLang]}</span>
      </div>
    </div>
  `).join('');
}

function renderNews() {
  document.getElementById('newsList').innerHTML = NEWS.map(n => `
    <div class="card news-card">
      <span class="news-date">${n.date}</span>
      <p class="news-title">${n.title[currentLang]}</p>
      <p class="news-desc">${n.desc[currentLang]}</p>
    </div>
  `).join('');
}

function renderAchievements() {
  document.getElementById('achList').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="card ach-card ${a.locked ? 'locked' : ''}">
      <div class="ach-emoji">${a.emoji}</div>
      <p class="ach-title">${a.title[currentLang]}</p>
      <p class="ach-desc">${a.desc[currentLang]}</p>
    </div>
  `).join('');
}

/* ---------------------------------------------------------
   5. AI Chat
   --------------------------------------------------------- */
let chatLog = [];

function setAiLang(lang) {
  aiLang = lang;
  document.querySelectorAll('#aiLangSwitch button').forEach(b => b.classList.toggle('active', b.dataset.alang === lang));
}

function pushMessage(role, text) {
  chatLog.push({ role, text });
  renderChat();
}

function renderChat() {
  const log = document.getElementById('chatLog');
  log.innerHTML = chatLog.map(m => `
    <div class="msg msg-${m.role}">
      <div class="msg-av">${m.role === 'ai' ? '🤖' : 'АБ'}</div>
      <div class="msg-bubble">${escapeHtml(m.text)}</div>
    </div>
  `).join('');
  log.scrollTop = log.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function sendQuick(i18nKey) {
  document.getElementById('chatInput').value = t(i18nKey);
  sendMessage();
}

function clearChat() {
  chatLog = [];
  pushMessage('ai', t('ai.greeting'));
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  pushMessage('user', text);
  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        lang: aiLang,
        student: { name: 'Ali Bayramov', grade: 7, group: 'Core 3', direction: 'BJJ' },
        history: chatLog.slice(-8),
      }),
    });

    hideTyping();

    if (!res.ok) throw new Error('Bad response: ' + res.status);
    const data = await res.json();
    pushMessage('ai', data.reply || t('ai.offline'));
  } catch (err) {
    hideTyping();
    pushMessage('ai', t('ai.offline'));
  }
}

function showTyping() {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-av">🤖</div><div class="msg-bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}
function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + 'px';
  });
});

/* ---------------------------------------------------------
   6. Boot
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderAll();
});