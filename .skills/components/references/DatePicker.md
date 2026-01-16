# DatePicker — 日期选择框

## 功能概述

输入或选择日期的控件。

## 应用场景

- 当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 输入字段

### 共同的 API 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，自定义清除按钮，默认 true，版本 5.8.0: 支持对象类型。
- `className`: string，选择器 className。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dateRender`: function(currentDate: dayjs, today: dayjs) => React.ReactNode，自定义日期单元格的内容，5.4.0 起用 `cellRender` 代替，版本 < 5.4.0。
- `cellRender`: (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' | 'end', type: PanelMode, locale?: Locale, subType?: 'hour' | 'minute' | 'second' | 'meridiem' }) => React.ReactNode，自定义单元格的内容，版本 5.4.0。
- `components`: Record<Panel | 'input', React.ComponentType>，自定义面板，版本 5.14.0。
- `defaultOpen`: boolean，是否默认展开控制弹层。
- `disabled`: boolean，禁用，默认 false。
- `disabledDate`: (currentDate: dayjs, info: { from?: dayjs, type: Picker }) => boolean，不可选择的日期，版本 `info`: 5.14.0。
- `format`: [formatType](#formattype)，设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。示例：[自定义格式](#date-picker-demo-format)，默认 [@rc-component/picker](https://github.com/react-component/picker/blob/f512f18ed59d6791280d1c3d7d37abbb9867eb0b/src/utils/uiUtil.ts#L155-L177)。
- `order`: boolean，多选、范围时是否自动排序，默认 true，版本 5.14.0。
- `preserveInvalidOnBlur`: boolean，失去焦点是否要清空输入框内无效内容，默认 false，版本 5.14.0。
- `~~popupClassName~~`: string，额外的弹出日历 className，使用 `classNames.popup.root` 替代，版本 4.23.0。
- `getPopupContainer`: function(trigger)，定义浮层的容器，默认为 body 上新建 div。
- `inputReadOnly`: boolean，设置输入框为只读（避免在移动设备上打开虚拟键盘），默认 false。
- `locale`: object，国际化配置，默认 [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。
- `minDate`: dayjs，最小日期，同样会限制面板的切换范围，版本 5.14.0。
- `maxDate`: dayjs，最大日期，同样会限制面板的切换范围，版本 5.14.0。
- `mode`: `time` | `date` | `month` | `year` | `decade`，日期面板的状态（[设置后无法选择年份/月份？](/docs/react/faq#当我指定了-datepickerrangepicker-的-mode-属性后点击后无法选择年份月份)）。
- `needConfirm`: boolean，是否需要确认按钮，为 `false` 时失去焦点即代表选择。当设置 `multiple` 时默认为 `false`，版本 5.14.0。
- `nextIcon`: ReactNode，自定义下一个图标，版本 4.17.0。
- `open`: boolean，控制弹层是否展开。
- `panelRender`: (panelNode) => ReactNode，自定义渲染面板，版本 4.5.0。
- `picker`: `date` | `week` | `month` | `quarter` | `year`，设置选择器类型，默认 `date`，版本 `quarter`: 4.1.0。
- `placeholder`: string | \[string, string]，输入框提示文字。
- `placement`: `bottomLeft` `bottomRight` `topLeft` `topRight`，选择框弹出的位置，默认 bottomLeft。
- `~~popupStyle~~`: CSSProperties，额外的弹出日历样式，使用 `styles.popup.root` 替代，默认 {}。
- `prefix`: ReactNode，自定义前缀，版本 5.22.0。
- `prevIcon`: ReactNode，自定义上一个图标，版本 4.17.0。
- `previewValue`: false | hover，当用户选择日期悬停选项时，输入字段的值会发生临时更改，默认 hover，版本 6.0.0。
- `presets`: { label: React.ReactNode, value: Dayjs | (() => Dayjs) }\[]，预设时间范围快捷选择, 自 `5.8.0` 起 value 支持函数返回值。
- `size`: `large` | `middle` | `small`，输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `style`: CSSProperties，自定义输入框样式，默认 {}。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `suffixIcon`: ReactNode，自定义的选择框后缀图标。
- `superNextIcon`: ReactNode，自定义 `>>` 切换图标，版本 4.17.0。
- `superPrevIcon`: ReactNode，自定义 `<<` 切换图标，版本 4.17.0。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onOpenChange`: function(open)，弹出日历和关闭日历的回调。
- `onPanelChange`: function(value, mode)，日历面板切换的回调。

