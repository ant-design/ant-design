---
category: Components
group: Data Display
title: Calendar
description: A container that displays data in calendar form.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*nF6_To7pDSAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-p-wQLik200AAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

## Examples

### Basic

A basic calendar component with Year/Month switch.

```tsx
import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const App: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return <Calendar onPanelChange={onPanelChange} />;
};

export default App;
```

### Notice Calendar

This component can be rendered by using `dateCellRender` and `monthCellRender` with the data you need.

```tsx
import React from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { createStyles } from 'antd-style';
import type { Dayjs } from 'dayjs';

const useStyles = createStyles((props) => {
  const { prefixCls, css } = props;
  return {
    events: css`
      margin: 0;
      padding: 0;
      list-style: none;
      .${prefixCls}-badge-status {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,
    notesMonth: css`
      font-size: 28px;
      text-align: center;
      section {
        font-size: 28px;
      }
    `,
  };
});

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
      break;
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
  return undefined;
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className={styles.notesMonth}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    if (info.type === 'month') {
      return monthCellRender(current);
    }
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default App;
```

### Event Range

Render event ranges across days with `cellRender`. The example calculates whether each date is the start, middle, end, or a single-day event and draws compact range bars.

```tsx
import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const useStyle = createStyles(({ cssVar, css }) => {
  const barRadius = 999;

  const {
    controlHeight,
    marginXXS,
    controlHeightSM,
    colorTextLightSolid,
    fontSizeSM,
    paddingXS,
    marginXS,
    paddingXXS,
  } = cssVar;

  return {
    itemContent: css`
      overflow: visible;
    `,
    cell: css`
      min-height: ${controlHeight};
    `,
    list: css`
      display: flex;
      flex-direction: column;
      gap: ${marginXXS};
      margin-top: ${marginXXS};
    `,
    bar: css`
      display: block;
      height: calc(${controlHeightSM} - ${marginXXS});
      overflow: hidden;
      color: ${colorTextLightSolid};
      font-size: ${fontSizeSM};
      white-space: nowrap;
      text-overflow: ellipsis;
    `,
    barStart: css`
      margin-inline-end: calc(-1 * (${paddingXS} + ${marginXS} / 2));
      padding-inline-start: calc(${paddingXXS} + ${paddingXXS});
      border-start-start-radius: ${barRadius}px;
      border-end-start-radius: ${barRadius}px;
    `,
    barMiddle: css`
      margin-inline: calc(-1 * (${paddingXS} + ${marginXS} / 2));
    `,
    barEnd: css`
      margin-inline-start: calc(-1 * (${paddingXS} + ${marginXS} / 2));
      border-start-end-radius: ${barRadius}px;
      border-end-end-radius: ${barRadius}px;
    `,
    barSingle: css`
      padding-inline-start: calc(${paddingXXS} + ${paddingXXS});
      border-radius: ${barRadius}px;
    `,
  };
});

export interface CalendarEvent {
  key: string;
  title: string;
  start: Dayjs;
  end: Dayjs;
  color: string;
}

const getEvents = (token: ReturnType<typeof theme.useToken>['token']): CalendarEvent[] => [
  {
    key: 'release',
    title: 'Release window',
    start: dayjs('2026-01-08'),
    end: dayjs('2026-01-10'),
    color: token.colorPrimary,
  },
  {
    key: 'design-review',
    title: 'Design review',
    start: dayjs('2026-01-14'),
    end: dayjs('2026-01-14'),
    color: token.colorSuccess,
  },
  {
    key: 'maintenance',
    title: 'Maintenance',
    start: dayjs('2026-01-21'),
    end: dayjs('2026-01-24'),
    color: token.colorWarning,
  },
  {
    key: 'bug-fix',
    title: 'Bug fix',
    start: dayjs('2026-01-30'),
    end: dayjs('2026-01-31'),
    color: token.colorError,
  },
];

const isInRange = (current: Dayjs, event: CalendarEvent) => {
  return !current.isBefore(event.start, 'day') && !current.isAfter(event.end, 'day');
};

