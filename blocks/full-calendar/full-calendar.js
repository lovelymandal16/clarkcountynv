import { div } from '../../scripts/dom-helpers.js';
import { loadScript } from '../../scripts/aem.js';

async function fc1() {
  await loadScript('https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js');
}

export default async function decorate(block) {
  const calDiv = div({ id: 'calendar' });
  block.append(calDiv);
  await fc1();
  document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
    });
    calendar.render();
  });
}
