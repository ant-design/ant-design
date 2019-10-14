---
category: Components
type: Data Display
title: Statistic
---

Display statistic number.

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## API

#### Statistic

| Property         | Description                   | Type                 | Default | Version |
| ---------------- | ----------------------------- | -------------------- | ------- | ------- |
| decimalSeparator | decimal separator             | string               | .       | 3.13.0  |
| formatter        | customize value display logic | (value) => ReactNode | -       | 3.13.0  |
| groupSeparator   | group separator               | string               | ,       | 3.13.0  |
| precision        | precision of input value      | number               | -       | 3.13.0  |
| prefix           | prefix node of value          | string \| ReactNode  | -       | 3.13.0  |
| suffix           | suffix node of value          | string \| ReactNode  | -       | 3.13.0  |
| title            | Display title                 | string \| ReactNode  | -       | 3.13.0  |
| value            | Display value                 | string \| number     | -       | 3.13.0  |
| valueStyle       | Set value css style           | style                | -       | 3.13.0  |

#### Statistic.Countdown

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Format as [moment](http://momentjs.com/) | string | 'HH:mm:ss' | 3.13.0 |
| onFinish | Trigger when time's up | () => void | - | 3.14.0 |
| prefix | prefix node of value | string \| ReactNode | - | 3.13.0 |
| suffix | suffix node of value | string \| ReactNode | - | 3.13.0 |
| title | Display title | string \| ReactNode | - | 3.13.0 |
| value | Set target countdown time | number \| moment | - | 3.13.0 |
| valueStyle | Set value css style | style | - | 3.13.0 |