### DatePicker 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultPickerValue`: [dayjs](https://day.js.org/)，默认面板日期，每次面板打开时会被重置到该日期，版本 5.14.0。
- `defaultValue`: [dayjs](https://day.js.org/)，默认日期，如果开始时间或结束时间为 `null` 或者 `undefined`，日期范围将是一个开区间。
- `disabledTime`: function(date)，不可选择的时间。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY-MM-DD`。
- `multiple`: boolean，是否为多选，不支持 `showTime`，默认 false，版本 5.14.0。
- `pickerValue`: [dayjs](https://day.js.org/)，面板日期，可以用于受控切换面板所在日期。配合 `onPanelChange` 使用，版本 5.14.0。
- `renderExtraFooter`: (mode) => React.ReactNode，在面板中添加额外的页脚。
- `showNow`: boolean，显示当前日期时间的快捷选择。
- `showTime`: Object | boolean，增加时间选择功能，默认 [TimePicker Options](/components/time-picker-cn#api)。
- `~~showTime.defaultValue~~`: [dayjs](https://day.js.org/)，请使用 `showTime.defaultOpenValue`，默认 dayjs()，版本 5.27.3。
- `showTime.defaultOpenValue`: [dayjs](https://day.js.org/)，设置用户选择日期时默认的时分秒，[例子](#date-picker-demo-disabled-date)，默认 dayjs()。
- `showWeek`: boolean，DatePicker 下展示当前周，默认 false，版本 5.14.0。
- `value`: [dayjs](https://day.js.org/)，日期。
- `onChange`: function(date: dayjs | null, dateString: string | null)，时间发生变化的回调。
- `onOk`: function()，点击确定按钮的回调。
- `onPanelChange`: function(value, mode)，日期面板变化时的回调。

### DatePicker\[picker=year] 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultValue`: [dayjs](https://day.js.org/)，默认日期。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY`。
- `multiple`: boolean，是否为多选，默认 false，版本 5.14.0。
- `renderExtraFooter`: () => React.ReactNode，在面板中添加额外的页脚。
- `value`: [dayjs](https://day.js.org/)，日期。
- `onChange`: function(date: dayjs | null, dateString: string | null)，时间发生变化的回调，发生在用户选择时间时。

### DatePicker\[picker=quarter] 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultValue`: [dayjs](https://day.js.org/)，默认日期。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY-\QQ`。
- `multiple`: boolean，是否为多选，默认 false，版本 5.14.0。
- `renderExtraFooter`: () => React.ReactNode，在面板中添加额外的页脚。
- `value`: [dayjs](https://day.js.org/)，日期。
- `onChange`: function(date: dayjs | null, dateString: string | null)，时间发生变化的回调，发生在用户选择时间时。

### DatePicker\[picker=month] 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultValue`: [dayjs](https://day.js.org/)，默认日期。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY-MM`。
- `multiple`: boolean，是否为多选，默认 false，版本 5.14.0。
- `renderExtraFooter`: () => React.ReactNode，在面板中添加额外的页脚。
- `value`: [dayjs](https://day.js.org/)，日期。
- `onChange`: function(date: dayjs | null, dateString: string | null)，时间发生变化的回调，发生在用户选择时间时。

### DatePicker\[picker=week] 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultValue`: [dayjs](https://day.js.org/)，默认日期。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY-wo`。
- `multiple`: boolean，是否为多选，默认 false，版本 5.14.0。
- `renderExtraFooter`: (mode) => React.ReactNode，在面板中添加额外的页脚。
- `value`: [dayjs](https://day.js.org/)，日期。
- `onChange`: function(date: dayjs | null, dateString: string | null)，时间发生变化的回调，发生在用户选择时间时。
- `showWeek`: boolean，DatePicker 下展示当前周，默认 true，版本 5.14.0。

### RangePicker 属性

#### 必填

- 无必填属性。

#### 可选

- `allowEmpty`: \[boolean, boolean]，允许起始项部分为空，默认 \[false, false]。
- `cellRender`: (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' | 'end', type: PanelMode, locale?: Locale, subType?: 'hour' | 'minute' | 'second' | 'meridiem' }) => React.ReactNode，自定义单元格的内容，版本 5.4.0。
- `dateRender`: function(currentDate: dayjs, today: dayjs) => React.ReactNode，自定义日期单元格的内容，5.4.0 起用 `cellRender` 代替，版本 < 5.4.0。
- `defaultPickerValue`: [dayjs](https://day.js.org/)[]，默认面板日期，每次面板打开时会被重置到该日期，版本 5.14.0。
- `defaultValue`: [dayjs](https://day.js.org/)\[]，默认日期。
- `disabled`: \[boolean, boolean]，禁用起始项。
- `disabledTime`: function(date: dayjs, partial: `start` | `end`, info: { from?: dayjs })，不可选择的时间，版本 `info.from`: 5.17.0。
- `format`: [formatType](#formattype)，展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)，默认 `YYYY-MM-DD HH:mm:ss`。
- `id`: { start?: string, end?: string }，设置输入框 `id` 属性，版本 5.14.0。
- `pickerValue`: [dayjs](https://day.js.org/)[]，面板日期，可以用于受控切换面板所在日期。配合 `onPanelChange` 使用，版本 5.14.0。
- `presets`: { label: React.ReactNode, value: (Dayjs | (() => Dayjs))\[] }\[]，预设时间范围快捷选择，自 `5.8.0` 起 value 支持函数返回值。
- `renderExtraFooter`: () => React.ReactNode，在面板中添加额外的页脚。
- `separator`: React.ReactNode，设置分隔符，默认 `<SwapRightOutlined />`。
- `showTime`: Object|boolean，增加时间选择功能，默认 [TimePicker Options](/components/time-picker-cn#api)。
- `~~showTime.defaultValue~~`: [dayjs](https://day.js.org/)\[]，请使用 `showTime.defaultOpenValue`，默认 \[dayjs(), dayjs()]，版本 5.27.3。
- `showTime.defaultOpenValue`: [dayjs](https://day.js.org/)\[]，设置用户选择日期时默认的时分秒，[例子](#date-picker-demo-disabled-date)，默认 \[dayjs(), dayjs()]。
- `value`: [dayjs](https://day.js.org/)\[]，日期。
- `onCalendarChange`: function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`|`end` })，待选日期发生变化的回调。`info` 参数自 4.4.0 添加。
- `onChange`: function(dates: \[dayjs, dayjs] | null, dateStrings: \[string, string] | null)，日期范围发生变化的回调。
- `onFocus`: function(event, { range: 'start' | 'end' })，聚焦时回调，版本 `range`: 5.14.0。
- `onBlur`: function(event, { range: 'start' | 'end' })，失焦时回调，版本 `range`: 5.14.0。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

## 常见场景示例

### 场景 1: 基础日期选择

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker onChange={onChange} placeholder="选择日期" />

      <DatePicker onChange={onChange} picker="week" placeholder="选择周" />

      <DatePicker onChange={onChange} picker="month" placeholder="选择月" />

      <DatePicker onChange={onChange} picker="year" placeholder="选择年" />
    </Space>
  );
};
```

### 场景 2: 日期时间选择

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const App: React.FC = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('选择的日期时间:', date, dateString);
  };

  const onOk: DatePickerProps['onOk'] = (date) => {
    console.log('确定的日期时间:', date);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="选择日期和时间" />

      <DatePicker
        showTime={{
          format: 'HH:mm',
          hourStep: 1,
          minuteStep: 15,
        }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        placeholder="选择日期和时间"
      />

      <DatePicker
        showTime={{ use12Hours: true, format: 'h:mm A' }}
        format="YYYY-MM-DD h:mm A"
        onChange={onChange}
        placeholder="12 小时制"
      />
    </Space>
  );
};
```

### 场景 3: 日期范围选择

```tsx
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const { RangePicker } = DatePicker;

  const onChange: DatePickerProps['onChange'] = (dates, dateStrings) => {
    console.log('范围:', dates, dateStrings);
  };

  return (
    <>
      <RangePicker onChange={onChange} placeholder={['开始日期', '结束日期']} />

      <RangePicker showTime onChange={onChange} placeholder={['开始日期时间', '结束日期时间']} />

      <RangePicker
        disabledDate={(current) => {
          return current && current < dayjs().startOf('day');
        }}
        placeholder={['开始日期', '结束日期']}
      />
    </>
  );
};
```

### 场景 4: 禁用和预设

```tsx
import { Button, DatePicker, Space } from 'antd';
import type { DatePickerProps, PresetRanges } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const { RangePicker } = DatePicker;

  const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    return current && (current.day() === 0 || current.day() === 6);
  };

  const presetRanges: PresetRanges = {
    today: [dayjs(), dayjs()],
    '7days': [dayjs().subtract(7, 'day'), dayjs()],
    '30days': [dayjs().subtract(30, 'day'), dayjs()],
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker disabledDate={disabledDate} placeholder="禁用周末" />

      <RangePicker presets={presetRanges} placeholder={['开始日期', '结束日期']} />

      <RangePicker
        disabledTime={(date, partial) => {
          if (partial === 'start') {
            return {
              disabledHours: () => [0, 1, 2], // 禁用 0-2 点
            };
          }
          return {};
        }}
        showTime
        placeholder={['开始', '结束']}
      />
    </Space>
  );
};
```

### 场景 5: 受控和格式化

```tsx
import { useState } from 'react';
import { Button, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const onChange: DatePickerProps['onChange'] = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <DatePicker value={date} onChange={onChange} format="YYYY/MM/DD" placeholder="自定义格式" />

      <Button onClick={() => setDate(null)}>清除日期</Button>

      {date && <p>选中: {date.format('YYYY-MM-DD HH:mm:ss')}</p>}
    </>
  );
};
```

### 场景 6: 自定义渲染和国际化

```tsx
import { useState } from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, Dayjs } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const cellRender: DatePickerProps['cellRender'] = (date, info) => {
    if (date.date() === 1) {
      return <div className="special">1st</div>;
    }
    return info.originNode;
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <DatePicker cellRender={cellRender} placeholder="自定义样式" />

      <DatePicker locale={locale} placeholder="中文模式" />

      <DatePicker allowClear={false} placeholder="无清除按钮" />

      <DatePicker inputReadOnly placeholder="只读模式" />
    </Space>
  );
};
```

## 使用建议

需要同时选择日期和时间时使用 `showTime`；日期范围选择使用 `RangePicker`；使用 dayjs 处理日期值；格式化使用 dayjs 格式字符串；禁用特定日期使用 `disabledDate` 函数；预设范围提升用户体验；受控选择使用 `value` + `onChange`；在 Form 中配合 `Form.Item` 使用。

## 示例代码

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const { RangePicker } = DatePicker;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="year" />
    <RangePicker />
    <DatePicker showTime onChange={onChange} />
  </Space>
);
```

## 返回结果

渲染一个日期选择器，支持日期、周、月、年、时间等选择模式。
