# TimePicker — 时间选择框

## 功能概述

输入或选择时间的控件。

## 输入字段

### 可选

- `value`: Dayjs，当前时间（受控）。
- `defaultValue`: Dayjs，默认时间。
- `format`: string，时间格式，默认 `HH:mm:ss`。
- `placeholder`: string | [string, string]，占位符。
- `use12Hours`: boolean，使用 12 小时制，默认 `false`。
- `hourStep`: number，小时选项间隔，默认 `1`。
- `minuteStep`: number，分钟选项间隔，默认 `1`。
- `secondStep`: number，秒选项间隔，默认 `1`。
- `showNow`: boolean，显示"此刻"按钮，默认 `true`。
- `showHour`: boolean，是否显示小时，默认 `true`（5.16.0+）。
- `showMinute`: boolean，是否显示分钟，默认 `true`（5.16.0+）。
- `showSecond`: boolean，是否显示秒，默认 `true`（5.16.0+）。
- `showMillisecond`: boolean，是否显示毫秒，默认 `false`（5.16.0+）。
- `hideDisabledOptions`: boolean，隐藏禁用选项，默认 `false`。
- `disabled`: boolean，禁用。
- `allowClear`: boolean | { clearIcon }，允许清除，默认 `true`。
- `status`: string，状态，可选 `error` | `warning`。
- `variant`: string，形态变体，可选 `outlined` | `borderless` | `filled`，默认 `outlined`。
- `size`: string，尺寸，可选 `large` | `middle` | `small`。
- `suffixIcon`: ReactNode，后缀图标。
- `open`: boolean，是否打开面板（受控）。
- `placement`: string，弹窗位置。
- `popupClassName`: string，弹窗类名。
- `getPopupContainer`: (node) => HTMLElement，弹窗容器。
- `disabledTime`: (date) => DisabledTime，禁用时间配置。
- `cellRender`: (current, info) => ReactNode，自定义单元格渲染。
- `renderExtraFooter`: () => ReactNode，额外页脚。
- `needConfirm`: boolean，是否需要确认（5.14.0+）。
- `onChange`: (time, timeString) => void，时间变化回调。
- `onOpenChange`: (open) => void，面板开关回调。
- `onCalendarChange`: (dates, dateStrings, info) => void，值变化回调。

### TimePicker.RangePicker 属性

时间范围选择器，继承 TimePicker 属性，额外：

- `value`: [Dayjs, Dayjs]，当前值。
- `defaultValue`: [Dayjs, Dayjs]，默认值。
- `order`: boolean，是否排序，默认 `true`。

## 使用建议

选择时间使用 TimePicker；选择时间范围使用 RangePicker；配合 format 自定义显示格式。

## 示例代码

```tsx
import { Space, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 基础用法 */}
    <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />

    {/* 选择时分 */}
    <TimePicker defaultValue={dayjs('12:08', format)} format={format} />

    {/* 12 小时制 */}
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />

    {/* 时间范围 */}
    <TimePicker.RangePicker />

    {/* 禁用 */}
    <TimePicker disabled defaultValue={dayjs('12:08:00', 'HH:mm:ss')} />

    {/* 不同尺寸 */}
    <TimePicker size="small" />
    <TimePicker />
    <TimePicker size="large" />

    {/* 步进 */}
    <TimePicker minuteStep={15} secondStep={10} />

    {/* 附加内容 */}
    <TimePicker renderExtraFooter={() => <span>Extra Footer</span>} />

    {/* 受控 */}
    <TimePicker value={dayjs('12:08', format)} format={format} />

    {/* 禁用特定时间 */}
    <TimePicker
      disabledTime={() => ({
        disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23],
        disabledMinutes: (hour) => (hour === 8 ? [0, 1, 2, 3, 4, 5] : []),
        disabledSeconds: () => [],
      })}
    />
  </Space>
);
```

## 返回结果

渲染一个时间选择器组件。
