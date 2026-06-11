import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

type CalendarEvent = {
  key: string;
  title: string;
  start: Dayjs;
  end: Dayjs;
  color: string;
};

const events: CalendarEvent[] = [
  {
    key: 'release',
    title: 'Release window',
    start: dayjs('2026-01-08'),
    end: dayjs('2026-01-11'),
    color: '#1677ff',
  },
  {
    key: 'design-review',
    title: 'Design review',
    start: dayjs('2026-01-14'),
    end: dayjs('2026-01-14'),
    color: '#52c41a',
  },
  {
    key: 'maintenance',
    title: 'Maintenance',
    start: dayjs('2026-01-21'),
    end: dayjs('2026-01-24'),
    color: '#fa8c16',
  },
];

const isInRange = (current: Dayjs, event: CalendarEvent) =>
  !current.isBefore(event.start, 'day') && !current.isAfter(event.end, 'day');

const getRangePosition = (current: Dayjs, event: CalendarEvent) => {
  const starts = current.isSame(event.start, 'day');
  const ends = current.isSame(event.end, 'day');

  if (starts && ends) {
    return 'single';
  }

  if (starts) {
    return 'start';
  }

  if (ends) {
    return 'end';
  }

  return 'middle';
};

const App: React.FC = () => {
  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }

    const currentEvents = events.filter((event) => isInRange(current, event));

    return (
      <div className="calendar-event-range-cell">
        {info.originNode}
        <div className="calendar-event-range-list">
          {currentEvents.map((event) => {
            const position = getRangePosition(current, event);

            return (
              <span
                key={event.key}
                className={`calendar-event-range-bar calendar-event-range-bar-${position}`}
                style={{ '--event-color': event.color } as React.CSSProperties}
                title={`${event.title}: ${event.start.format('YYYY-MM-DD')} - ${event.end.format(
                  'YYYY-MM-DD',
                )}`}
              >
                {position === 'start' || position === 'single' ? event.title : ''}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return <Calendar defaultValue={dayjs('2026-01-01')} cellRender={cellRender} />;
};

export default App;
