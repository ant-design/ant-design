import type { GenerateConfig } from 'rc-picker/lib/generate/index';

import type { AnyObject } from '../../_util/type';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';

export type { PickerLocale, PickerProps } from './interface';

const generatePicker = <DateType extends AnyObject = AnyObject>(
  generateConfig: GenerateConfig<DateType>,
) => {
  // =========================== Picker ===========================
  const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker } =
    generateSinglePicker(generateConfig);

  // ======================== Range Picker ========================
  const RangePicker = generateRangePicker(generateConfig);

  // =========================== Export ===========================
  type MergedDatePickerType = typeof DatePicker & {
    displayName?: string;
    WeekPicker: typeof WeekPicker;
    MonthPicker: typeof MonthPicker;
    YearPicker: typeof YearPicker;
    RangePicker: typeof RangePicker;
    TimePicker: typeof TimePicker;
    QuarterPicker: typeof QuarterPicker;
  };

  const MergedDatePicker = DatePicker as MergedDatePickerType;

  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;
  MergedDatePicker.QuarterPicker = QuarterPicker;

  if (process.env.NODE_ENV !== 'production') {
    MergedDatePicker.displayName = 'DatePicker';
  }

  return MergedDatePicker;
};

export default generatePicker;
