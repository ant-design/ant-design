import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const useStyle = createStyles(({ token, css }) => {
  const cellOffset = token.paddingXS + token.marginXS / 2;
  const barHeight = token.controlHeightSM - token.marginXXS;
  const barRadius = barHeight / 2;

  return {
    calendar: css`
      .ant-picker-calendar-date-content {
        overflow: visible;
      }
    `,
    cell: css`
      min-height: ${token.controlHeight * 2}px;
    `,
    list: css`
      display: flex;
      flex-direction: column;
      gap: ${token.marginXXS / 2}px;
      margin-top: ${token.marginXXS}px;
    `,
    bar: css`
      display: block;
      height: ${barHeight}px;
      overflow: hidden;
      color: ${token.colorTextLightSolid};
      font-size: ${token.fontSizeSM}px;
      line-height: ${barHeight}px;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: var(--event-color);
    `,
    barStart: css`
      margin-inline-end: -${cellOffset}px;
      padding-inline-start: ${token.paddingXXS + token.paddingXXS / 2}px;
      border-start-start-radius: ${barRadius}px;
      border-end-start-radius: ${barRadius}px;
    `,
    barMiddle: css`
      margin-inline: -${cellOffset}px;
    `,
    barEnd: css`
      margin-inline-start: -${cellOffset}px;
      border-start-end-radius: ${barRadius}px;
      border-end-end-radius: ${barRadius}px;
    `,
    barSingle: css`
      padding-inline-start: ${token.paddingXXS + token.paddingXXS / 2}px;
      border-radius: ${barRadius}px;
    `,
  };
});

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
    end: dayjs('2026-01-10'),
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
  const { styles } = useStyle();
  const events = React.useMemo(() => getEvents(token), [token]);

  const cellRender = React.useCallback<NonNullable<CalendarProps<Dayjs>['cellRender']>>(
    (current, info) => {
      if (info.type !== 'date') {
        return null;
      }

      const currentEvents = events.filter((event) => isInRange(current, event));

      return (
        <div className={styles.cell}>
          <div className={styles.list}>
            {currentEvents.map((event) => {
              const position = getRangePosition(current, event);
              const rangeClassName = {
                start: styles.barStart,
                middle: styles.barMiddle,
                end: styles.barEnd,
                single: styles.barSingle,
              }[position];

              return (
                <span
                  key={event.key}
                  className={`${styles.bar} ${rangeClassName}`}
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
    [events, styles],
  );

  return (
    <Calendar
      className={styles.calendar}
      defaultValue={dayjs('2026-01-01')}
      cellRender={cellRender}
    />
  );
};

export default App;
