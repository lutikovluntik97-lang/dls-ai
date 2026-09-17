import { DLSData } from './data.js';

export function initProfile() {
  render();
  bindEdit();
}

function render() {
  const user = DLSData.getUser();
  const grades = DLSData.get('recentGrades');
  const achievements = DLSData.get('achievements');

  setText('profile-name', user.name);
  setText('profile-grade-group', `${user.grade} · Группа ${user.group}`);
  setText('profile-bio', user.bio);
  setText('profile-avg', user.averageGrade.toFixed(1));
  setText('profile-attendance', `${user.attendance}%`);
  setText('profile-achievements-count', String(achievements.length));

  const avatar = document.getElementById('profile-avatar');
  if (avatar) {
    avatar.style.background = user.avatarColor;
    avatar.textContent = user.name
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }

  const recentList = document.getElementById('profile-recent-grades');
  if (recentList) {
    recentList.innerHTML = grades
      .slice(0, 5)
      .map(
        (g) => `
        <li class="grade-row">
          <span class="grade-pill grade-pill--${g.grade}">${g.grade}</span>
          <div class="grade-info"><p class="grade-subject">${g.subject}</p></div>
        </li>`
      )
      .join('');
  }

  const achGrid = document.getElementById('profile-achievements');
  if (achGrid) {
    achGrid.innerHTML = achievements
      .map(
        (a) => `
        <li class="achievement-card achievement-card--compact">
          <span class="achievement-icon"><i data-lucide="${a.icon}" aria-hidden="true"></i></span>
          <p class="achievement-title">${a.title}</p>
        </li>`
      )
      .join('');
  }

  // populate edit form defaults
  const form = document.getElementById('profile-edit-form');
  if (form) {
    form.name.value = user.name;
    form.grade.value = user.grade;
    form.group.value = user.group;
    form.bio.value = user.bio;
  }

  window.lucide?.createIcons();
}

function bindEdit() {
  const editBtn = document.getElementById('profile-edit-toggle');
  const editPanel = document.getElementById('profile-edit-panel');
  const form = document.getElementById('profile-edit-form');
  const cancelBtn = document.getElementById('profile-edit-cancel');

  editBtn?.addEventListener('click', () => {
    editPanel?.toggleAttribute('hidden');
  });
  cancelBtn?.addEventListener('click', () => editPanel?.setAttribute('hidden', ''));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    DLSData.updateUser({
      name: data.get('name'),
      firstName: String(data.get('name')).split(' ')[0],
      grade: data.get('grade'),
      group: data.get('group'),
      bio: data.get('bio'),
    });
    editPanel?.setAttribute('hidden', '');
    render();
    showToast('Профиль обновлён');
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('toast--visible');
  setTimeout(() => toast.classList.remove('toast--visible'), 2600);
}