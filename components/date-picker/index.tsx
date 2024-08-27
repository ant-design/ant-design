import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import genPurePanel from '../_util/PurePanel';
import generatePicker from './generatePicker';
import type {
  RangePickerProps as BaseRangePickerProps,
  PickerProps,
  PickerPropsWithMultiple,
} from './generatePicker/interface';
import { transPlacement2DropdownAlign } from './util';

export type DatePickerProps<ValueType = Dayjs | Dayjs> = PickerPropsWithMultiple<
  Dayjs,
  PickerProps<Dayjs>,
  ValueType
>;
export type MonthPickerProps<ValueType = Dayjs | Dayjs> = Omit<
  DatePickerProps<ValueType>,
  'picker'
>;
export type WeekPickerProps<ValueType = Dayjs | Dayjs> = Omit<DatePickerProps<ValueType>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export type DatePickerType = typeof DatePicker & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
  _InternalRangePanelDoNotUseOrYouWillBeFired: typeof PureRangePanel;
  generatePicker: typeof generatePicker;
};

function postPureProps(props: DatePickerProps) {
  const dropdownAlign = transPlacement2DropdownAlign(props.direction, props.placement);

  dropdownAlign.overflow!.adjustY = false;
  dropdownAlign.overflow!.adjustX = false;

  return {
    ...props,
    dropdownAlign,
  };
}

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(DatePicker, 'picker', null, postPureProps);
(DatePicker as DatePickerType)._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const PureRangePanel = genPurePanel(DatePicker.RangePicker, 'picker', null, postPureProps);
(DatePicker as DatePickerType)._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;
(DatePicker as DatePickerType).generatePicker = generatePicker;

export default DatePicker as DatePickerType;
