import type {
  PickerProps as RcPickerProps,
  RangePickerProps as RcRangePickerProps,
} from 'rc-picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { Locale as RcPickerLocale } from 'rc-picker/lib/interface';

import type { InputStatus } from '../../_util/statusUtils';
import type { AnyObject } from '../../_util/type';
import type { SizeType } from '../../config-provider/SizeContext';
import type { Variant } from '../../form/hooks/useVariants';
import type { TimePickerLocale } from '../../time-picker';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';

const DataPickerPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const;
type DataPickerPlacement = (typeof DataPickerPlacements)[number];

type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'hideHeader' | 'components'
> & {
  locale?: PickerLocale;
  size?: SizeType;
  placement?: DataPickerPlacement;
  /** @deprecated Use `variant` instead */
  bordered?: boolean;
  status?: InputStatus;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
};

export type PickerLocale = {
  lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
  timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;

export type AdditionalPickerLocaleProps = {
  dateFormat?: string;
  dateTimeFormat?: string;
  weekFormat?: string;
  monthFormat?: string;
};

export type AdditionalPickerLocaleLangProps = {
  placeholder: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangeYearPlaceholder?: [string, string];
  rangeQuarterPlaceholder?: [string, string];
  rangeMonthPlaceholder?: [string, string];
  rangeWeekPlaceholder?: [string, string];
  rangePlaceholder?: [string, string];
};

export type PickerProps<DateType extends AnyObject = any> = InjectDefaultProps<
  RcPickerProps<DateType>
>;

export type RangePickerProps<DateType extends AnyObject = any> = InjectDefaultProps<
  RcRangePickerProps<DateType>
>;

function generatePicker<DateType extends AnyObject>(generateConfig: GenerateConfig<DateType>) {
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
}

export default generatePicker;
