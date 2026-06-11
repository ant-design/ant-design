import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export interface CalendarEvent {
  key: string;
  title: string;
  start: Dayjs;
  end: Dayjs;
  color: string;
}

const getEvents = (token: ReturnType<typeof theme.useToken>['token']): CalendarEvent[] => [
  {
    key: 'release',
    title: 'Release window',
    start: dayjs('2026-01-08'),
    end: dayjs('2026-01-11'),
    color: token.colorPrimary,
  },
  {
    key: 'design-review',
    title: 'Design review',
    start: dayjs('2026-01-14'),
    end: dayjs('2026-01-14'),
    color: token.colorSuccess,
  },
  {
    key: 'maintenance',
    title: 'Maintenance',
    start: dayjs('2026-01-21'),
    end: dayjs('2026-01-24'),
    color: token.colorWarning,
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
  const { token } = theme.useToken();
  const events = React.useMemo(() => getEvents(token), [token]);
  const calendarStyle = React.useMemo(
    () =>
      ({
        '--calendar-event-range-date-padding': `${token.paddingXS}px`,
        '--calendar-event-range-date-margin': `${token.marginXS / 2}px`,
      }) as React.CSSProperties,
    [token],
  );

  const cellRender = React.useCallback<NonNullable<CalendarProps<Dayjs>['cellRender']>>(
    (current, info) => {
      if (info.type !== 'date') {
        return null;
      }

      const currentEvents = events.filter((event) => isInRange(current, event));

      return (
        <div className="calendar-event-range-cell">
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
    },
    [events],
  );

  return (
    <Calendar
      className="calendar-event-range-calendar"
      style={calendarStyle}
      defaultValue={dayjs('2026-01-01')}
      cellRender={cellRender}
    />
  );
};

export default App;
