import type { Moment } from 'moment';
import type { GenerateConfig } from 'rc-picker/lib/generate';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generateCalendar, { CalendarProps } from './generateCalendar';

const Calendar = generateCalendar<Moment>(
  momentGenerateConfig as unknown as GenerateConfig<Moment>,
);

export { CalendarProps };
export default Calendar;
