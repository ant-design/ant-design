import * as React from 'react';
import classNames from 'classnames';
import { PickerPanel as RCPickerPanel } from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate';
import {
  PickerPanelBaseProps as RCPickerPanelBaseProps,
  PickerPanelDateProps as RCPickerPanelDateProps,
  PickerPanelTimeProps as RCPickerPanelTimeProps,
} from 'rc-picker/lib/PickerPanel';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from './locale/en_US';
import { ConfigContext } from '../config-provider';
import CalendarHeader from './Header';

type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon'
> & {
  locale?: typeof enUS;
  size?: 'large' | 'default' | 'small';
};

// Picker Props
export type PickerPanelBaseProps<DateType> = InjectDefaultProps<RCPickerPanelBaseProps<DateType>>;
export type PickerPanelDateProps<DateType> = InjectDefaultProps<RCPickerPanelDateProps<DateType>>;
export type PickerPanelTimeProps<DateType> = InjectDefaultProps<RCPickerPanelTimeProps<DateType>>;

export type PickerProps<DateType> =
  | PickerPanelBaseProps<DateType>
  | PickerPanelDateProps<DateType>
  | PickerPanelTimeProps<DateType>;

export interface CalendarProps<DateType> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  locale?: typeof enUS;
  dateFullCellRender?: (date: DateType) => React.ReactNode;
  dateCellRender?: (date: DateType) => React.ReactNode;
  value?: DateType;
  defaultValue?: DateType;
  onChange?: (date: DateType) => void;
}

function generateCalendar<DateType>(generateConfig: GenerateConfig<DateType>) {
  const Calendar = (props: CalendarProps<DateType>) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      dateFullCellRender,
      dateCellRender,
      value,
      defaultValue,
      onChange,
    } = props;
    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;

    // ====================== State =======================
    const [innerValue, setInnerValue] = React.useState(
      () => value || defaultValue || generateConfig.getNow(),
    );

    const mergedValue = value || innerValue;

    const triggerChange = (date: DateType) => {
      setInnerValue(date);
      if (onChange) {
        onChange(date);
      }
    };

    // ====================== Locale ======================
    const getDefaultLocale = () => {
      const { locale } = props;
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

    // ====================== Render ======================
    const dateRender = React.useCallback(
      (date: DateType): React.ReactNode => {
        if (dateFullCellRender) {
          return dateFullCellRender;
        }

        return (
          <div className={`${calendarPrefixCls}-date`}>
            <div className={`${calendarPrefixCls}-date-value`}>{generateConfig.getDate(date)}</div>
            <div className={`${calendarPrefixCls}-date-content`}>
              {dateCellRender && dateCellRender(date)}
            </div>
          </div>
        );
      },
      [dateFullCellRender, dateCellRender],
    );

    return (
      <LocaleReceiver componentName="Calendar" defaultLocale={getDefaultLocale}>
        {(mergedLocale: any) => {
          return (
            <div
              className={classNames(calendarPrefixCls, className, {
                [`${calendarPrefixCls}-full`]: true,
              })}
            >
              <CalendarHeader
                prefixCls={calendarPrefixCls}
                value={mergedValue}
                generateConfig={generateConfig}
                locale={mergedLocale.lang}
                onChange={triggerChange}
              />
              <RCPickerPanel
                value={mergedValue}
                prefixCls={prefixCls}
                locale={mergedLocale.lang}
                generateConfig={generateConfig}
                dateRender={dateRender}
                hideHeader
              />
            </div>
          );
        }}
      </LocaleReceiver>
    );
  };

  return Calendar;
}

export default generateCalendar;
