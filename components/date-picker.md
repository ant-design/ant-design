---
category: Components
group: Data Entry
title: DatePicker
description: To select or input a date.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*qK9mRqFnBbAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wz1QTJSQgmAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## Examples

### Basic

Basic use case. Users can select or input a date in a panel.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space vertical>
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>
);

export default App;
```

### Range Picker

Set range picker type by `picker` prop.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space vertical size={12}>
    <RangePicker />
    <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker
      picker="year"
      id={{
        start: 'startInput',
        end: 'endInput',
      }}
      onFocus={(_, info) => {
        console.log('Focus:', info.range);
      }}
      onBlur={(_, info) => {
        console.log('Blur:', info.range);
      }}
    />
  </Space>
);

export default App;
```

### Multiple

Multiple selections. Does not support `showTime` and `picker="time"`.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps<Dayjs, true>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const defaultValue = [dayjs('2000-01-01'), dayjs('2000-01-03'), dayjs('2000-01-05')];

const App: React.FC = () => (
  <Flex vertical gap="small">
    <DatePicker
      multiple
      onChange={onChange}
      maxTagCount="responsive"
      defaultValue={defaultValue}
      size="small"
    />
    <DatePicker multiple onChange={onChange} maxTagCount="responsive" defaultValue={defaultValue} />
    <DatePicker
      multiple
      onChange={onChange}
      maxTagCount="responsive"
      defaultValue={defaultValue}
      size="large"
    />
  </Flex>
);

export default App;
```


### Need Confirm

DatePicker will automatically determine whether to show a confirm button according to the `picker` property. You can also set the `needConfirm` property to determine whether to show a confirm button. When `needConfirm` is set, the user must click the confirm button to complete the selection. Otherwise, the selection will be submitted when the picker loses focus or selects a date.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps<Dayjs, false>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => <DatePicker onChange={onChange} needConfirm />;

export default App;
```

### Switchable picker

Switch in different types of pickers by Select.

```tsx
import React, { useState } from 'react';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, Space, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

type PickerType = 'time' | 'date';

interface PickerWithTypeProps {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps<Dayjs, false>['onChange'];
}

const PickerWithType: React.FC<PickerWithTypeProps> = ({ type, onChange }) => {
  if (type === 'time') {
    return <TimePicker onChange={onChange} />;
  }
  if (type === 'date') {
    return <DatePicker onChange={onChange} />;
  }
  return <DatePicker picker={type} onChange={onChange} />;
};

const App: React.FC = () => {
  const [type, setType] = useState<PickerType>('time');

  return (
    <Space>
      <Select
        aria-label="Picker Type"
        value={type}
        onChange={setType}
        options={[
          { label: 'Time', value: 'time' },
          { label: 'Date', value: 'date' },
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
          { label: 'Quarter', value: 'quarter' },
          { label: 'Year', value: 'year' },
        ]}
      />
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
  );
};

export default App;
```

### Date Format

We can set the date format by `format`. When `format` is an array, the input box can be entered in any of the valid formats of the array.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const customFormat: DatePickerProps['format'] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
    <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    <DatePicker defaultValue={dayjs('2015/01', monthFormat)} format={monthFormat} picker="month" />
    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
    <RangePicker
      defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={customFormat} />
  </Space>
);

export default App;
```

### Choose Time

This property provides an additional time selection. When `showTime` is an Object, its properties will be passed on to the built-in `TimePicker`.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker
      showTime
      onChange={(value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }}
      onOk={onOk}
    />
    <RangePicker
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      onChange={(value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }}
      onOk={onOk}
    />
  </Space>
);

export default App;
```

### Mask Format

Align the date format. Switch the selection by arrow keys. Will try to align the date to the last valid date when blur.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space vertical>
    <DatePicker
      format={{
        format: 'YYYY-MM-DD',
        type: 'mask',
      }}
      onChange={onChange}
    />
    <DatePicker
      format={{
        format: 'YYYY-MM-DD HH:mm:ss',
        type: 'mask',
      }}
      onChange={onChange}
    />
  </Space>
);

export default App;
```

### Limit Date Range

Limit the range of available dates by using `minDate` and `maxDate`.

```tsx
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

