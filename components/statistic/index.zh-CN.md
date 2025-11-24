---
category: Components
group: 数据展示
title: Statistic
subtitle: 统计数值
description: 展示统计数值。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/unit.tsx">单位</code>
<code src="./demo/animated.tsx">动画效果</code>
<code src="./demo/card.tsx" background="grey">在卡片中使用</code>
<code src="./demo/timer.tsx" version="5.25.0">计时器</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

#### Statistic

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义 Statistic 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| decimalSeparator | 设置小数点 | string | `.` |  |
| formatter | 自定义数值展示 | (value) => ReactNode | - |  |
| groupSeparator | 设置千分位标识符 | string | `,` |  |
| loading | 数值是否加载中 | boolean | false | 4.8.0 |
| precision | 数值精度 | number | - |  |
| prefix | 设置数值的前缀 | ReactNode | - |  |
| styles | 用于自定义 Statistic 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties> | - |  |
| suffix | 设置数值的后缀 | ReactNode | - |  |
| title | 数值的标题 | ReactNode | - |  |
| value | 数值内容 | string \| number | - |  |
| valueStyle | 设置数值区域的样式 | CSSProperties | - |  |

#### Statistic.Countdown <Badge type="error">Deprecated</Badge>

<Antd component="Alert" title="版本 >= 5.25.0 时请使用 Statistic.Timer 作为替代方案。" type="warning" banner="true"></Antd>

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | 设置数值的前缀 | ReactNode | - |  |
| suffix | 设置数值的后缀 | ReactNode | - |  |
| title | 数值的标题 | ReactNode | - |  |
| value | 数值内容 | number | - |  |
| valueStyle | 设置数值区域的样式 | CSSProperties | - |  |
| onFinish | 倒计时完成时触发 | () => void | - |  |
| onChange | 倒计时时间变化时触发 | (value: number) => void | - |  |

#### Statistic.Timer <Badge>5.25.0+</Badge>

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 计时类型，正计时或者倒计时 | `countdown` `countup` | - |  |
| format | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | 设置数值的前缀 | ReactNode | - |  |
| suffix | 设置数值的后缀 | ReactNode | - |  |
| title | 数值的标题 | ReactNode | - |  |
| value | 数值内容 | number | - |  |
| valueStyle | 设置数值区域的样式 | CSSProperties | - |  |
| onFinish | 倒计时完成时触发, 指定为 `countup` 此属性不生效 | () => void | - |  |
| onChange | 倒计时时间变化时触发 | (value: number) => void | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Statistic"></ComponentTokenTable>
