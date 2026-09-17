import { DLSData } from './data.js';

export function initStudents() {
  const groups = DLSData.get('groups');
  const container = document.getElementById('groups-list');
  if (!container) return;

  container.innerHTML = groups
    .map(
      (g, i) => `
      <section class="group-block" data-group="${g.id}">
        <button class="group-head" type="button" aria-expanded="${i === 0}">
          <span class="group-name">${g.name}</span>
          <span class="group-count">${g.students.length} учеников</span>
          <i data-lucide="chevron-down" class="group-chevron" aria-hidden="true"></i>
        </button>
        <ul class="group-students" ${i === 0 ? '' : 'hidden'}>
          ${g.students.map(studentRow).join('')}
        </ul>
      </section>`
    )
    .join('');

  container.querySelectorAll('.group-head').forEach((head) => {
    head.addEventListener('click', () => {
      const list = head.nextElementSibling;
      const expanded = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!expanded));
      list?.toggleAttribute('hidden', expanded);
    });
  });

  container.querySelectorAll('[data-student-id]').forEach((row) => {
    row.addEventListener('click', () => openStudentModal(row.getAttribute('data-student-id'), groups));
  });

  bindModalClose();
  window.lucide?.createIcons();
}

function studentRow(s) {
  return `
    <li class="student-row" data-student-id="${s.id}" tabindex="0" role="button">
      <span class="student-avatar" style="background:${avatarColor(s.name)}">${initials(s.name)}</span>
      <div class="student-info">
        <p class="student-name">${s.name}</p>
        <p class="student-meta">${s.grade} · ${s.track}</p>
      </div>
      <span class="student-avg">${s.avgGrade.toFixed(1)}</span>
    </li>`;
}

function openStudentModal(id, groups) {
  const student = groups.flatMap((g) => g.students).find((s) => s.id === id);
  if (!student) return;

  const modal = document.getElementById('student-modal');
  if (!modal) return;

  modal.querySelector('.modal-avatar').style.background = avatarColor(student.name);
  modal.querySelector('.modal-avatar').textContent = initials(student.name);
  modal.querySelector('.modal-name').textContent = student.name;
  modal.querySelector('.modal-meta').textContent = `${student.grade} · ${student.track}`;
  modal.querySelector('.modal-avg').textContent = student.avgGrade.toFixed(1);

  modal.removeAttribute('hidden');
  requestAnimationFrame(() => modal.classList.add('modal--open'));
}

function bindModalClose() {
  const modal = document.getElementById('student-modal');
  if (!modal || modal.dataset.bound) return;
  modal.dataset.bound = 'true';

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('modal--open');
    setTimeout(() => modal.setAttribute('hidden', ''), 200);
  }
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

function avatarColor(seed) {
  const palette = ['#6c8cff', '#a78bfa', '#34d399', '#f97362', '#fbbf24', '#38bdf8'];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}