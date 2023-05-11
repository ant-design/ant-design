import type { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import genPurePanel from '../_util/PurePanel';
import type {
  RangePickerProps as BaseRangePickerProps,
  PickerDateProps,
  PickerProps,
} from './generatePicker';
import generatePicker from './generatePicker';
import { transPlacement2DropdownAlign } from './util';

export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

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
(DatePicker as any)._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const PureRangePanel = genPurePanel(DatePicker.RangePicker, 'picker', null, postPureProps);
(DatePicker as any)._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;

export default DatePicker as typeof DatePicker & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
  _InternalRangePanelDoNotUseOrYouWillBeFired: typeof PureRangePanel;
};
