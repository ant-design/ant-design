import * as React from 'react';
import type { Dayjs } from 'dayjs';
import type { PickerRef } from 'rc-picker';

import genPurePanel from '../_util/PurePanel';
import type { InputStatus } from '../_util/statusUtils';
import type { AnyObject } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import DatePicker from '../date-picker';
import type {
  GenericTimePickerProps,
  PickerPropsWithMultiple,
  RangePickerProps,
} from '../date-picker/generatePicker/interface';
import useVariant from '../form/hooks/useVariants';

export type PickerTimeProps<DateType extends AnyObject> = PickerPropsWithMultiple<
  DateType,
  GenericTimePickerProps<DateType>
>;

export type RangePickerTimeProps<DateType extends AnyObject> = Omit<
  RangePickerProps<DateType>,
  'showTime' | 'picker'
>;

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Dayjs>, 'picker'> {
  popupClassName?: string;
}

const RangePicker = React.forwardRef<PickerRef, TimeRangePickerProps>((props, ref) => (
  <InternalRangePicker {...props} picker="time" mode={undefined} ref={ref} />
));

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {
  addon?: () => React.ReactNode;
  status?: InputStatus;
  popupClassName?: string;
  rootClassName?: string;
}

const TimePicker = React.forwardRef<PickerRef, TimePickerProps>(
  ({ addon, renderExtraFooter, variant, bordered, ...restProps }, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('TimePicker');

      warning.deprecated(!addon, 'addon', 'renderExtraFooter');
    }

    const [mergedVariant] = useVariant('timePicker', variant, bordered);

    const internalRenderExtraFooter = React.useMemo<TimePickerProps['renderExtraFooter']>(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }

      if (addon) {
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...restProps}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
        variant={mergedVariant}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TimePicker.displayName = 'TimePicker';
}

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(TimePicker, 'popupAlign', undefined, 'picker');
(TimePicker as MergedTimePicker)._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;
(TimePicker as MergedTimePicker)._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default TimePicker as MergedTimePicker;
