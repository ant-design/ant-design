---
category: Components
group: Data Display
title: Statistic
description: Display statistic number.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/unit.tsx">Unit</code>
<code src="./demo/animated.tsx">Animated number</code>
<code src="./demo/card.tsx" background="grey">In Card</code>
<code src="./demo/timer.tsx" version="5.25.0">Timer</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

#### Statistic

| Property         | Description                   | Type                 | Default | Version |
| ---------------- | ----------------------------- | -------------------- | ------- | ------- |
| decimalSeparator | The decimal separator         | string               | `.`     |         |
| formatter        | Customize value display logic | (value) => ReactNode | -       |         |
| groupSeparator   | Group separator               | string               | `,`     |         |
| loading          | Loading status of Statistic   | boolean              | false   | 4.8.0   |
| precision        | The precision of input value  | number               | -       |         |
| prefix           | The prefix node of value      | ReactNode            | -       |         |
| suffix           | The suffix node of value      | ReactNode            | -       |         |
| title            | Display title                 | ReactNode            | -       |         |
| value            | Display value                 | string \| number     | -       |         |
| valueStyle       | Set value section style       | CSSProperties        | -       |         |

#### Statistic.Countdown <Badge type="error">Deprecated</Badge>

<Antd component="Alert" title="When using version >= 5.25.0, Please use Statistic.Timer instead." type="warning" banner="true"></Antd>

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Format as [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | The prefix node of value | ReactNode | - |  |
| suffix | The suffix node of value | ReactNode | - |  |
| title | Display title | ReactNode | - |  |
| value | Set target countdown time | number | - |  |
| valueStyle | Set value section style | CSSProperties | - |  |
| onFinish | Trigger when time's up | () => void | - |  |
| onChange | Trigger when time's changing | (value: number) => void | - | 4.16.0 |

#### Statistic.Timer <Badge>5.25.0+</Badge>

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | time counter down or up | `countdown` `countup` | - |  |
| format | Format as [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | The prefix node of value | ReactNode | - |  |
| suffix | The suffix node of value | ReactNode | - |  |
| title | Display title | ReactNode | - |  |
| value | Set target countdown time | number | - |  |
| valueStyle | Set value section style | CSSProperties | - |  |
| onFinish | Trigger when time's up, only to be called when type is `countdown` | () => void | - |  |
| onChange | Trigger when time's changing | (value: number) => void | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Statistic"></ComponentTokenTable>