const App: React.FC = () => (
  <DatePicker
    defaultValue={dayjs('2019-09-03', dateFormat)}
    minDate={dayjs('2019-08-01', dateFormat)}
    maxDate={dayjs('2020-10-31', dateFormat)}
  />
);

export default App;
```

### Disabled

A disabled state of the `DatePicker`. You can also set as array to disable one of input.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker defaultValue={dayjs('2015-06-06', dateFormat)} disabled />
    <DatePicker picker="month" defaultValue={dayjs('2015-06', 'YYYY-MM')} disabled />
    <RangePicker
      defaultValue={[dayjs('2015-06-06', dateFormat), dayjs('2015-06-06', dateFormat)]}
      disabled
    />
    <RangePicker
      defaultValue={[dayjs('2019-09-03', dateFormat), dayjs('2019-11-22', dateFormat)]}
      disabled={[false, true]}
    />
    <DatePicker
      defaultValue={dayjs('2019-09-03', dateFormat)}
      minDate={dayjs('2019-06-01', dateFormat)}
      maxDate={dayjs('2020-06-30', dateFormat)}
    />
  </Space>
);

export default App;
```

### Disabled Date & Time

Disable specific dates and times by using `disabledDate` and `disabledTime` respectively, and `disabledTime` only works with `showTime`.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const disabledDateForMonth: RangePickerProps['disabledDate'] = (current) => {
  // Can not select months before this month
  return current && current < dayjs().startOf('month');
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      showTime={{ defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss') }}
    />
    <DatePicker picker="month" disabledDate={disabledDateForMonth} />
    <RangePicker disabledDate={disabledDate} />
    <RangePicker
      disabledDate={disabledDate}
      disabledTime={disabledRangeTime}
      showTime={{
        hideDisabledOptions: true,
        defaultOpenValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
      }}
      format="YYYY-MM-DD HH:mm:ss"
    />
  </Space>
);

export default App;
```

### Allow Empty

Allow empty for the RangePicker. It's useful when you need to keep the "to date".

```tsx
import React from 'react';
import { DatePicker } from 'antd';

const App: React.FC = () => (
  <DatePicker.RangePicker
    placeholder={['Start Date', 'Till Now']}
    allowEmpty={[false, true]}
    onChange={(date, dateString) => {
      console.log(date, dateString);
    }}
  />
);

export default App;
```

### Select range dates

Using `info.from` of `disabledDate` to limit the dynamic date range selection.

```tsx
import React from 'react';
import { DatePicker, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

// Disabled 7 days from the selected date
const disabled7DaysDate: DatePickerProps['disabledDate'] = (current, { from, type }) => {
  if (from) {
    const minDate = from.add(-6, 'days');
    const maxDate = from.add(6, 'days');

    switch (type) {
      case 'year':
        return current.year() < minDate.year() || current.year() > maxDate.year();

      case 'month':
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        );

      default:
        return Math.abs(current.diff(from, 'days')) >= 7;
    }
  }

  return false;
};

// Disabled 6 months from the selected date
const disabled6MonthsDate: DatePickerProps['disabledDate'] = (current, { from, type }) => {
  if (from) {
    const minDate = from.add(-5, 'months');
    const maxDate = from.add(5, 'months');

    switch (type) {
      case 'year':
        return current.year() < minDate.year() || current.year() > maxDate.year();

      default:
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        );
    }
  }

  return false;
};

const App: React.FC = () => (
  <Space vertical>
    <Typography.Title level={5}>7 days range</Typography.Title>
    <RangePicker disabledDate={disabled7DaysDate} />

    <Typography.Title level={5}>6 months range</Typography.Title>
    <RangePicker disabledDate={disabled6MonthsDate} picker="month" />
  </Space>
);

export default App;
```

### Preset Ranges

We can set preset ranges to RangePicker to improve user experience. Since `5.8.0`, preset value supports callback function.

```tsx
import React from 'react';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const onChange = (date: Dayjs | null) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};

