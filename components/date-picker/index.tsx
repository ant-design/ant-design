import type { Moment } from 'moment';
import type { GenerateConfig } from 'rc-picker/lib/generate';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import type {
  PickerDateProps,
  PickerProps,
  RangePickerProps as BaseRangePickerProps,
} from './generatePicker';
import generatePicker from './generatePicker';

export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;

const DatePicker = generatePicker<Moment>(
  momentGenerateConfig as unknown as GenerateConfig<Moment>,
);

export default DatePicker;
