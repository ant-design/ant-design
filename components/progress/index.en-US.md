---
category: Components
type: Feedback
title: Progress
---

Display the current progress of an operation flow.

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

Properties that shared by all types.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | to set the type, options: `line` `circle` `dashboard` | string | `line` |  |
| format | template function of the content | function(percent, successPercent) | `percent => percent + '%'` |  |
| percent | to set the completion percentage | number | 0 |  |
| showInfo | whether to display the progress value and the status icon | boolean | true |  |
| status | to set the status of the Progress, options: `success` `exception` `normal` `active`(line only) | string | - |  |
| strokeLinecap | to set the style of the progress linecap | Enum{ 'round', 'square' } | `round` | 3.8.0 |
| strokeColor | color of progress bar | string | - | 3.7.0 |
| successPercent | segmented success percent | number | 0 | 3.2.0 |

### `type="line"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| strokeWidth | to set the width of the progress bar, unit: `px` | number | 10 | 3.13.1 |
| strokeColor | color of progress bar, render `linear-gradient` when passing an object | string \| { from: string; to: string; direction: string } | - | 3.16.0 |

### `type="circle"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| width | to set the canvas width of the circular progress, unit: `px` | number | 132 | 3.13.1 |
| strokeWidth | to set the width of the circular progress, unit: percentage of the canvas width | number | 6 | 3.13.1 |
| strokeColor | color of circular progress, render `linear-gradient` when passing an object | string \| object | - | 3.19.8 |

### `type="dashboard"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| width | to set the canvas width of the dashboard progress, unit: `px` | number | 132 | 3.13.1 |
| strokeWidth | to set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 | 3.13.1 |
| gapDegree | the gap degree of half circle, 0 ~ 360 | number | 0 | 3.13.1 |
| gapPosition | the gap position, options: `top` `bottom` `left` `right` | string | `top` | 3.13.1 |
