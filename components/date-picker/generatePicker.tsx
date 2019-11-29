import * as React from 'react';
import RCPicker from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import {
  PickerBaseProps as RCPickerBaseProps,
  PickerDateProps as RCPickerDateProps,
  PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker';
import { PickerMode } from 'rc-picker/lib/interface';
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import defaultLocale from './locale/en_US';

type InjectDefaultProps<Props> = Omit<
  Props,
  | 'locale'
  | 'generateConfig'
  | 'prevIcon'
  | 'nextIcon'
  | 'superPrevIcon'
  | 'superNextIcon'
  | 'picker'
> & {
  locale?: typeof defaultLocale;
};

export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>;
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>;
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>;

export type PickerProps<DateType> =
  | PickerBaseProps<DateType>
  | PickerDateProps<DateType>
  | PickerTimeProps<DateType>;

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType>;

  function getPicker<InnerPickerProps extends DatePickerProps>(
    picker: PickerMode,
    displayName: string,
  ) {
    class Picker extends React.Component<InnerPickerProps> {
      static contextType = ConfigContext;

      static displayName = displayName;

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

      render() {
        const { getPrefixCls } = this.context;
        const { prefixCls: customizePrefixCls, locale, ...restProps } = this.props;
        const prefixCls = getPrefixCls('picker', customizePrefixCls);

        const mergedLocale = locale || defaultLocale;

        const additionalProps = {
          showToday: true,
        };

        return (
          <RCPicker<DateType>
            ref={this.pickerRef}
            locale={mergedLocale!.lang}
            placeholder={mergedLocale!.lang.placeholder}
            suffixIcon={<CalendarOutlined />}
            {...additionalProps}
            {...restProps}
            picker={picker as any}
            prefixCls={prefixCls}
            generateConfig={generateConfig}
            prevIcon={<LeftOutlined />}
            nextIcon={<RightOutlined />}
            superPrevIcon={<DoubleLeftOutlined />}
            superNextIcon={<DoubleRightOutlined />}
          />
        );
      }
    }

    return Picker;
  }

  const DatePicker = getPicker<PickerDateProps<DateType>>('date', 'DatePicker');
  const WeekPicker = getPicker<PickerDateProps<DateType>>('week', 'WeekPicker');
  const MonthPicker = getPicker<PickerDateProps<DateType>>('month', 'MonthPicker');
  const YearPicker = getPicker<PickerDateProps<DateType>>('year', 'YearPicker');

  type MergedDatePicker = typeof DatePicker & {
    WeekPicker: typeof WeekPicker;
    MonthPicker: typeof MonthPicker;
    YearPicker: typeof YearPicker;
  };

  const MergedDatePicker = DatePicker as MergedDatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;

  return MergedDatePicker;
}

export default generatePicker;