const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker
      presets={[
        { label: 'Yesterday', value: dayjs().add(-1, 'd') },
        { label: 'Last Week', value: dayjs().add(-7, 'd') },
        { label: 'Last Month', value: dayjs().add(-1, 'month') },
      ]}
      onChange={onChange}
    />
    <RangePicker presets={rangePresets} onChange={onRangeChange} />
    <RangePicker
      presets={[
        {
          label: <span aria-label="Current Time to End of Day">Now ~ EOD</span>,
          value: () => [dayjs(), dayjs().endOf('day')], // 5.8.0+ support function
        },
        ...rangePresets,
      ]}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onRangeChange}
    />
  </Space>
);

export default App;
```

### Extra Footer

Render extra footer in panel for customized requirements.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker renderExtraFooter={() => 'extra footer'} />
    <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
    <RangePicker renderExtraFooter={() => 'extra footer'} />
    <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
    <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" />
  </Space>
);

export default App;
```

### Three Sizes

The input box comes in three sizes: small, middle and large. The `middle` size will be used if `size` is omitted.

```tsx
import React, { useState } from 'react';
import type { ConfigProviderProps, RadioChangeEvent } from 'antd';
import { DatePicker, Radio, Space } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const { RangePicker } = DatePicker;

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>('middle');

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <Space vertical size={12}>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <DatePicker size={size} />
      <DatePicker size={size} picker="month" />
      <RangePicker size={size} />
      <DatePicker size={size} picker="week" />
    </Space>
  );
};

export default App;
```

### Customized Cell Rendering

We can customize the rendering of the cells in the calendar by providing a `cellRender` function to `DatePicker`.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, theme } from 'antd';
import type { Dayjs } from 'dayjs';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: '50%',
  };
  const cellRender: DatePickerProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type !== 'date') {
      return info.originNode;
    }
    if (typeof current === 'number' || typeof current === 'string') {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
        {current.date()}
      </div>
    );
  };
  return (
    <Space size={12} vertical>
      <DatePicker cellRender={cellRender} />
      <DatePicker.RangePicker cellRender={cellRender} />
    </Space>
  );
};

export default App;
```

### Customize Panel

Replace panel with `components`.

```tsx
import React from 'react';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Flex, Slider, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

type DateComponent = Required<NonNullable<DatePickerProps<Dayjs>['components']>>['date'];
type GetProps<T> = T extends React.ComponentType<infer P> ? P : never;

const MyDatePanel = (props: GetProps<DateComponent>) => {
  const { value, onSelect, onHover } = props;

  // Value
  const startDate = React.useMemo(() => dayjs().date(1).month(0), []);
  const [innerValue, setInnerValue] = React.useState(value || startDate);

  React.useEffect(() => {
    if (value) {
      setInnerValue(value);
    }
  }, [value]);

  // Range
  const dateCount = React.useMemo(() => {
    const endDate = startDate.add(1, 'year').add(-1, 'day');
    return endDate.diff(startDate, 'day');
  }, [startDate]);

  const sliderValue = Math.min(Math.max(0, innerValue.diff(startDate, 'day')), dateCount);

  // Render
  return (
    <Flex vertical gap="small" style={{ padding: 16 }}>
      <Typography.Title level={4} style={{ margin: 0 }} title="no, it's not">
        The BEST Picker Panel
      </Typography.Title>
      <Slider
        min={0}
        max={dateCount}
        value={sliderValue}
        onChange={(nextValue) => {
          const nextDate = startDate.add(nextValue, 'day');
          setInnerValue(nextDate);
          onHover?.(nextDate);
        }}
        tooltip={{
          formatter: (nextValue) => startDate.add(nextValue || 0, 'day').format('YYYY-MM-DD'),
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          onSelect(innerValue);
        }}
      >{`That's It!`}</Button>
    </Flex>
  );
};

const App: React.FC = () => (
  <Space vertical>
    <DatePicker
      showNow={false}
      onChange={onChange}
      components={{
        date: MyDatePanel,
      }}
    />
  </Space>
);

