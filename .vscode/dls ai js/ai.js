const CHAT_STORAGE_KEY = 'dls:ai:history';

let history = [];
let isSending = false;

export function initAI() {
  history = loadHistory();

  const form = document.getElementById('ai-form');
  const input = document.getElementById('ai-input');
  const messagesEl = document.getElementById('ai-messages');
  const clearBtn = document.getElementById('ai-clear');
  const suggestions = document.querySelectorAll('[data-ai-suggestion]');

  if (!form || !input || !messagesEl) return;

  renderHistory();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    autoGrow(input);
    sendMessage(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  input.addEventListener('input', () => autoGrow(input));

  clearBtn?.addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
  });

  suggestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-ai-suggestion');
      if (text) sendMessage(text);
    });
  });

  function renderHistory() {
    if (history.length === 0) {
      messagesEl.innerHTML = '';
      document.getElementById('ai-empty')?.removeAttribute('hidden');
      return;
    }
    document.getElementById('ai-empty')?.setAttribute('hidden', '');
    messagesEl.innerHTML = history.map(messageBubble).join('');
    scrollToBottom();
  }

  async function sendMessage(text) {
    if (isSending) return;
    isSending = true;

    document.getElementById('ai-empty')?.setAttribute('hidden', '');
    history.push({ role: 'user', content: text });
    saveHistory();
    appendMessage(history[history.length - 1]);

    const typingEl = appendTyping();
    setFormDisabled(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });

      const data = await res.json().catch(() => ({}));
      typingEl.remove();

      if (!res.ok) {
        appendMessage({ role: 'assistant', content: data.error || 'Произошла ошибка. Попробуйте ещё раз.', error: true });
      } else {
        const reply = { role: 'assistant', content: data.reply };
        history.push(reply);
        saveHistory();
        appendMessage(reply);
      }
    } catch {
      typingEl.remove();
      appendMessage({ role: 'assistant', content: 'Не удалось связаться с сервером. Проверьте соединение.', error: true });
    } finally {
      setFormDisabled(false);
      isSending = false;
      input.focus();
    }
  }

  function appendMessage(msg) {
    messagesEl.insertAdjacentHTML('beforeend', messageBubble(msg));
    scrollToBottom();
  }

  function appendTyping() {
    const el = document.createElement('div');
    el.className = 'ai-message ai-message--assistant ai-message--typing';
    el.innerHTML = `
      <span class="ai-avatar ai-avatar--bot"><i data-lucide="sparkles" aria-hidden="true"></i></span>
      <span class="ai-bubble ai-typing"><span></span><span></span><span></span></span>`;
    messagesEl.appendChild(el);
    window.lucide?.createIcons();
    scrollToBottom();
    return el;
  }

  function setFormDisabled(disabled) {
    input.disabled = disabled;
    form.querySelector('button[type="submit"]').disabled = disabled;
  }

  function scrollToBottom() {
    messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
  }
}

function messageBubble(msg) {
  const isUser = msg.role === 'user';
  return `
    <div class="ai-message ${isUser ? 'ai-message--user' : 'ai-message--assistant'} ${msg.error ? 'ai-message--error' : ''}">
      ${
        isUser
          ? ''
          : `<span class="ai-avatar ai-avatar--bot"><i data-lucide="sparkles" aria-hidden="true"></i></span>`
      }
      <span class="ai-bubble">${escapeHtml(msg.content)}</span>
    </div>`;
}

function autoGrow(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML.replace(/\n/g, '<br>');
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history.slice(-40)));
  } catch {
    /* ignore storage errors */
  }
}