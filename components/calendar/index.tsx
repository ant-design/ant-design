import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generateCalendar from './generateCalendar';

export { HeaderProps } from './Header';

const Calendar = generateCalendar<Moment>(momentGenerateConfig);

export default Calendar;
