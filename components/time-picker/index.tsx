import type { Moment } from 'moment';
import * as React from 'react';
import DatePicker from '../date-picker';
import type { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';
import type { InputStatus } from '../_util/statusUtils';
import warning from '../_util/warning';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `popupClassName` instead.
   */
  dropdownClassName?: string;
  popupClassName?: string;
}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => {
  const { dropdownClassName, popupClassName } = props;
  return (
    <InternalRangePicker
      {...props}
      dropdownClassName={dropdownClassName}
      popupClassName={popupClassName}
      picker="time"
      mode={undefined}
      ref={ref}
    />
  );
});

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
  addon?: () => React.ReactNode;
  popupClassName?: string;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `popupClassName` instead.
   */
  dropdownClassName?: string;
  status?: InputStatus;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, popupClassName, dropdownClassName, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }

      if (addon) {
        warning(
          false,
          'TimePicker',
          '`addon` is deprecated. Please use `renderExtraFooter` instead.',
        );
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        dropdownClassName={dropdownClassName}
        popupClassName={popupClassName}
        {...restProps}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TimePicker.displayName = 'TimePicker';
}

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
