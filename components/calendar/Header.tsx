import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale } from 'rc-picker/lib/interface';
import Select from '../select';
import { Group, Button } from '../radio';
import { CalendarMode } from './generateCalendar';

const YearSelectOffset = 10;
const YearSelectTotal = 20;

interface SharedProps<DateType> {
  prefixCls: string;
  value: DateType;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  fullscreen: boolean;
  onChange: (year: DateType) => void;
}

function YearSelect<DateType>(props: SharedProps<DateType>) {
  const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange } = props;

  const year = generateConfig.getYear(value);

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
      size={fullscreen ? 'default' : 'small'}
      options={options}
      value={year}
      className={`${prefixCls}-year-select`}
      onChange={newYear => {
        onChange(generateConfig.setYear(value, newYear));
      }}
    />
  );
}

function MonthSelect<DateType>(props: SharedProps<DateType>) {
  const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange } = props;
  const month = generateConfig.getMonth(value);

  let start = 0;
  let end = 12;

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
  for (let index = start; index < end; index++) {
    options.push({
      label: months[index],
      value: index,
    });
  }

  return (
    <Select
      size={fullscreen ? 'default' : 'small'}
      dropdownMatchSelectWidth={100}
      className={`${prefixCls}-month-select`}
      value={month}
      options={options}
      onChange={newMonth => {
        onChange(generateConfig.setMonth(value, newMonth));
      }}
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
      size={fullscreen ? 'default' : 'small'}
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
  onChange: (date: DateType) => void;
  onModeChange: (mode: CalendarMode) => void;
}
function CalendarHeader<DateType>(props: CalendarHeaderProps<DateType>) {
  const { prefixCls, fullscreen, mode, onChange, onModeChange } = props;

  return (
    <div className={`${prefixCls}-header`}>
      <YearSelect {...props} onChange={onChange} fullscreen={fullscreen} />
      {mode === 'month' && <MonthSelect {...props} onChange={onChange} fullscreen={fullscreen} />}
      <ModeSwitch {...props} onModeChange={onModeChange} fullscreen={fullscreen} />
    </div>
  );
}

export default CalendarHeader;
