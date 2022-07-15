import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar, { CalendarProps } from './generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export { CalendarProps };
export default Calendar;