export default App;
```

### External use panel

Custom menu, external selection panel.

```tsx
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const DatePickerDemo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [panelVisible, setPanelVisible] = React.useState(false);

  const [date, setDate] = React.useState<Dayjs | null>(() => dayjs());

  return (
    <Dropdown
      arrow
      open={visible}
      trigger={['click']}
      destroyOnHidden
      onOpenChange={(open) => {
        setVisible(open);
        if (!open) {
          setPanelVisible(false);
        }
      }}
      menu={{
        items: [
          {
            key: 'today',
            label: 'Today',
            onClick() {
              setDate(dayjs());
              setVisible(false);
            },
          },
          {
            key: 'tomorrow',
            label: 'Tomorrow',
            onClick() {
              setDate(dayjs().add(1, 'day'));
              setVisible(false);
            },
          },
          {
            key: 'custom-date',
            label: (
              <div
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPanelVisible(true);
                }}
              >
                <div>Customize</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DatePicker
                    open={panelVisible}
                    styles={{
                      root: {
                        pointerEvents: 'none',
                        opacity: 0,
                        position: 'absolute',
                        bottom: -12,
                        insetInlineStart: 0,
                      },
                    }}
                    onChange={(date) => {
                      setDate(date);
                      setVisible(false);
                      setPanelVisible(false);
                    }}
                  />
                </div>
              </div>
            ),
          },
        ],
      }}
    >
      <Space>
        <span>{date?.format('YYYY-MM-DD')}</span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

