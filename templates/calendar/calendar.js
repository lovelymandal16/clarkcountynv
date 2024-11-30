import { div, section } from '../../scripts/dom-helpers.js';

// Scripts for Full Calendar
export function loadfullcalendar() {
  const scriptfullcalendar = document.createElement('script');
  scriptfullcalendar.setAttribute('type', 'text/javascript');
  scriptfullcalendar.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js';
  scriptfullcalendar.addEventListener('load', () => {
    const calendarEl = document.getElementById('calendar');
    // eslint-disable-next-line no-undef
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      events: [
        {
          title: 'All Day Event',
          start: '2024-11-01',
        },
        {
          title: 'Long Event',
          start: '2024-11-07',
          end: '2024-11-10',
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2024-11-09T16:00:00',
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2024-11-16T16:00:00',
        },
        {
          title: 'Conference',
          start: '2024-11-11',
          end: '2024-11-13',
        },
        {
          title: 'Meeting',
          start: '2024-11-12T10:30:00',
          end: '2024-11-12T12:30:00',
        },
        {
          title: 'Lunch',
          start: '2024-11-12T12:00:00',
        },
        {
          title: 'Meeting',
          start: '2024-11-12T14:30:00',
        },
        {
          title: 'Birthday Party',
          start: '2024-11-13T07:00:00',
        },
        {
          title: 'Click for Google',
          url: 'https://google.com/',
          start: '2024-11-28',
        },
      ],
    });
    calendar.render();
  });
  document.head.append(scriptfullcalendar);
}

export default async function decorate(doc) {
  const $main = doc.querySelector('main');
  const $mainChildren = Array.from($main.childNodes);
  const $section = section();
  const $calendarSection = section();

  $mainChildren.forEach((child) => {
    $section.appendChild(child);
  });

  $main.appendChild($section);
  const calDiv = div({ id: 'calendar' });
  $calendarSection.append(calDiv);
  $main.append($calendarSection);
  loadfullcalendar();
}
