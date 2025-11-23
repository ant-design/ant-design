import dayjsGenerateConfig from '@rc-component/picker/lib/generate/dayjs';
import type { Dayjs } from 'dayjs';

import genPurePanel from '../_util/PurePanel';
import generatePicker from './generatePicker';
import type {
  RangePickerProps as BaseRangePickerProps,
  PickerProps,
  PickerPropsWithMultiple,
} from './generatePicker/interface';

export type DatePickerProps<
  ValueType = Dayjs | Dayjs,
  IsMultiple extends boolean = boolean,
> = PickerPropsWithMultiple<Dayjs, PickerProps<Dayjs>, ValueType, IsMultiple>;
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

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(DatePicker, 'popupAlign', undefined, 'picker');
(DatePicker as DatePickerType)._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
const PureRangePanel = genPurePanel(DatePicker.RangePicker, 'popupAlign', undefined, 'picker');
(DatePicker as DatePickerType)._InternalRangePanelDoNotUseOrYouWillBeFired = PureRangePanel;
(DatePicker as DatePickerType).generatePicker = generatePicker;

export default DatePicker as DatePickerType;
