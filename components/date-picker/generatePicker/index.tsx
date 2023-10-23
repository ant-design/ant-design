import type {
  PickerBaseProps as RCPickerBaseProps,
  PickerDateProps as RCPickerDateProps,
  PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker';
import type {
  RangePickerBaseProps as RCRangePickerBaseProps,
  RangePickerDateProps as RCRangePickerDateProps,
  RangePickerTimeProps as RCRangePickerTimeProps,
} from 'rc-picker/lib/RangePicker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import type { Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import type { InputStatus } from '../../_util/statusUtils';
import type { SizeType } from '../../config-provider/SizeContext';
import type { TimePickerLocale } from '../../time-picker';
import generateRangePicker from './generateRangePicker';
import generateSinglePicker from './generateSinglePicker';

const DataPickerPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const;
type DataPickerPlacement = typeof DataPickerPlacements[number];

type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'hideHeader' | 'components'
> & {
  locale?: PickerLocale;
  size?: SizeType;
  placement?: DataPickerPlacement;
  bordered?: boolean;
  status?: InputStatus;
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

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>;
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>;
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>;

export type PickerProps<DateType> =
  | PickerBaseProps<DateType>
  | PickerDateProps<DateType>
  | PickerTimeProps<DateType>;

// Range Picker Props
export type RangePickerBaseProps<DateType> = InjectDefaultProps<RCRangePickerBaseProps<DateType>>;
export type RangePickerDateProps<DateType> = InjectDefaultProps<RCRangePickerDateProps<DateType>>;
export type RangePickerTimeProps<DateType> = InjectDefaultProps<RCRangePickerTimeProps<DateType>>;

export type RangePickerProps<DateType> =
  | RangePickerBaseProps<DateType>
  | RangePickerDateProps<DateType>
  | RangePickerTimeProps<DateType>;

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
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
