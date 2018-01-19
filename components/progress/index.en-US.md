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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| format | template function of the content | function(percent) | `percent => percent + '%'` |
| gapDegree `(type=circle)` | the gap degree of half circle, 0 ~ 360 | number | 0 |
| gapPosition `(type=circle)` | the gap position, options: `top` `bottom` `left` `right` | string | `top` |
| percent | to set the completion percentage | number | 0 |
| showInfo | whether to display the progress value and the status icon | boolean | true |
| status | to set the status of the Progress, options: `success` `exception` `active` | string | - |
| strokeWidth `(type=line)` | to set the width of the progress bar, unit: `px` | number | 10 |
| strokeWidth `(type=circle)` | to set the width of the circular progress bar, unit: percentage of the canvas width | number | 6 |
| type | to set the type, options: `line` `circle` `dashboard` | string | `line` |
| width `(type=circle)` | to set the canvas width of the circular progress bar, unit: `px` | number | 132 |
| successPercent | segmented success percent, works when `type="line"` | number | 0 |
