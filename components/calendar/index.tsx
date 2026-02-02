import dayjsGenerateConfig from '@rc-component/picker/generate/dayjs';
import type { Dayjs } from 'dayjs';

import generateCalendar from './generateCalendar';

export type { CalendarMode, CalendarProps, CalendarSemanticAllType } from './generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export type CalendarType = typeof Calendar & {
  generateCalendar: typeof generateCalendar;
};

(Calendar as CalendarType).generateCalendar = generateCalendar;

export default Calendar as CalendarType;