const getRangePosition = (current: Dayjs, event: CalendarEvent) => {
  const starts = current.isSame(event.start, 'day');
  const ends = current.isSame(event.end, 'day');

  if (starts && ends) {
    return 'single';
  }

  if (starts) {
    return 'start';
  }

  if (ends) {
    return 'end';
  }

  return 'middle';
};

const App: React.FC = () => {
  const { token } = theme.useToken();
  const { styles } = useStyle();
  const events = React.useMemo(() => getEvents(token), [token]);

  const cellRender = React.useCallback<NonNullable<CalendarProps<Dayjs>['cellRender']>>(
    (current, info) => {
      if (info.type !== 'date') {
        return null;
      }

      const currentEvents = events.filter((event) => isInRange(current, event));

      return (
        <div className={styles.cell}>
          <div className={styles.list}>
            {currentEvents.map((event) => {
              const position = getRangePosition(current, event);
              const rangeClassName = {
                start: styles.barStart,
                middle: styles.barMiddle,
                end: styles.barEnd,
                single: styles.barSingle,
              }[position];
              return (
                <span
                  key={event.key}
                  className={clsx(styles.bar, rangeClassName)}
                  style={{ backgroundColor: event.color }}
                >
                  {position === 'start' || position === 'single' ? event.title : null}
                </span>
              );
            })}
          </div>
        </div>
      );
    },
    [events, styles],
  );

  return (
    <Calendar
      classNames={{ itemContent: styles.itemContent }}
      defaultValue={dayjs('2026-01-01')}
      cellRender={cellRender}
    />
  );
};

export default App;
```

### Card

Nested inside a container element for rendering in limited space.

```tsx
import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const App: React.FC = () => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};

