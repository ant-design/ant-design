import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from './generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
