import { DLSData } from './data.js';

export function initNews() {
  const news = DLSData.get('news');
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  grid.innerHTML = news
    .map(
      (n) => `
      <article class="news-card news-card--large">
        <div class="news-card-cover" style="background:${n.color}"></div>
        <div class="news-card-body">
          <span class="news-date">${formatDate(n.date)}</span>
          <h3 class="news-title">${n.title}</h3>
          <p class="news-excerpt">${n.excerpt}</p>
        </div>
      </article>`
    )
    .join('');
}

function formatDate(iso) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date(iso));
}