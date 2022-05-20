import type { Moment } from 'moment';
import * as React from 'react';
import DatePicker from '../date-picker';
import type { PickerTimeProps, RangePickerTimeProps } from '../date-picker/generatePicker';
import warning from '../_util/warning';
import type { InputStatus } from '../_util/statusUtils';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface TimeRangePickerProps extends Omit<RangePickerTimeProps<Moment>, 'picker'> {
  /** @deprecated `popupClassName` is an alias of `dropdownClassName`. Use `dropdownClassName` instead. */
  popupClassName?: string;
}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => {
  if (props.popupClassName) {
    warning(
      false,
      'TimePicker',
      '`popupClassName` is an alias of `dropdownClassName` and and will be removed in next major version. Use `dropdownClassName` instead.',
    );
  }

  return (
    <InternalRangePicker
      {...props}
      dropdownClassName={props.dropdownClassName || props.popupClassName}
      picker="time"
      mode={undefined}
      ref={ref}
    />
  );
});

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {
  addon?: () => React.ReactNode;
  /** @deprecated `popupClassName` is an alias of `dropdownClassName`. Use `dropdownClassName` instead. */
  popupClassName?: string;
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

    if (popupClassName) {
      warning(
        false,
        'TimePicker',
        '`popupClassName` is an alias of `dropdownClassName` and will be removed in next major version. Use `dropdownClassName` instead.',
      );
    }

    return (
      <InternalTimePicker
        {...restProps}
        dropdownClassName={dropdownClassName || popupClassName}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

TimePicker.displayName = 'TimePicker';

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
