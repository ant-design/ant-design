# TimePicker — 时间选择框

## 功能概述

输入或选择时间的控件。

## 应用场景

- 当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## 输入字段

### TimePicker 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，自定义清除按钮，默认 true，版本 5.8.0: 支持对象类型。
- `cellRender`: (current: number, info: { originNode: React.ReactNode, today: dayjs, range?: 'start' | 'end', subType: 'hour' | 'minute' | 'second' | 'meridiem' }) => React.ReactNode，自定义单元格的内容，版本 5.4.0。
- `changeOnScroll`: boolean，在滚动时改变选择值，默认 false，版本 5.14.0。
- `className`: string，选择器类名。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: [dayjs](http://day.js.org/)，默认时间。
- `disabled`: boolean，禁用全部操作，默认 false。
- `disabledTime`: [DisabledTime](#disabledtime)，不可选择的时间，版本 4.19.0。
- `format`: string，展示的时间格式，默认 `HH:mm:ss`。
- `getPopupContainer`: function(trigger)，定义浮层的容器，默认为 body 上新建 div。
- `hideDisabledOptions`: boolean，隐藏禁止选择的选项，默认 false。
- `hourStep`: number，小时选项间隔，默认 1。
- `inputReadOnly`: boolean，设置输入框为只读（避免在移动设备上打开虚拟键盘），默认 false。
- `minuteStep`: number，分钟选项间隔，默认 1。
- `needConfirm`: boolean，是否需要确认按钮，为 `false` 时失去焦点即代表选择，版本 5.14.0。
- `open`: boolean，面板是否打开，默认 false。
- `placeholder`: string | \[string, string]，没有值的时候显示的内容，默认 `请选择时间`。
- `placement`: `bottomLeft` `bottomRight` `topLeft` `topRight`，选择框弹出的位置，默认 bottomLeft。
- `~~popupClassName~~`: string，弹出层类名，请使用 `classNames.popup` 替换。
- `~~popupStyle~~`: object，弹出层样式对象, 请使用 `styles.popup` 替换。
- `prefix`: ReactNode，自定义前缀，版本 5.22.0。
- `previewValue`: false | hover，当用户选择时间悬停选项时，输入字段的值会发生临时更改，默认 hover，版本 6.0.0。
- `renderExtraFooter`: () => ReactNode，选择框底部显示自定义的内容。
- `secondStep`: number，秒选项间隔，默认 1。
- `showNow`: boolean，面板是否显示“此刻”按钮，版本 4.4.0。
- `size`: `large` | `middle` | `small`，输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `suffixIcon`: ReactNode，自定义的选择框后缀图标。
- `use12Hours`: boolean，使用 12 小时制，为 true 时 `format` 默认为 `h:mm:ss a`，默认 false。
- `value`: [dayjs](http://day.js.org/)，当前时间。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onCalendarChange`: function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`|`end` })，待选日期发生变化的回调。`info` 参数自 4.4.0 添加。
- `onChange`: function(time: dayjs, timeString: string): void，时间发生变化的回调。
- `onOpenChange`: (open: boolean) => void，面板打开/关闭时的回调。

### RangePicker 属性

#### 必填

- 无必填属性。

#### 可选

- `disabledTime`: [RangeDisabledTime](#rangedisabledtime)，不可选择的时间，版本 4.19.0。
- `order`: boolean，始末时间是否自动排序，默认 true，版本 4.1.0。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
    <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />

    <TimePicker defaultValue={dayjs('12:08', format)} format={format} />

    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />

    <TimePicker.RangePicker />

    <TimePicker disabled defaultValue={dayjs('12:08:00', 'HH:mm:ss')} />

    <TimePicker size="small" />
    <TimePicker />
    <TimePicker size="large" />

    <TimePicker minuteStep={15} secondStep={10} />

    <TimePicker renderExtraFooter={() => <span>Extra Footer</span>} />

    <TimePicker value={dayjs('12:08', format)} format={format} />

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
