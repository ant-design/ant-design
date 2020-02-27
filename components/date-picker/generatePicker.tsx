import * as React from 'react';
import classNames from 'classnames';
import RCPicker, { RangePicker as RCRangePicker } from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import {
  PickerBaseProps as RCPickerBaseProps,
  PickerDateProps as RCPickerDateProps,
  PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
import {
  RangePickerBaseProps as RCRangePickerBaseProps,
  RangePickerDateProps as RCRangePickerDateProps,
  RangePickerTimeProps as RCRangePickerTimeProps,
} from 'rc-picker/lib/RangePicker';
import { PickerMode } from 'rc-picker/lib/interface';
import { CalendarOutlined, ClockCircleOutlined, CloseCircleFilled } from '@ant-design/icons';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from './locale/en_US';
import { getPlaceholder, getRangePlaceholder } from './util';
import PickerButton from './PickerButton';
import PickerTag from './PickerTag';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

const Components = { button: PickerButton, rangeItem: PickerTag };

function toArray<T>(list: T | T[]): T[] {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}

function getTimeProps<DateType>(
  props: { format?: string; picker?: PickerMode } & SharedTimeProps<DateType>,
) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props;

  const firstFormat = toArray(format)[0];
  const showTimeObj: SharedTimeProps<DateType> = { ...props };

  if (firstFormat) {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }
    if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
      showTimeObj.showHour = false;
    }

    if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  return {
    showTime: showTimeObj,
  };
}

type InjectDefaultProps<Props> = Omit<
  Props,
  | 'locale'
  | 'generateConfig'
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
  | 'hideHeader'
  | 'components'
> & {
  locale?: typeof enUS;
  size?: SizeType;
  bordered?: boolean;
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
  type DatePickerProps = PickerProps<DateType>;

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker?: PickerMode,
    displayName?: string,
  ) {
    class Picker extends React.Component<InnerPickerProps> {
      static contextType = ConfigContext;

      static displayName: string;

      context: ConfigConsumerProps;

      pickerRef = React.createRef<RCPicker<DateType>>();

      focus = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.focus();
        }
      };

      blur = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.blur();
        }
      };

      getDefaultLocale = () => {
        const { locale } = this.props;
        const result = {
          ...enUS,
          ...locale,
        };
        result.lang = {
          ...result.lang,
          ...((locale || {}) as any).lang,
        };
        return result;
      };

      renderPicker = (locale: any) => {
        const { getPrefixCls, direction } = this.context;
        const {
          prefixCls: customizePrefixCls,
          className,
          size: customizeSize,
          bordered = true,
          ...restProps
        } = this.props;
        const { format, showTime } = this.props as any;
        const prefixCls = getPrefixCls('picker', customizePrefixCls);

        const additionalProps = {
          showToday: true,
        };

        let additionalOverrideProps: any = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
        }
        const mergedPicker = picker || this.props.picker;

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format, ...this.props, picker: mergedPicker })
            : {}),
        };

        return (
          <SizeContext.Consumer>
            {size => {
              const mergedSize = customizeSize || size;

              return (
                <RCPicker<DateType>
                  ref={this.pickerRef}
                  placeholder={getPlaceholder(mergedPicker, locale)}
                  suffixIcon={
                    mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />
                  }
                  clearIcon={<CloseCircleFilled />}
                  allowClear
                  transitionName="slide-up"
                  {...additionalProps}
                  {...restProps}
                  {...additionalOverrideProps}
                  locale={locale!.lang}
                  className={classNames(className, {
                    [`${prefixCls}-${mergedSize}`]: mergedSize,
                    [`${prefixCls}-borderless`]: !bordered,
                  })}
                  prefixCls={prefixCls}
                  generateConfig={generateConfig}
                  prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                  nextIcon={<span className={`${prefixCls}-next-icon`} />}
                  superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                  superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                  components={Components}
                  direction={direction}
                />
              );
            }}
          </SizeContext.Consumer>
        );
      };

      render() {
        return (
          <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
            {this.renderPicker}
          </LocaleReceiver>
        );
      }
    }

    if (displayName) {
      Picker.displayName = displayName;
    }

    return Picker as React.ComponentClass<InnerPickerProps>;
  }

  const DatePicker = getPicker<DatePickerProps>();
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week', 'WeekPicker');
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month', 'MonthPicker');
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year', 'YearPicker');
  const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('time', 'TimePicker');

  // ======================== Range Picker ========================
  class RangePicker extends React.Component<RangePickerProps<DateType>> {
    static contextType = ConfigContext;

    context: ConfigConsumerProps;

    pickerRef = React.createRef<RCRangePicker<DateType>>();

    focus = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.focus();
      }
    };

    blur = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.blur();
      }
    };

    getDefaultLocale = () => {
      const { locale } = this.props;
      const result = {
        ...enUS,
        ...locale,
      };
      result.lang = {
        ...result.lang,
        ...((locale || {}) as any).lang,
      };
      return result;
    };

    renderPicker = (locale: any) => {
      const { getPrefixCls, direction } = this.context;
      const { prefixCls: customizePrefixCls, className, size, bordered = true, ...restProps } = this.props;
      const { format, showTime, picker } = this.props as any;
      const prefixCls = getPrefixCls('picker', customizePrefixCls);

      let additionalOverrideProps: any = {};

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, ...this.props, picker }) : {}),
      };

      return (
        <RCRangePicker<DateType>
          separator={<span className={`${prefixCls}-separator`}>→</span>}
          ref={this.pickerRef}
          placeholder={getRangePlaceholder(picker, locale)}
          suffixIcon={picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
          clearIcon={<CloseCircleFilled />}
          allowClear
          transitionName="slide-up"
          {...restProps}
          className={classNames(className, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-borderless`]: !bordered,
          })}
          {...additionalOverrideProps}
          locale={locale!.lang}
          prefixCls={prefixCls}
          generateConfig={generateConfig}
          prevIcon={<span className={`${prefixCls}-prev-icon`} />}
          nextIcon={<span className={`${prefixCls}-next-icon`} />}
          superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
          superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
          components={Components}
          direction={direction}
        />
      );
    };

    render() {
      return (
        <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  }

  // =========================== Export ===========================
  type MergedDatePicker = typeof DatePicker & {
    WeekPicker: typeof WeekPicker;
    MonthPicker: typeof MonthPicker;
    YearPicker: typeof YearPicker;
    RangePicker: React.ComponentClass<RangePickerProps<DateType>>;
    TimePicker: typeof TimePicker;
  };

  const MergedDatePicker = DatePicker as MergedDatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;

  return MergedDatePicker;
}

export default generatePicker;
