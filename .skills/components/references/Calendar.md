# Calendar — 日历

## 功能概述

按照日历形式展示数据的容器。

## 应用场景

- 当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。
- 目前支持年/月切换。

## 输入字段

### Calendar 属性

#### 必填

- 无必填属性。

#### 可选

- `cellRender`: function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' | 'end', type: PanelMode, locale?: Locale, subType?: 'hour' | 'minute' | 'second' | 'meridiem' }) => React.ReactNode，自定义单元格的内容，版本 5.4.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dateFullCellRender`: function(date: Dayjs): ReactNode，自定义渲染日期单元格，返回内容覆盖单元格，>= 5.4.0 请用 `fullCellRender`，版本 < 5.4.0。
- `fullCellRender`: function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' | 'end', type: PanelMode, locale?: Locale, subType?: 'hour' | 'minute' | 'second' | 'meridiem' }) => React.ReactNode，自定义单元格的内容，版本 5.4.0。
- `defaultValue`: [dayjs](https://day.js.org/)，默认展示的日期。
- `disabledDate`: (currentDate: Dayjs) => boolean，不可选择的日期，参数为当前 `value`，注意使用时[不要直接修改](https://github.com/ant-design/ant-design/issues/30987)。
- `fullscreen`: boolean，是否全屏显示，默认 true。
- `showWeek`: boolean，是否显示周数列，默认 false，版本 5.23.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `headerRender`: function(object:{value: Dayjs, type: 'year' | 'month', onChange: f(), onTypeChange: f()})，自定义头部内容。
- `locale`: object，国际化配置，默认 [(默认配置)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。
- `mode`: `month` | `year`，初始模式，默认 `month`。
- `validRange`: \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)]，设置可以显示的日期。
- `value`: [dayjs](https://day.js.org/)，展示日期。
- `onChange`: function(date: Dayjs)，日期变化回调。
- `onPanelChange`: function(date: Dayjs, mode: string)，日期面板变化回调。
- `onSelect`: function(date: Dayjs, info: { source: 'year' | 'month' | 'date' | 'customize' })，选择日期回调，包含来源信息，版本 `info`: 5.6.0。

## 方法

无公开方法。

## 使用建议

日程展示使用日历；配合 cellRender 自定义日期内容；小尺寸场景设置 fullscreen={false}。

## 示例代码

```tsx
import { Badge, Calendar } from 'antd';
import type { BadgeProps, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const getListData = (value: Dayjs) => {
  let listData: { type: BadgeProps['status']; content: string }[] = [];
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 15:
      listData = [{ type: 'error', content: 'This is error event.' }];
      break;
    default:
  }
  return listData;
};

const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
  if (info.type === 'date') {
    const listData = getListData(current);
    return (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  return info.originNode;
};

const App: React.FC = () => (
  <>
    <Calendar />

    <Calendar cellRender={cellRender} />

    <div style={{ width: 300 }}>
      <Calendar fullscreen={false} />
    </div>

    <Calendar validRange={[dayjs('2020-01-01'), dayjs('2020-12-31')]} />

    <Calendar
      onSelect={(date, { source }) => {
        if (source === 'date') {
          console.log('Date selected:', date.format('YYYY-MM-DD'));
        }
      }}
    />
  </>
);
```

## 返回结果

渲染一个日历组件，用于展示日期数据。
