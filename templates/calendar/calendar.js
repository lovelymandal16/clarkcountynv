import { div, section } from '../../scripts/dom-helpers.js';

// Scripts for Full Calendar

function getEvents() {
  const events = [
    {
      title: 'All Day Event',
      start: '2024-12-01',
      backgroundColor: '#3787d8',
    },
    {
      title: 'Long Event',
      start: '2024-12-07',
      end: '2024-12-10',
      backgroundColor: '#da80c1',
    },
    {
      groupId: '999',
      title: 'Repeating Event',
      start: '2024-12-09T16:00:00',
      backgroundColor: '#3a9500',
    },
    {
      groupId: '1000',
      title: 'Repeating Event',
      start: '2024-12-16T16:00:00',
      end: '2024-12-16T18:00:00',
      backgroundColor: '#3a9500',
      borderColor: 'blue',
    },
    {
      title: 'Conference',
      start: '2024-12-11',
      end: '2024-12-13',
      backgroundColor: 'red',
    },
    {
      title: 'Meeting',
      start: '2024-12-12T10:30:00',
      end: '2024-12-12T12:30:00',
      backgroundColor: 'red',
    },
    {
      title: 'Lunch',
      start: '2024-12-12T12:00:00',
      backgroundColor: 'red',
    },
    {
      title: 'Meeting',
      start: '2024-12-12T14:30:00',
      backgroundColor: 'red',
    },
    {
      title: 'Birthday Party',
      start: '2024-12-13T07:00:00',
      backgroundColor: 'red',
    },
    {
      title: 'Click for Facebook',
      url: 'https://google.com/',
      start: '2024-12-28',
      backgroundColor: 'red',
    },
  ];
  return events;
}

function initializeCalendar() {
  const calendarEl = document.getElementById('calendar');
  const data = getEvents();
  // eslint-disable-next-line no-undef
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: data,
  });
  calendar.render();
}

export function loadfullcalendar() {
  const scriptfullcalendar = document.createElement('script');
  scriptfullcalendar.setAttribute('type', 'text/javascript');
  scriptfullcalendar.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js';
  scriptfullcalendar.addEventListener('load', initializeCalendar);
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
