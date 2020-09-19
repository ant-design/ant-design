import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';

export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
