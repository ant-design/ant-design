import * as React from 'react';
import type { PickerRef } from '@rc-component/picker';
import type { Dayjs } from 'dayjs';

import type { RemoveStringSemanticType, SemanticType } from '../_util/hooks';
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
import useMergedPickerSemantic from '../date-picker/hooks/useMergedPickerSemantic';
import useVariant from '../form/hooks/useVariants';

export type TimePickerSemanticType = {
  classNames?: {
    root?: string;
    prefix?: string;
    input?: string;
    suffix?: string;
    popup?:
      | {
          root?: string;
          content?: string;
          item?: string;
          footer?: string;
          container?: string;
        }
      | string;
  };
  styles?: {
    root?: React.CSSProperties;
    prefix?: React.CSSProperties;
    input?: React.CSSProperties;
    suffix?: React.CSSProperties;
    popup?: {
      root?: React.CSSProperties;
      content?: React.CSSProperties;
      item?: React.CSSProperties;
      footer?: React.CSSProperties;
      container?: React.CSSProperties;
    };
  };
};
export type InternalTimePickerSemanticType = RemoveStringSemanticType<TimePickerSemanticType>;

export type TimePickerClassNames = SemanticType<
  TimePickerProps,
  TimePickerSemanticType['classNames']
>;

export type TimePickerStyles = SemanticType<TimePickerProps, TimePickerSemanticType['styles']>;

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
  /** @deprecated Please use `classNames.popup` instead */
  popupClassName?: string;
  /** @deprecated Please use `styles.popup` instead */
  popupStyle?: React.CSSProperties;
}

const RangePicker = React.forwardRef<PickerRef, TimeRangePickerProps>((props, ref) => (
  <InternalRangePicker {...props} picker="time" mode={undefined} ref={ref} />
));

export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, 'picker' | 'classNames' | 'styles'> {
  addon?: () => React.ReactNode;
  status?: InputStatus;
  /** @deprecated Please use `classNames.popup` instead */
  popupClassName?: string;
  /** @deprecated Please use `styles.popup` instead */
  popupStyle?: React.CSSProperties;
  rootClassName?: string;

  classNames?: TimePickerClassNames;
  styles?: TimePickerStyles;
}

const TimePicker = React.forwardRef<PickerRef, TimePickerProps>((props, ref) => {
  const {
    addon,
    renderExtraFooter,
    variant,
    bordered,
    classNames,
    styles,
    popupClassName,
    popupStyle,
    ...restProps
  } = props;
  // ====================== Warning =======================
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
  // =========== Merged Props for Semantic ===========
  const mergedProps: TimePickerProps = {
    ...props,
    variant: mergedVariant,
  };
  // =========== Merged Semantic ===========
  const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(
    'timePicker',
    classNames,
    styles,
    popupClassName,
    popupStyle,
    mergedProps,
  );

  return (
    <InternalTimePicker
      {...restProps}
      mode={undefined}
      ref={ref}
      renderExtraFooter={internalRenderExtraFooter}
      variant={mergedVariant}
      classNames={mergedClassNames as unknown as TimePickerSemanticType['classNames']}
      styles={mergedStyles as unknown as TimePickerSemanticType['styles']}
    />
  );
});

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
