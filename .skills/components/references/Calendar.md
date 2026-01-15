# Calendar — 日历

## 功能概述

按照日历形式展示数据的容器。

## 输入字段

### 可选

- `value`: Dayjs，当前日期（受控）。
- `defaultValue`: Dayjs，默认日期。
- `mode`: string，显示模式，可选 `month` | `year`，默认 `month`。
- `fullscreen`: boolean，全屏显示，默认 `true`。
- `validRange`: [Dayjs, Dayjs]，可选范围。
- `disabledDate`: (date) => boolean，不可选日期。
- `locale`: object，国际化配置。
- `headerRender`: (config) => ReactNode，自定义头部渲染。
- `cellRender`: (date, info) => ReactNode，自定义单元格渲染。
- `fullCellRender`: (date, info) => ReactNode，自定义单元格完整渲染（5.4.0+）。
- `onChange`: (date) => void，日期变化回调。
- `onPanelChange`: (date, mode) => void，面板变化回调。
- `onSelect`: (date, info) => void，选择日期回调。

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
    {/* 基础用法 */}
    <Calendar />

    {/* 带事件 */}
    <Calendar cellRender={cellRender} />

    {/* 卡片模式 */}
    <div style={{ width: 300 }}>
      <Calendar fullscreen={false} />
    </div>

    {/* 可选范围 */}
    <Calendar validRange={[dayjs('2020-01-01'), dayjs('2020-12-31')]} />

    {/* 日期选择 */}
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
