---
category: Components
type: 数据录入
title: DatePicker
subtitle: 日期选择框
cover: https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

日期类组件包括以下五种形式。

- DatePicker
- DatePicker\[picker="month"]
- DatePicker\[picker="week"]
- DatePicker\[picker="year"]
- DatePicker\[picker="quarter"] (4.1.0 新增)
- RangePicker

### 国际化配置

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：[ConfigProvider 国际化](https://ant.design/components/config-provider-cn/)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。

```jsx
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

```jsx
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

### 共同的 API

以下 API 为 DatePicker、 RangePicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |  |
| autoFocus | 自动获取焦点 | boolean | false |  |
| className | 选择器 className | string | - |  |
| dateRender | 自定义日期单元格的内容 | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - |  |
| disabled | 禁用 | boolean | false |  |
| disabledDate | 不可选择的日期 | (currentDate: dayjs) => boolean | - |  |
| dropdownClassName | 额外的弹出日历 className | string | - |  |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |  |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | 日期面板的状态（[设置后无法选择年份/月份？](/docs/react/faq#当我指定了-DatePicker/RangePicker-的-mode-属性后，点击后无法选择年份/月份？)） | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| open | 控制弹层是否展开 | boolean | - |  |
| panelRender | 自定义渲染面板 | (panelNode) => ReactNode | - | 4.5.0 |
| picker | 设置选择器类型 | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | 输入框提示文字 | string \| \[string, string] | - |  |
| popupStyle | 额外的弹出日历样式 | CSSProperties | {} |  |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `large` \| `middle` \| `small` | - |  |
| bordered | 是否有边框 | boolean | true |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - |  |
| style | 自定义输入框样式 | CSSProperties | {} |  |
| onOpenChange | 弹出日历和关闭日历的回调 | function(open) | - |  |
| onPanelChange | 日历面板切换的回调 | function(value, mode) | - |  |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |  |

### 共同的方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期，如果开始时间或结束时间为 `null` 或者 `undefined`，日期范围将是一个开区间 | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| disabledTime | 不可选择的时间 | function(date) | - |  |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [dayjs.js](https://day.js.org/) | string \| string[] | `YYYY-MM-DD` |  |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - |  |
| showTime | 增加时间选择功能 | Object \| boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showToday | 是否展示“今天”按钮 | boolean | true |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调 | function(date: dayjs, dateString: string) | - |  |
| onOk | 点击确定按钮的回调 | function() | - |  |
| onPanelChange | 日期面板变化时的回调 | function(value, mode) | - |  |
| showNow | 当设定了 `showTime` 的时候，面板是否显示“此刻”按钮 | boolean | - | 4.4.0 |

### DatePicker\[picker=year]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs.js](https://day.js.org/) | string | `YYYY` |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=quarter]

`4.1.0` 新增。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs.js](https://day.js.org/) | string | `YYYY-\QQ` |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=month]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs.js](https://day.js.org/) | string | `YYYY-MM` |  |
| monthCellRender | 自定义的月份内容渲染方法 | function(date, locale): ReactNode | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=week]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs.js](https://day.js.org/) | string | `YYYY-wo` |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - |  |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowEmpty | 允许起始项部分为空 | \[boolean, boolean] | \[false, false] |  |
| dateRender | 自定义日期单元格的内容。`info` 参数自 4.3.0 添加 | function(currentDate: dayjs, today: dayjs, info: { range: `start` \| `end` }) => React.ReactNode | - |  |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/)\[] | - |  |
| defaultPickerValue | 默认面板日期 | [dayjs](https://day.js.org/)\[] | - |  |
| disabled | 禁用起始项 | \[boolean, boolean] | - |  |
| disabledTime | 不可选择的时间 | function(date: dayjs, partial: `start` \| `end`) | - |  |
| format | 展示的日期格式 | string | `YYYY-MM-DD HH:mm:ss` |  |
| ranges | 预设时间范围快捷选择 | { \[range: string]: [dayjs](https://day.js.org/)\[] } \| { \[range: string]: () => [dayjs](https://day.js.org/)\[] } | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| separator | 设置分隔符 | string | `~` |  |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | 日期 | [dayjs](https://day.js.org/)\[] | - |  |
| onCalendarChange | 待选日期发生变化的回调。`info` 参数自 4.4.0 添加 | function(dates: \[dayjs, dayjs\], dateStrings: \[string, string\], info: { range:`start`\|`end` }) | - |  |
| onChange | 日期范围发生变化的回调 | function(dates: \[dayjs, dayjs\], dateStrings: \[string, string\]) | - |  |

## FAQ

### 当我指定了 DatePicker/RangePicker 的 mode 属性后，点击后无法选择年份/月份？

请参考[常见问答](/docs/react/faq#当我指定了-DatePicker/RangePicker-的-mode-属性后，点击后无法选择年份/月份？)

### 如何在 DatePicker 中使用自定义日期库（如 dayjs ）？

请参考[《替换 dayjs.js》](/docs/react/replace-dayjs#DatePicker)

### 为何全局修改 dayjs.locale 不生效？

v4 中，DatePicker 默认 `locale` 为 `en`。你可以通过 DatePicker 的 `locale` 属性来单独设置，也可以通过 [ConfigProvider `locale`](/components/config-provider) 属性来配置。

### 如何修改周的起始日？

请使用正确的[语言包](/docs/react/i18n)（[#5605](https://github.com/ant-design/ant-design/issues/5605)），或者修改 dayjs 的 `locale` 配置：https://codesandbox.io/s/dayjs-day-of-week-6dby5

```js
dayjs.locale('en', {
  // 注意请修改你正在使用的 locale 语言，比如 zh-cn
  week: {
    dow: 1,
  },
});
```
