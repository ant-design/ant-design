import * as React from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import classNames from 'classnames';
import padStart from 'lodash/padStart';
import { PickerPanel as RCPickerPanel } from 'rc-picker';
import { Locale } from 'rc-picker/lib/interface';
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

export type CalendarMode = 'year' | 'month';
export type HeaderRender<DateType> = (config: {
  value: DateType;
  type: CalendarMode;
  onChange: (date: DateType) => void;
  onTypeChange: (type: CalendarMode) => void;
}) => React.ReactNode;

export interface CalendarProps<DateType> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  locale?: typeof enUS;
  validRange?: [DateType, DateType];
  disabledDate?: (date: DateType) => boolean;
  dateFullCellRender?: (date: DateType) => React.ReactNode;
  dateCellRender?: (date: DateType) => React.ReactNode;
  monthFullCellRender?: (date: DateType) => React.ReactNode;
  monthCellRender?: (date: DateType) => React.ReactNode;
  headerRender?: HeaderRender<DateType>;
  value?: DateType;
  defaultValue?: DateType;
  mode?: CalendarMode;
  fullscreen?: boolean;
  onChange?: (date: DateType) => void;
  onPanelChange?: (date: DateType, mode: CalendarMode) => void;
  onSelect?: (date: DateType) => void;
}

function generateCalendar<DateType>(generateConfig: GenerateConfig<DateType>) {
  function isSameYear(date1: DateType, date2: DateType) {
    return date1 && date2 && generateConfig.getYear(date1) === generateConfig.getYear(date2);
  }

  function isSameMonth(date1: DateType, date2: DateType) {
    return (
      isSameYear(date1, date2) && generateConfig.getMonth(date1) === generateConfig.getMonth(date2)
    );
  }

  function isSameDate(date1: DateType, date2: DateType) {
    return (
      isSameMonth(date1, date2) && generateConfig.getDate(date1) === generateConfig.getDate(date2)
    );
  }

  const Calendar = (props: CalendarProps<DateType>) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      headerRender,
      value,
      defaultValue,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      onChange,
      onPanelChange,
      onSelect,
    } = props;
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const today = generateConfig.getNow();

    // ====================== State =======================

    // Value
    const [mergedValue, setMergedValue] = useMergedState(() => value || generateConfig.getNow(), {
      defaultValue,
      value,
    });

    // Mode
    const [mergedMode, setMergedMode] = useMergedState('month', {
      value: mode,
    });
    const panelMode = React.useMemo<'month' | 'date'>(
      () => (mergedMode === 'year' ? 'month' : 'date'),
      [mergedMode],
    );

    // Disabled Date
    const mergedDisabledDate = React.useCallback(
      (date: DateType) => {
        const notInRange = validRange
          ? generateConfig.isAfter(validRange[0], date) ||
            generateConfig.isAfter(date, validRange[1])
          : false;
        return notInRange || !!disabledDate?.(date);
      },
      [disabledDate, validRange],
    );

    // ====================== Events ======================
    const triggerPanelChange = (date: DateType, newMode: CalendarMode) => {
      onPanelChange?.(date, newMode);
    };

    const triggerChange = (date: DateType) => {
      setMergedValue(date);

      if (!isSameDate(date, mergedValue)) {
        // Trigger when month panel switch month
        if (
          (panelMode === 'date' && !isSameMonth(date, mergedValue)) ||
          (panelMode === 'month' && !isSameYear(date, mergedValue))
        ) {
          triggerPanelChange(date, mergedMode);
        }

        onChange?.(date);
      }
    };

    const triggerModeChange = (newMode: CalendarMode) => {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };

    const onInternalSelect = (date: DateType) => {
      triggerChange(date);

      onSelect?.(date);
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
          return dateFullCellRender(date);
        }

        return (
          <div
            className={classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
              [`${calendarPrefixCls}-date-today`]: isSameDate(today, date),
            })}
          >
            <div className={`${calendarPrefixCls}-date-value`}>
              {padStart(String(generateConfig.getDate(date)), 2, '0')}
            </div>
            <div className={`${calendarPrefixCls}-date-content`}>
              {dateCellRender && dateCellRender(date)}
            </div>
          </div>
        );
      },
      [dateFullCellRender, dateCellRender],
    );

    const monthRender = React.useCallback(
      (date: DateType, locale: Locale): React.ReactNode => {
        if (monthFullCellRender) {
          return monthFullCellRender(date);
        }

        const months = locale.shortMonths || generateConfig.locale.getShortMonths!(locale.locale);

        return (
          <div
            className={classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
              [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date),
            })}
          >
            <div className={`${calendarPrefixCls}-date-value`}>
              {months[generateConfig.getMonth(date)]}
            </div>
            <div className={`${calendarPrefixCls}-date-content`}>
              {monthCellRender && monthCellRender(date)}
            </div>
          </div>
        );
      },
      [monthFullCellRender, monthCellRender],
    );

    return (
      <LocaleReceiver componentName="Calendar" defaultLocale={getDefaultLocale}>
        {(mergedLocale: any) => (
          <div
            className={classNames(
              calendarPrefixCls,
              {
                [`${calendarPrefixCls}-full`]: fullscreen,
                [`${calendarPrefixCls}-mini`]: !fullscreen,
                [`${calendarPrefixCls}-rtl`]: direction === 'rtl',
              },
              className,
            )}
            style={style}
          >
            {headerRender ? (
              headerRender({
                value: mergedValue,
                type: mergedMode,
                onChange: onInternalSelect,
                onTypeChange: triggerModeChange,
              })
            ) : (
              <CalendarHeader
                prefixCls={calendarPrefixCls}
                value={mergedValue}
                generateConfig={generateConfig}
                mode={mergedMode}
                fullscreen={fullscreen}
                locale={mergedLocale.lang}
                validRange={validRange}
                onChange={onInternalSelect}
                onModeChange={triggerModeChange}
              />
            )}

            <RCPickerPanel
              value={mergedValue}
              prefixCls={prefixCls}
              locale={mergedLocale.lang}
              generateConfig={generateConfig}
              dateRender={dateRender}
              monthCellRender={date => monthRender(date, mergedLocale.lang)}
              onSelect={onInternalSelect}
              mode={panelMode}
              picker={panelMode as any}
              disabledDate={mergedDisabledDate}
              hideHeader
            />
          </div>
        )}
      </LocaleReceiver>
    );
  };

  return Calendar;
}

export default generateCalendar;
