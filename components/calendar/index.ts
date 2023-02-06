import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import type { CalendarProps } from './generateCalendar';
import generateCalendar from './generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export type { CalendarProps };
export default Calendar;
