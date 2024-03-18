---
category: Components
group: 数据录入
title: DatePicker
subtitle: 日期选择框
description: 输入或选择日期的控件。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*qK9mRqFnBbAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wz1QTJSQgmAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/range-picker.tsx">范围选择器</code>
<code src="./demo/multiple.tsx" version="5.14.0">多选</code>
<code src="./demo/multiple-debug.tsx" debug>多选 Debug</code>
<code src="./demo/needConfirm.tsx" version="5.14.0">选择确认</code>
<code src="./demo/switchable.tsx">切换不同的选择器</code>
<code src="./demo/format.tsx">日期格式</code>
<code src="./demo/time.tsx">日期时间选择</code>
<code src="./demo/mask.tsx" version="5.14.0">格式对齐</code>
<code src="./demo/date-range.tsx" version="5.14.0">日期限定范围</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/disabled-date.tsx">不可选择日期和时间</code>
<code src="./demo/allow-empty.tsx">允许留空</code>
<code src="./demo/select-in-range.tsx">选择不超过七天的范围</code>
<code src="./demo/preset-ranges.tsx">预设范围</code>
<code src="./demo/extra-footer.tsx">额外的页脚</code>
<code src="./demo/size.tsx">三种大小</code>
<code src="./demo/cell-render.tsx">定制单元格</code>
<code src="./demo/components.tsx" version="5.14.0">定制面板</code>
<code src="./demo/buddhist-era.tsx" version="5.14.0">佛历格式</code>
<code src="./demo/status.tsx">自定义状态</code>
<code src="./demo/variant.tsx" version="5.13.0">多种形态</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/placement.tsx">弹出位置</code>
<code src="./demo/mode.tsx" debug>受控面板</code>
<code src="./demo/start-end.tsx" debug>自定义日期范围选择</code>
<code src="./demo/suffix.tsx" debug>后缀图标</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

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

<!-- prettier-ignore -->
:::warning
在搭配 Next.js 的 App Router 使用时，注意在引入 dayjs 的 locale 文件时加上 `'use client'`。这是由于 Ant Design 的组件都是客户端组件，在 RSC 中引入 dayjs 的 locale 文件将不会在客户端生效。
:::

```jsx
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';

<DatePicker locale={locale} />;
```

```jsx
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// 确保还导入相关的 dayjs 文件，否则所有文本的区域设置都不会更改（例如范围选择器月份）
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

### 共同的 API

以下 API 为 DatePicker、 RangePicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 自定义清除按钮 | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: 支持对象类型 |
| autoFocus | 自动获取焦点 | boolean | false |  |
| className | 选择器 className | string | - |  |
| dateRender | 自定义日期单元格的内容，5.4.0 起用 `cellRender` 代替 | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| cellRender | 自定义单元格的内容 | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| components | 自定义面板 | Record<Panel \| 'input', React.ComponentType> | - | 5.14.0 |
| disabled | 禁用 | boolean | false |  |
| disabledDate | 不可选择的日期 | (currentDate: dayjs, info: { from?: dayjs }) => boolean | - | `info`: 5.14.0 |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。示例：[自定义格式](#components-date-picker-demo-format) | [formatType](#formattype) | [rc-picker](https://github.com/react-component/picker/blob/f512f18ed59d6791280d1c3d7d37abbb9867eb0b/src/utils/uiUtil.ts#L155-L177) |  |
| order | 多选、范围时是否自动排序 | boolean | true | 5.14.0 |
| preserveInvalidOnBlur | 失去焦点是否要清空输入框内无效内容 | boolean | false | 5.14.0 |
| popupClassName | 额外的弹出日历 className | string | - | 4.23.0 |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |  |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |  |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| minDate | 最小日期，同样会限制面板的切换范围 | dayjs | - | 5.14.0 |
| maxDate | 最大日期，同样会限制面板的切换范围 | dayjs | - | 5.14.0 |
| mode | 日期面板的状态（[设置后无法选择年份/月份？](/docs/react/faq#当我指定了-datepickerrangepicker-的-mode-属性后点击后无法选择年份月份)） | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| needConfirm | 是否需要确认按钮，为 `false` 时失去焦点即代表选择。当设置 `multiple` 时默认为 `false` | boolean | - | 5.14.0 |
| nextIcon | 自定义下一个图标 | ReactNode | - | 4.17.0 |
| open | 控制弹层是否展开 | boolean | - |  |
| panelRender | 自定义渲染面板 | (panelNode) => ReactNode | - | 4.5.0 |
| picker | 设置选择器类型 | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | 输入框提示文字 | string \| \[string, string] | - |  |
| placement | 选择框弹出的位置 | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| popupStyle | 额外的弹出日历样式 | CSSProperties | {} |  |
| prevIcon | 自定义上一个图标 | ReactNode | - | 4.17.0 |
| presets | 预设时间范围快捷选择, 自 `5.8.0` 起 value 支持函数返回值 | { label: React.ReactNode, value: Dayjs \| (() => Dayjs) }\[] | - |  |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `large` \| `middle` \| `small` | - |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| style | 自定义输入框样式 | CSSProperties | {} |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - |  |
| superNextIcon | 自定义 `>>` 切换图标 | ReactNode | - | 4.17.0 |
| superPrevIcon | 自定义 `<<` 切换图标 | ReactNode | - | 4.17.0 |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` | `outlined` | 5.13.0 |
| onOpenChange | 弹出日历和关闭日历的回调 | function(open) | - |  |
| onPanelChange | 日历面板切换的回调 | function(value, mode) | - |  |