const RangePickerDemo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [panelVisible, setPanelVisible] = React.useState(false);

  const [dates, setDates] = React.useState<[Dayjs, Dayjs] | null>(() => [
    dayjs(),
    dayjs().add(1, 'day'),
  ]);

  return (
    <Dropdown
      arrow
      open={visible}
      trigger={['click']}
      destroyOnHidden
      onOpenChange={(open) => {
        setVisible(open);
        if (!open) {
          setPanelVisible(false);
        }
      }}
      menu={{
        items: [
          {
            key: '7',
            label: '7 days',
            onClick() {
              setDates([dayjs(), dayjs().add(7, 'day')]);
              setVisible(false);
            },
          },
          {
            key: '30',
            label: '30 days',
            onClick() {
              setDates([dayjs(), dayjs().add(30, 'day')]);
              setVisible(false);
            },
          },
          {
            key: 'custom-date',
            label: (
              <div
                style={{ position: 'relative', overflow: 'hidden' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPanelVisible(true);
                }}
              >
                <div>Customize</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DatePicker.RangePicker
                    open={panelVisible}
                    styles={{
                      root: {
                        pointerEvents: 'none',
                        opacity: 0,
                        position: 'absolute',
                        bottom: 0, // RangePicker use this style
                        insetInlineStart: 0,
                      },
                    }}
                    onChange={(ranges) => {
                      if (ranges?.[0] && ranges?.[1]) {
                        setDates([ranges[0], ranges[1]]);
                      } else {
                        setDates(null);
                      }
                      setVisible(false);
                      setPanelVisible(false);
                    }}
                  />
                </div>
              </div>
            ),
          },
        ],
      }}
    >
      <Space>
        <span>
          {dates
            ? `${dates[0].format('YYYY-MM-DD')} ~ ${dates[1].format('YYYY-MM-DD')}`
            : 'Select range'}
        </span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

const Demo = () => {
  return (
    <div style={{ display: 'flex', gap: '20%' }}>
      <div>
        <div style={{ marginBottom: 12 }}>DatePicker</div>
        <DatePickerDemo />
      </div>

      <div>
        <div style={{ marginBottom: 12 }}>RangePicker</div>
        <RangePickerDemo />
      </div>
    </div>
  );
};

export default Demo;
```

### Buddhist Era

Use `locale` to support special calendar format.

```tsx
import React from 'react';
import { ConfigProvider, DatePicker, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

const { Title } = Typography;

// Component level locale
const buddhistLocale: typeof en = {
  ...en,
  lang: {
    ...en.lang,
    fieldDateFormat: 'BBBB-MM-DD',
    fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
    yearFormat: 'BBBB',
    cellYearFormat: 'BBBB',
  },
};

// ConfigProvider level locale
const globalBuddhistLocale: typeof enUS = {
  ...enUS,
  DatePicker: {
    ...enUS.DatePicker!,
    lang: buddhistLocale.lang,
  },
};

const defaultValue = dayjs('2024-01-01');

const App: React.FC = () => {
  const onChange: DatePickerProps['onChange'] = (_, dateStr) => {
    console.log('onChange:', dateStr);
  };

  return (
    <Space vertical>
      <Title level={4}>By locale props</Title>
      <DatePicker defaultValue={defaultValue} locale={buddhistLocale} onChange={onChange} />
      <DatePicker
        defaultValue={defaultValue}
        showTime
        locale={buddhistLocale}
        onChange={onChange}
      />

      <Title level={4}>By ConfigProvider</Title>
      <ConfigProvider locale={globalBuddhistLocale}>
        <Space vertical>
          <DatePicker defaultValue={defaultValue} onChange={onChange} />
          <DatePicker defaultValue={defaultValue} showTime onChange={onChange} />
        </Space>
      </ConfigProvider>
    </Space>
  );
};

export default App;
```

### Status

Add status to DatePicker with `status`, which could be `error` or `warning`.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }}>
    <DatePicker status="error" style={{ width: '100%' }} />
    <DatePicker status="warning" style={{ width: '100%' }} />
    <DatePicker.RangePicker status="error" style={{ width: '100%' }} />
    <DatePicker.RangePicker status="warning" style={{ width: '100%' }} />
  </Space>
);

export default App;
```

### Variants

Variants of DatePicker, there are four variants: `outlined` `filled` `borderless` and `underlined`.

```tsx
import React from 'react';
import { DatePicker, Flex } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={8}>
      <DatePicker placeholder="Outlined" />
      <RangePicker placeholder={['Outlined Start', 'Outlined End']} />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Filled" variant="filled" />
      <RangePicker placeholder={['Filled Start', 'Filled End']} variant="filled" />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Borderless" variant="borderless" />
      <RangePicker placeholder={['Borderless Start', 'Borderless End']} variant="borderless" />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Underlined" variant="underlined" />
      <RangePicker placeholder={['Underlined Start', 'Underlined End']} variant="underlined" />
    </Flex>
  </Flex>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of DatePicker by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { DatePicker, Flex } from 'antd';
import type { DatePickerProps } from 'antd';
import { createStyles } from 'antd-style';
import type { Dayjs } from 'dayjs';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    width: 200,
  },
}));

const stylesObject: DatePickerProps<Dayjs>['styles'] = {
  input: { fontStyle: 'italic' },
  suffix: { opacity: 0.85 },
};

const stylesFn: DatePickerProps<Dayjs>['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { borderColor: '#722ed1' },
      popup: {
        container: { border: '1px solid #722ed1', borderRadius: 8 },
      },
    } satisfies DatePickerProps<Dayjs>['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <DatePicker classNames={classNames} styles={stylesObject} placeholder="Object" />
      <DatePicker classNames={classNames} styles={stylesFn} placeholder="Function" size="large" />
    </Flex>
  );
};

export default App;
```


### Placement

You can manually specify the position of the popup via `placement`.

```tsx
import React, { useState } from 'react';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { DatePicker, Radio } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => {
  const [placement, setPlacement] = useState<DatePickerProps['placement']>('topLeft');

  const placementChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <DatePicker placement={placement} />
      <br />
      <br />
      <RangePicker placement={placement} />
    </>
  );
};

export default App;
```



### Prefix and Suffix

Custom `prefix` and `suffixIcon`.

```tsx
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';

const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

const onChange = (date: Dayjs | (Dayjs | null)[] | null, dateString: string | string[] | null) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space vertical size={12}>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
    <DatePicker prefix={smileIcon} onChange={onChange} picker="week" />
    <DatePicker prefix="Event Period" onChange={onChange} picker="week" />
    <RangePicker prefix={smileIcon} onChange={onChange} picker="week" />
    <RangePicker prefix="Event Period" onChange={onChange} picker="week" />
  </Space>
);

export default App;
```





## API

Common props ref：[Common props](/docs/react/common-props)

There are five kinds of picker:

- DatePicker
- DatePicker\[picker="month"]
- DatePicker\[picker="week"]
- DatePicker\[picker="year"]
- DatePicker\[picker="quarter"] (Added in 4.1.0)
- RangePicker

### Localization

The default locale is en-US, if you need to use other languages, recommend to use internationalized components provided by us at the entrance. Look at: [ConfigProvider](https://ant.design/components/config-provider/).

If there are special needs (only modifying single component language), Please use the property: local. Example: [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json).

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
// Make sure you import the relevant dayjs file as well, otherwise the locale won't change for all texts (e.g. range picker months)
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

:::warning
When use with Next.js App Router, make sure to add `'use client'` before import locale file of dayjs. It's because all components of Ant Design only works in client, importing locale in RSC will not work.
:::

### Common API

The following APIs are shared by DatePicker, RangePicker.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear button | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: Support object type |
| className | The picker className | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| cellRender | Custom rendering function for picker cells | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| components | Custom panels | Record<Panel \| 'input', React.ComponentType> | - | 5.14.0 |
| defaultOpen | Initial open state of picker | boolean | - |  |
| disabled | Determine whether the DatePicker is disabled | boolean | false |  |
| disabledDate | Specify the date that cannot be selected | (currentDate: dayjs, info: { from?: dayjs, type: Picker }) => boolean | - | `info`: 5.14.0 |
| format | To set the date format, support multi-format matching when it is an array, display the first one shall prevail. refer to [dayjs#format](https://day.js.org/docs/en/display/format). for example: [Custom Format](#date-picker-demo-format) | [formatType](#formattype) | [@rc-component/picker](https://github.com/react-component/picker/blob/f512f18ed59d6791280d1c3d7d37abbb9867eb0b/src/utils/uiUtil.ts#L155-L177) |  |
| order | Auto order date when multiple or range selection | boolean | true | 5.14.0 |
| ~~popupClassName~~ | To customize the className of the popup calendar, use `classNames.popup.root` instead | string | - | 4.23.0 |
| preserveInvalidOnBlur | Not clean input on blur even when the typing is invalidate | boolean | false | 5.14.0 |
| getPopupContainer | To set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| locale | Localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| minDate | The minimum date, which also limits the range of panel switching | dayjs | - | 5.14.0 |
| maxDate | The maximum date, which also limits the range of panel switching | dayjs | - | 5.14.0 |
| mode | The picker panel mode（ [Cannot select year or month anymore?](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore) ) | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| needConfirm | Need click confirm button to trigger value change. Default `false` when `multiple` | boolean | - | 5.14.0 |
| nextIcon | The custom next icon | ReactNode | - | 4.17.0 |
| open | The open state of picker | boolean | - |  |
| panelRender | Customize panel render | (panelNode) => ReactNode | - | 4.5.0 |
| picker | Set picker type | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | The placeholder of date input | string \| \[string,string] | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| ~~popupStyle~~ | To customize the style of the popup calendar, use `styles.popup.root` instead | CSSProperties | {} |  |
| prefix | The custom prefix | ReactNode | - | 5.22.0 |
| presets | The preset ranges for quick selection, Since `5.8.0`, preset value supports callback function. | { label: React.ReactNode, value: Dayjs \| (() => Dayjs) }\[] | - |  |
| prevIcon | The custom prev icon | ReactNode | - | 4.17.0 |
| previewValue | When the user selects the date hover option, the value of the input field undergoes a temporary change | false \| hover | hover | 6.0.0 |
| size | To determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| style | To customize the style of the input box | CSSProperties | {} |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| superNextIcon | The custom super next icon | ReactNode | - | 4.17.0 |
| superPrevIcon | The custom super prev icon | ReactNode | - | 4.17.0 |
| variant | Variants of picker | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onOpenChange | Callback function, can be executed whether the popup calendar is popped up or closed | function(open) | - |  |
| onPanelChange | Callback when picker panel mode is changed | function(value, mode) | - |  |

### Common Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### DatePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | Default panel date, will be reset when panel open | [dayjs](https://day.js.org/) | - | 5.14.0 |
| defaultValue | To set default date, if start time or end time is null or undefined, the date range will be an open interval | [dayjs](https://day.js.org/) | - |  |
| disabledTime | To specify the time that cannot be selected | function(date) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD` |  |
| multiple | Enable multiple selection. Not support `showTime` | boolean | false | 5.14.0 |
| pickerValue | Panel date. Used for controlled switching of panel date. Work with `onPanelChange` | [dayjs](https://day.js.org/) | - | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| showNow | Show the fast access of current datetime | boolean | - | 4.4.0 |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| ~~showTime.defaultValue~~ | Use `showTime.defaultOpenValue` instead | [dayjs](https://day.js.org/) | dayjs() | 5.27.3 |
| showTime.defaultOpenValue | To set default time of selected date, [demo](#date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showWeek | Show week info when in DatePicker | boolean | false | 5.14.0 |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |
| onOk | Callback when click ok button | function() | - |  |
| onPanelChange | Callback function for panel changing | function(value, mode) | - |  |

### DatePicker\[picker=year]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=quarter]

Added in `4.1.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-\QQ` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=month]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=week]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-wo` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |
| showWeek | Show week info when in DatePicker | boolean | true | 5.14.0 |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowEmpty | Allow start or end input leave empty | \[boolean, boolean] | \[false, false] |  |
| cellRender | Custom rendering function for picker cells | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| defaultPickerValue | Default panel date, will be reset when panel open | [dayjs](https://day.js.org/) | - | 5.14.0 |
| defaultValue | To set default date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| disabled | If disable start or end | \[boolean, boolean] | - |  |
| disabledTime | To specify the time that cannot be selected | function(date: dayjs, partial: `start` \| `end`, info: { from?: dayjs }) | - | `info.from`: 5.17.0 |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD HH:mm:ss` |  |
| id | Config input ids | { start?: string, end?: string } | - | 5.14.0 |
| pickerValue | Panel date. Used for controlled switching of panel date. Work with `onPanelChange` | [dayjs](https://day.js.org/) | - | 5.14.0 |
| presets | The preset ranges for quick selection, Since `5.8.0`, preset value supports callback function. | { label: React.ReactNode, value: (Dayjs \| (() => Dayjs))\[] }\[] | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| separator | Set separator between inputs | React.ReactNode | `<SwapRightOutlined />` |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| ~~showTime.defaultValue~~ | Use `showTime.defaultOpenValue` instead | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] | 5.27.3 |
| showTime.defaultOpenValue | To set default time of selected date, [demo](#date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | To set date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(dates: \[dayjs, dayjs] \| null, dateStrings: \[string, string] \| null) | - |  |
| onFocus | Trigger when get focus | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |
| onBlur | Trigger when lose focus | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |

#### formatType

```typescript
import type { Dayjs } from 'dayjs';

type Generic = string;
type GenericFn = (value: Dayjs) => string;

export type FormatType =
  | Generic
  | GenericFn
  | Array<Generic | GenericFn>
  | {
      format: string;
      type?: 'mask';
    };
```

Note: `type` is added in `5.14.0`.

## Semantic DOM

https://ant.design/components/date-picker/semantic.md

## Design Token



## Component Token (DatePicker)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBg | Background color when the input box is activated | string | #ffffff |
| activeBorderColor | Active border color | string | #1677ff |
| activeShadow | Box-shadow when active | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | Background color of addon | string | rgba(0,0,0,0.02) |
| cellActiveWithRangeBg | Background color of cell in range | string | #e6f4ff |
| cellBgDisabled | Background color of disabled cell | string | rgba(0,0,0,0.04) |
| cellHeight | Height of cell | number | 24 |
| cellHoverBg | Background color of cell hover state | string | rgba(0,0,0,0.04) |
| cellHoverWithRangeBg | Background color of hovered cell in range | string | #cbe0fd |
| cellRangeBorderColor | Border color of cell in range when picking | string | #82b4f9 |
| cellWidth | Width of cell | number | 36 |
| errorActiveShadow | Box-shadow when active in error status | string | 0 0 0 2px rgba(255,38,5,0.06) |
| hoverBg | Background color when the input box hovers | string | #ffffff |
| hoverBorderColor | Hover border color | string | #4096ff |
| inputFontSize | Font size | number | 14 |
| inputFontSizeLG | Font size of large | number | 16 |
| inputFontSizeSM | Font size of small | number | 14 |
| multipleItemBg | Background color of multiple tag | string | rgba(0,0,0,0.06) |
| multipleItemBorderColor | Border color of multiple tag | string | transparent |
| multipleItemBorderColorDisabled | Border color of multiple tag when disabled | string | transparent |
| multipleItemColorDisabled | Text color of multiple tag when disabled | string | rgba(0,0,0,0.25) |
| multipleItemHeight | Height of multiple tag | number | 24 |
| multipleItemHeightLG | Height of multiple tag with large size | number | 32 |
| multipleItemHeightSM | Height of multiple tag with small size | number | 16 |
| multipleSelectorBgDisabled | Background color of multiple selector when disabled | string | rgba(0,0,0,0.04) |
| paddingBlock | Vertical padding of input | number | 4 |
| paddingBlockLG | Vertical padding of large input | number | 7 |
| paddingBlockSM | Vertical padding of small input | number | 0 |
| paddingInline | Horizontal padding of input | number | 11 |
| paddingInlineLG | Horizontal padding of large input | number | 11 |
| paddingInlineSM | Horizontal padding of small input | number | 7 |
| presetsMaxWidth | Max width of preset area | number | 200 |
| presetsWidth | Width of preset area | number | 120 |
| textHeight | Height of cell text | number | 40 |
| timeCellHeight | Height of time cell | number | 28 |
| timeColumnHeight | Height of time column | number | 224 |
| timeColumnWidth | Width of time column | number | 56 |
| warningActiveShadow | Box-shadow when active in warning status | string | 0 0 0 2px rgba(255,215,5,0.1) |
| withoutTimeCellHeight | Height of decade/year/quarter/month/week cell | number | 66 |
| zIndexPopup | z-index of popup | number | 1050 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgHover | The hover state background color of the error state. | string |  |
| colorErrorBorderHover | The hover state border color of the error state. | string |  |
| colorErrorText | The default state of the text in the error color. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorTextTertiary | The third level of text color is generally used for descriptive text, such as form supplementary explanation text, list descriptive text, etc. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBgHover | The hover state background color of the warning state. | string |  |
| colorWarningBorderHover | The hover state border color of the warning state. | string |  |
| colorWarningText | The default state of the text in the warning color. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlItemBgActive | Control the background color of control component item when active. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontSizeSM | Small font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| motionEaseInQuint | Preset motion curve. | string |  |
| motionEaseOutCirc | Preset motion curve. | string |  |
| motionEaseOutQuint | Preset motion curve. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |
| sizePopupArrow | The size of the component arrow | number |  |



## FAQ

### When set mode to DatePicker/RangePicker, cannot select year or month anymore? {#faq-mode-cannot-select}

Please refer [FAQ](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore)

### Why does the date picker switch to the date panel after selecting the year instead of the month panel? {#faq-year-to-date-panel}

After selecting the year, the system directly switches to the date panel instead of month panel. This design is intended to reduce the user's operational burden by allowing them to complete the year modification with just one click, without having to enter the month selection interface again. At the same time, it also avoids additional cognitive burden of remembering the month.

### How to use DatePicker with customize date library like dayjs? {#faq-custom-date-library}

Please refer [Use custom date library](/docs/react/use-custom-date-library#datepicker)

### Why config dayjs.locale globally not work? {#faq-locale-not-work}

DatePicker default set `locale` as `en` in v4. You can config DatePicker `locale` prop or [ConfigProvider `locale`](/components/config-provider) prop instead.

#### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### How to modify start day of week? {#faq-week-start-day}

Please use correct [language](/docs/react/i18n) ([#5605](https://github.com/ant-design/ant-design/issues/5605)), or update dayjs `locale` config:

- Example: <https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx>

```js
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
```

### Why origin panel don't switch when using `panelRender`? {#faq-panel-render-switch}

When you change the layout of nodes by `panelRender`, React will unmount and re-mount it which reset the component state. You should keep the layout stable. Please ref [#27263](https://github.com/ant-design/ant-design/issues/27263) for more info.

### How to understand disabled time and date? {#faq-disabled-date-time}

Please refer to the blog ['Why is it so hard to disable the date?'](/docs/blog/picker), to learn how to use it.
