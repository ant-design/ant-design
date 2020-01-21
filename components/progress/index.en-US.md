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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | to set the type, options: `line` `circle` `dashboard` | string | `line` |
| format | template function of the content | function(percent, successPercent) | `percent => percent + '%'` |
| percent | to set the completion percentage | number | 0 |
| showInfo | whether to display the progress value and the status icon | boolean | true |
| status | to set the status of the Progress, options: `success` `exception` `normal` `active`(line only) | string | - |
| strokeLinecap | to set the style of the progress linecap | `round` \| `square` | `round` |
| strokeColor | color of progress bar | string | - |
| successPercent | segmented success percent | number | 0 |

### `type="line"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| strokeWidth | to set the width of the progress bar, unit: `px` | number | 10 |
| strokeColor | color of progress bar, render `linear-gradient` when passing an object | string \| { from: string; to: string; direction: string } | - |
| steps | the total step count | number | - |

### `type="circle"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | to set the canvas width of the circular progress, unit: `px` | number | 132 |
| strokeWidth | to set the width of the circular progress, unit: percentage of the canvas width | number | 6 |
| strokeColor | color of circular progress, render `linear-gradient` when passing an object | string \| object | - |

### `type="dashboard"`

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | to set the canvas width of the dashboard progress, unit: `px` | number | 132 |
| strokeWidth | to set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 |
| gapDegree | the gap degree of half circle, 0 ~ 360 | number | 0 |
| gapPosition | the gap position, options: `top` `bottom` `left` `right` | string | `top` |
