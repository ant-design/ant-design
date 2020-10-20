---
category: Components
type: Feedback
title: Progress
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
---

Display the current progress of an operation flow.

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

Properties that shared by all types.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | To set the type, options: `line` `circle` `dashboard` | string | `line` |
| format | The template function of the content | function(percent, successPercent) | (percent) => percent + `%` |
| percent | To set the completion percentage | number | 0 |
| showInfo | Whether to display the progress value and the status icon | boolean | true |
| status | To set the status of the Progress, options: `success` `exception` `normal` `active`(line only) | string | - |
| strokeLinecap | To set the style of the progress linecap | `round` \| `square` | `round` |
| strokeColor | The color of progress bar | string | - |
| trailColor | The color of unfilled part | string | - |
| success | Configs of successfully progress bar | { percent: number, strokeColor: string } | - |

### `type="line"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| strokeWidth | To set the width of the progress bar, unit: `px` | number | 10 |
| strokeColor | The color of progress bar, render `linear-gradient` when passing an object | string \| { from: string; to: string; direction: string } | - |
| steps | The total step count | number | - |

### `type="circle"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | To set the canvas width of the circular progress, unit: `px` | number | 132 |
| strokeWidth | To set the width of the circular progress, unit: percentage of the canvas width | number | 6 |
| strokeColor | The color of circular progress, render `linear-gradient` when passing an object | string \| object | - |

### `type="dashboard"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | To set the canvas width of the dashboard progress, unit: `px` | number | 132 |
| strokeWidth | To set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 |
| gapDegree | The gap degree of half circle, 0 ~ 295 | number | 75 |
| gapPosition | The gap position, options: `top` `bottom` `left` `right` | string | `bottom` |
