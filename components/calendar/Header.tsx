import type { GenerateConfig } from 'rc-picker/lib/generate';
import type { Locale } from 'rc-picker/lib/interface';
import * as React from 'react';
import { useContext, useMemo } from 'react';
import { FormItemInputContext } from '../form/context';
import { Button, Group } from '../radio';
import Select from '../select';
import type { CalendarMode, SelectInfo } from './generateCalendar';

const YearSelectOffset = 10;
const YearSelectTotal = 20;

interface SharedProps<DateType> {
  prefixCls: string;
  value: DateType;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  fullscreen: boolean;
  divRef: React.RefObject<HTMLDivElement>;
  onChange: (year: DateType) => void;
}

function YearSelect<DateType>(props: SharedProps<DateType>) {
  const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange, divRef } =
    props;

  const year = generateConfig.getYear(value || generateConfig.getNow());

  let start = year - YearSelectOffset;
  let end = start + YearSelectTotal;

  if (validRange) {
    start = generateConfig.getYear(validRange[0]);
    end = generateConfig.getYear(validRange[1]) + 1;
  }

  const suffix = locale && locale.year === '年' ? '年' : '';
  const options: { label: string; value: number }[] = [];
  for (let index = start; index < end; index++) {
    options.push({ label: `${index}${suffix}`, value: index });
  }

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      options={options}
      value={year}
      className={`${prefixCls}-year-select`}
      onChange={(numYear) => {
        let newDate = generateConfig.setYear(value, numYear);

        if (validRange) {
          const [startDate, endDate] = validRange;
          const newYear = generateConfig.getYear(newDate);
          const newMonth = generateConfig.getMonth(newDate);
          if (
            newYear === generateConfig.getYear(endDate) &&
            newMonth > generateConfig.getMonth(endDate)
          ) {
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(endDate));
          }
          if (
            newYear === generateConfig.getYear(startDate) &&
            newMonth < generateConfig.getMonth(startDate)
          ) {
            newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(startDate));
          }
        }

        onChange(newDate);
      }}
      getPopupContainer={() => divRef!.current!}
    />
  );
}

function MonthSelect<DateType>(props: SharedProps<DateType>) {
  const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange, divRef } =
    props;
  const month = generateConfig.getMonth(value || generateConfig.getNow());

  let start = 0;
  let end = 11;

  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig.getYear(value);
    if (generateConfig.getYear(rangeEnd) === currentYear) {
      end = generateConfig.getMonth(rangeEnd);
    }
    if (generateConfig.getYear(rangeStart) === currentYear) {
      start = generateConfig.getMonth(rangeStart);
    }
  }

  const months = locale.shortMonths || generateConfig.locale.getShortMonths!(locale.locale);
  const options: { label: string; value: number }[] = [];
  for (let index = start; index <= end; index += 1) {
    options.push({
      label: months[index],
      value: index,
    });
  }

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      className={`${prefixCls}-month-select`}
      value={month}
      options={options}
      onChange={(newMonth) => {
        onChange(generateConfig.setMonth(value, newMonth));
      }}
      getPopupContainer={() => divRef!.current!}
    />
  );
}

interface ModeSwitchProps<DateType> extends Omit<SharedProps<DateType>, 'onChange'> {
  mode: CalendarMode;
  onModeChange: (type: CalendarMode) => void;
}

function ModeSwitch<DateType>(props: ModeSwitchProps<DateType>) {
  const { prefixCls, locale, mode, fullscreen, onModeChange } = props;
  return (
    <Group
      onChange={({ target: { value } }) => {
        onModeChange(value);
      }}
      value={mode}
      size={fullscreen ? undefined : 'small'}
      className={`${prefixCls}-mode-switch`}
    >
      <Button value="month">{locale.month}</Button>
      <Button value="year">{locale.year}</Button>
    </Group>
  );
}

export interface CalendarHeaderProps<DateType> {
  prefixCls: string;
  value: DateType;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  mode: CalendarMode;
  fullscreen: boolean;
  onChange: (date: DateType, source: SelectInfo['source']) => void;
  onModeChange: (mode: CalendarMode) => void;
}
function CalendarHeader<DateType>(props: CalendarHeaderProps<DateType>) {
  const { prefixCls, fullscreen, mode, onChange, onModeChange } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  const formItemInputContext = useContext(FormItemInputContext);
  const mergedFormItemInputContext = useMemo(
    () => ({
      ...formItemInputContext,
      isFormItemInput: false,
    }),
    [formItemInputContext],
  );

  const sharedProps = {
    ...props,
    fullscreen,
    divRef,
  };

  return (
    <div className={`${prefixCls}-header`} ref={divRef}>
      <FormItemInputContext.Provider value={mergedFormItemInputContext}>
        <YearSelect
          {...sharedProps}
          onChange={(v) => {
            onChange(v, 'year');
          }}
        />
        {mode === 'month' && (
          <MonthSelect
            {...sharedProps}
            onChange={(v) => {
              onChange(v, 'month');
            }}
          />
        )}
      </FormItemInputContext.Provider>
      <ModeSwitch {...sharedProps} onModeChange={onModeChange} />
    </div>
  );
}

export default CalendarHeader;