### 共同的方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultPickerValue | 默认面板日期，每次面板打开时会被重置到该日期 | [dayjs](https://day.js.org/) | - | 5.14.0 |
| defaultValue | 默认日期，如果开始时间或结束时间为 `null` 或者 `undefined`，日期范围将是一个开区间 | [dayjs](https://day.js.org/) | - |  |
| disabledTime | 不可选择的时间 | function(date) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY-MM-DD` |  |
| multiple | 是否为多选，不支持 `showTime` | boolean | false | 5.14.0 |
| pickerValue | 面板日期，可以用于受控切换面板所在日期。配合 `onPanelChange` 使用。 | [dayjs](https://day.js.org/) | - | 5.14.0 |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - |  |
| showNow | 显示当前日期时间的快捷选择 | boolean | - |  |
| showTime | 增加时间选择功能 | Object \| boolean | [TimePicker Options](/components/time-picker-cn#api) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showWeek | DatePicker 下展示当前周 | boolean | false | 5.14.0 |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调 | function(date: dayjs, dateString: string) | - |  |
| onOk | 点击确定按钮的回调 | function() | - |  |
| onPanelChange | 日期面板变化时的回调 | function(value, mode) | - |  |

### DatePicker\[picker=year]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY` |  |
| multiple | 是否为多选 | boolean | false | 5.14.0 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=quarter]

`4.1.0` 新增。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY-\QQ` |  |
| multiple | 是否为多选 | boolean | false | 5.14.0 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=month]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY-MM` |  |
| multiple | 是否为多选 | boolean | false | 5.14.0 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=week]

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY-wo` |  |
| multiple | 是否为多选 | boolean | false | 5.14.0 |
| renderExtraFooter | 在面板中添加额外的页脚 | (mode) => React.ReactNode | - |  |
| value | 日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: dayjs, dateString: string) | - |  |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowEmpty | 允许起始项部分为空 | \[boolean, boolean] | \[false, false] |  |
| cellRender | 自定义单元格的内容。 | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| dateRender | 自定义日期单元格的内容，5.4.0 起用 `cellRender` 代替 | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| defaultPickerValue | 默认面板日期，每次面板打开时会被重置到该日期 | [dayjs](https://day.js.org/)[] | - | 5.14.0 |
| defaultValue | 默认日期 | [dayjs](https://day.js.org/)\[] | - |  |
| disabled | 禁用起始项 | \[boolean, boolean] | - |  |
| disabledTime | 不可选择的时间 | function(date: dayjs, partial: `start` \| `end`) | - |  |
| format | 展示的日期格式，配置参考 [dayjs#format](https://day.js.org/docs/zh-CN/display/format#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%8D%A0%E4%BD%8D%E7%AC%A6%E5%88%97%E8%A1%A8)。 | [formatType](#formattype) | `YYYY-MM-DD HH:mm:ss` |  |
| id | 设置输入框 `id` 属性。 | { start?: string, end?: string } | - | 5.14.0 |
| pickerValue | 面板日期，可以用于受控切换面板所在日期。配合 `onPanelChange` 使用。 | [dayjs](https://day.js.org/)[] | - | 5.14.0 |
| presets | 预设时间范围快捷选择，自 `5.8.0` 起 value 支持函数返回值 | { label: React.ReactNode, value: (Dayjs \| (() => Dayjs))\[] }\[] | - |  |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |  |
| separator | 设置分隔符 | React.ReactNode | `<SwapRightOutlined />` |  |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker-cn#api) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | 日期 | [dayjs](https://day.js.org/)\[] | - |  |
| onCalendarChange | 待选日期发生变化的回调。`info` 参数自 4.4.0 添加 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | 日期范围发生变化的回调 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string]) | - |  |
| onFocus | 聚焦时回调 | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |
| onBlur | 失焦时回调 | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |

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

注意：`type` 定义为 `5.14.0` 新增。

## 主题变量（Design Token）

<ComponentTokenTable component="DatePicker"></ComponentTokenTable>

## FAQ

### 当我指定了 DatePicker/RangePicker 的 mode 属性后，点击后无法选择年份/月份？

请参考[常见问答](/docs/react/faq#当我指定了-datepickerrangepicker-的-mode-属性后点击后无法选择年份月份)

### 为何日期选择年份后返回的是日期面板而不是月份面板？

当用户选择完年份后，系统会直接切换至日期面板，而非显式提供月份选择。这样做的设计在于用户只需进行一次点击即可完成年份修改，无需再次点击进入月份选择界面，从而减少了用户的操作负担，同时也避免需要额外感知月份的记忆负担。

### 如何在 DatePicker 中使用自定义日期库（如 Moment.js ）？

请参考[《使用自定义日期库》](/docs/react/use-custom-date-library#datepicker)

### 为什么时间类组件的国际化 locale 设置不生效？

参考 FAQ [为什么时间类组件的国际化 locale 设置不生效？](/docs/react/faq#为什么时间类组件的国际化-locale-设置不生效)。

### 如何修改周的起始日？

请使用正确的[语言包](/docs/react/i18n-cn)（[#5605](https://github.com/ant-design/ant-design/issues/5605)），或者修改 dayjs 的 `locale` 配置：<https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx>

```js
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
```

### 为何使用 `panelRender` 时，原来面板无法切换？

当你通过 `panelRender` 动态改变层级结构时，会使得原本的 Panel 被当做新的节点删除并创建。这使得其原本的状态会被重置，保持结构稳定即可。详情请参考 [#27263](https://github.com/ant-design/ant-design/issues/27263)。
