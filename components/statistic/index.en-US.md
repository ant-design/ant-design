---
category: Components
type: Data Display
title: Statistic
cover: https://gw.alipayobjects.com/zos/antfincdn/rcBNhLBrKbE/Statistic.svg
---

Display statistic number.

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## API

#### Statistic

| Property         | Description                   | Type                 | Default | Version |
| ---------------- | ----------------------------- | -------------------- | ------- | ------- |
| decimalSeparator | The decimal separator         | string               | `.`     |         |
| formatter        | Customize value display logic | (value) => ReactNode | -       |         |
| groupSeparator   | Group separator               | string               | `,`     |         |
| precision        | The precision of input value  | number               | -       |         |
| prefix           | The prefix node of value      | string \| ReactNode  | -       |         |
| suffix           | The suffix node of value      | string \| ReactNode  | -       |         |
| title            | Display title                 | string \| ReactNode  | -       |         |
| value            | Display value                 | string \| number     | -       |         |
| valueStyle       | Set value css style           | CSSProperties        | -       |         |

#### Statistic.Countdown

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Format as [moment](http://momentjs.com/) | string | `HH:mm:ss` |  |
| onFinish | Trigger when time's up | () => void | - |  |
| prefix | The prefix node of value | string \| ReactNode | - |  |
| suffix | The suffix node of value | string \| ReactNode | - |  |
| title | Display title | string \| ReactNode | - |  |
| value | Set target countdown time | number \| moment | - |  |
| valueStyle | Set value css style | CSSProperties | - |  |
