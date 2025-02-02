import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import type { CalendarMode, CalendarProps } from './generateCalendar';
import generateCalendar from './generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export type CalendarType = typeof Calendar & {
  generateCalendar: typeof generateCalendar;
};

(Calendar as CalendarType).generateCalendar = generateCalendar;

export type { CalendarMode, CalendarProps };
export default Calendar as CalendarType;
