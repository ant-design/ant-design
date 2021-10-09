import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';
import { IQuickPickerProps } from './generatePicker/QuickPicker';
import { IQuickItem } from './generatePicker/const';

export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;
export type QuickPickerProps = IQuickPickerProps;
export type QuickListItem = IQuickItem;

const DatePicker = generatePicker<Moment>(momentGenerateConfig);
export default DatePicker;