export default App;
```

### Selectable Calendar

A basic calendar component with Year/Month switch.

```tsx
import React, { useState } from 'react';
import { Alert, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert title={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};

export default App;
```

### Lunar Calendar

Display lunar calendar, solar terms and other information.

```tsx
import React from 'react';
import { Calendar, Col, Radio, Row, Select } from 'antd';
import type { CalendarProps } from 'antd';
import { createStyles } from 'antd-style';
import type { DefaultOptionType } from 'antd/es/select';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { HolidayUtil, Lunar } from 'lunar-typescript';

const useStyle = createStyles(({ token, css, cx }) => {
  const lunar = css`
    color: ${token.colorTextTertiary};
    font-size: ${token.fontSizeSM}px;
  `;
  const weekend = css`
    color: ${token.colorError};
    &.gray {
      opacity: 0.4;
    }
  `;
  return {
    wrapper: css`
      width: 450px;
      border: ${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary};
      border-radius: ${token.borderRadiusOuter};
      padding: 5px;
    `,
    dateCell: css`
      position: relative;
      &:before {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-inline-end: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        max-width: 40px;
        max-height: 40px;
        background: transparent;
        transition: background-color 300ms;
        border-radius: ${token.borderRadiusOuter}px;
        border: ${token.lineWidth}px ${token.lineType} transparent;
        box-sizing: border-box;
      }
      &:hover:before {
        background: ${token.controlItemBgHover};
      }
    `,
    today: css`
      &:before {
        border: ${token.lineWidth}px ${token.lineType} ${token.colorPrimary};
      }
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    lunar,
    current: css`
      color: ${token.colorTextLightSolid};
      &:before {
        background: ${token.colorPrimary};
      }
      &:hover:before {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
      .${cx(lunar)} {
        color: ${token.colorTextLightSolid};
        opacity: 0.9;
      }
      .${cx(weekend)} {
        color: ${token.colorTextLightSolid};
      }
    `,
    monthCell: css`
      width: 120px;
      color: ${token.colorTextBase};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px 0;
      &:hover {
        background: ${token.controlItemBgHover};
      }
    `,
    monthCellCurrent: css`
      color: ${token.colorTextLightSolid};
      background: ${token.colorPrimary};
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
    `,
    weekend,
  };
});

const App: React.FC = () => {
  const { styles } = useStyle({ test: true });

  const [selectDate, setSelectDate] = React.useState<Dayjs>(() => dayjs());
  const [panelDate, setPanelDate] = React.useState<Dayjs>(() => dayjs());

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
    setPanelDate(value);
  };

  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (value) => {
    setSelectDate(value);
  };

  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (date, info) => {
    const d = Lunar.fromDate(date.toDate());
    const lunar = d.getDayInChinese();
    const solarTerm = d.getJieQi();
    const isWeekend = date.day() === 6 || date.day() === 0;
    const h = HolidayUtil.getHoliday(date.get('year'), date.get('month') + 1, date.get('date'));
    const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...(info.originNode as React.ReactElement<any>).props,
        className: clsx(styles.dateCell, {
          [styles.current]: selectDate.isSame(date, 'date'),
          [styles.today]: date.isSame(dayjs(), 'date'),
        }),
        children: (
          <div className={styles.text}>
            <span
              className={clsx({
                [styles.weekend]: isWeekend,
                gray: !panelDate.isSame(date, 'month'),
              })}
            >
              {date.get('date')}
            </span>
            {info.type === 'date' && (
              <div className={styles.lunar}>{displayHoliday || solarTerm || lunar}</div>
            )}
          </div>
        ),
      });
    }

    if (info.type === 'month') {
      // Due to the fact that a solar month is part of the lunar month X and part of the lunar month X+1,
      // when rendering a month, always take X as the lunar month of the month
      const d2 = Lunar.fromDate(new Date(date.get('year'), date.get('month')));
      const month = d2.getMonthInChinese();
      return (
        <div
          className={clsx(styles.monthCell, {
            [styles.monthCellCurrent]: selectDate.isSame(date, 'month'),
          })}
        >
          {date.get('month') + 1}月（{month}月）
        </div>
      );
    }
  };

  const getYearLabel = (year: number) => {
    const d = Lunar.fromDate(new Date(year + 1, 0));
    return `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`;
  };

  const getMonthLabel = (month: number, value: Dayjs) => {
    const d = Lunar.fromDate(new Date(value.year(), month));
    const lunar = d.getMonthInChinese();
    return `${month + 1}月（${lunar}月）`;
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        fullCellRender={cellRender}
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions: DefaultOptionType[] = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months: dayjs.MonthNames[] = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push({
              label: getMonthLabel(i, value),
              value: i,
            });
          }

          const year = value.year();
          const month = value.month();
          const options: DefaultOptionType[] = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push({
              label: getYearLabel(i),
              value: i,
            });
          }
          return (
            <Row justify="end" gutter={8} style={{ padding: 8 }}>
              <Col>
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  options={options}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                />
              </Col>
              <Col>
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  value={month}
                  options={monthOptions}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                />
              </Col>
              <Col>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}
                >
                  <Radio.Button value="month">月</Radio.Button>
                  <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          );
        }}
      />
    </div>
  );
};

export default App;
```

### Show Week

Show week number in fullscreen calendar by setting `showWeek` prop to `true`.

```tsx
import React from 'react';
import { Calendar } from 'antd';

const App: React.FC = () => (
  <>
    <Calendar fullscreen showWeek />
    <br />
    <Calendar fullscreen={false} showWeek />
  </>
);

export default App;
```

### Customize Header

Customize Calendar header content.

```tsx
import React from 'react';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import { Calendar, Flex, Radio, Select, theme, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';

dayjs.extend(dayLocaleData);

const App: React.FC = () => {
  const { token } = theme.useToken();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const year = value.year();
          const month = value.month();

          const yearOptions = Array.from({ length: 20 }, (_, i) => {
            const label = year - 10 + i;
            return { label, value: label };
          });

          const monthOptions = value
            .localeData()
            .monthsShort()
            .map((label, index) => ({
              label,
              value: index,
            }));

          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Flex gap={8}>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}
                >
                  <Radio.Button value="month">Month</Radio.Button>
                  <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  value={year}
                  options={yearOptions}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                />
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  value={month}
                  options={monthOptions}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                />
              </Flex>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Calendar by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Calendar, Flex } from 'antd';
import type { CalendarProps, GetProp } from 'antd';
import { createStyles } from 'antd-style';
import type { Dayjs } from 'dayjs';

const useStyles = createStyles(({ token }) => ({
  root: {
    padding: 10,
    backgroundColor: token.colorPrimaryBg,
  },
}));

const stylesObject: CalendarProps<Dayjs>['styles'] = {
  root: {
    borderRadius: 8,
    width: 600,
  },
};

const stylesFunction: CalendarProps<Dayjs>['styles'] = (
  info,
): GetProp<CalendarProps<Dayjs>, 'styles', 'Return'> => {
  if (info.props.fullscreen) {
    return {
      root: {
        border: '2px solid #BDE3C3',
        borderRadius: 10,
        backgroundColor: 'rgba(189,227,195, 0.3)',
      },
    };
  }
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="medium">
      <Calendar fullscreen={false} classNames={classNames} styles={stylesObject} />
      <Calendar classNames={classNames} styles={stylesFunction} />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

**Note:** Part of the Calendar's locale is read from `value`. So, please set the locale of `dayjs` correctly.

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

<Calendar cellRender={cellRender} onPanelChange={onPanelChange} onSelect={onSelect} />
```

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| cellRender | Customize cell content | function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 | × |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| ~~dateFullCellRender~~ | Customize the display of the date cell, the returned content will override the cell. Please use `fullCellRender` instead in 5.4.0 and later | function(date: Dayjs): ReactNode | - | < 5.4.0 | × |
| fullCellRender | Customize cell content | function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 | × |
| defaultValue | The date selected by default | [dayjs](https://day.js.org/) | - |  | × |
| disabledDate | Function that specifies the dates that cannot be selected, `currentDate` is same dayjs object as `value` prop which you shouldn't mutate it (https://github.com/ant-design/ant-design/issues/30987) | (currentDate: Dayjs) => boolean | - |  | × |
| fullscreen | Whether to display in full-screen | boolean | true |  | × |
| showWeek | Whether to display week number | boolean | false | 5.23.0 | × |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  | 6.0.0 |
| headerRender | Render custom header in panel | function(object:{value: Dayjs, type: 'year' \| 'month', onChange: f(), onTypeChange: f()}) | - |  | × |
| locale | The calendar's locale | object | [(default)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  | × |
| mode | The display mode of the calendar | `month` \| `year` | `month` |  | × |
| validRange | To set valid range | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  | × |
| value | The current selected date | [dayjs](https://day.js.org/) | - |  | × |
| onChange | Callback for when date changes | function(date: Dayjs) | - |  | × |
| onPanelChange | Callback for when panel changes | function(date: Dayjs, mode: string) | - |  | × |
| onSelect | Callback for when a date is selected, include source info | function(date: Dayjs, info: { source: 'year' \| 'month' \| 'date' \| 'customize' }) | - | `info`: 5.6.0 | × |

## Semantic DOM

https://ant.design/components/calendar/semantic.md

## Design Token



## Component Token (Calendar)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| fullBg | Background color of full calendar | string | #ffffff |
| fullPanelBg | Background color of full calendar panel | string | #ffffff |
| itemActiveBg | Background color of selected date item | string | #e6f4ff |
| miniContentHeight | Height of mini calendar content | string \| number | 256 |
| monthControlWidth | Width of month select | string \| number | 70 |
| yearControlWidth | Width of year select | string \| number | 80 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextTertiary | The third level of text color is generally used for descriptive text, such as form supplementary explanation text, list descriptive text, etc. | string |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlItemBgActive | Control the background color of control component item when active. | string |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |
| screenXS | Control the screen width of extra small screens. | number |  |



## FAQ

### How to use Calendar with customize date library? {#faq-customize-date-library}

See [Use custom date library](/docs/react/use-custom-date-library#calendar)

### How to set locale for date-related components? {#faq-set-locale-date-components}

See [How to set locale for date-related components](/components/date-picker/#localization)

### Date-related components locale is not working? {#faq-locale-not-working}

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### How to get date from panel click? {#faq-get-date-panel-click}

`onSelect` provide `info.source` to help on this:

```tsx
<Calendar
  onSelect={(date, { source }) => {
    if (source === 'date') {
      console.log('Panel Select:', source);
    }
  }}
/>
```
