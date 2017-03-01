---
category: Components
type: Feedback
title: Progress
---

To display the current progress of an operation flow.

## When To Use

If it will take a long time to complete the operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

Property | Description | Type | Default
-----|-----|-----|------
type | to set the type, options: `line` `circle` | string | line
percent | to set the completion percentage | number | 0
format | template function of the content | function(percent) | `percent => percent + '%'`
status | to set the status of the progress, options: `success` `exception` `active` | string | -
showInfo | determine whether to display the progress value and the status icon | boolean | true
strokeWidth `(type=line)` | to set the width of the progress bar, unit: `px` | number | 10
strokeWidth `(type=circle)` | to set the width of the circular progress bar, unit: percentage of the canvas width | number | 6
width `(type=circle)` | to set the canvas width of the circular progress bar, unit: `px` | number | 132

