---
category: Components
type: Views
title: Progress
---

To display the current progress of an operation flow.

## When to use

If it will take a long time to complete the operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## API

Property | Description | Type | Default
-----|-----|-----|------
type | to set the type, options: `line` `circle` | String | line
percent | to set the completion percentage | Number | 0
format | template function of the content | function(percent) | `percent => percent + '%'`
status | to set the status of the progress, options: `success` `exception` `active` | String | -
showInfo | determine whether to display the progress value and the status icon | Boolean | true
strokeWidth `(type=line)` | to set the width of the progress bar, unit: `px` | Number | 10
strokeWidth `(type=circle)` | to set the width of the circular progress bar, unit: percentage of the canvas width | Number | 6
width `(type=circle)` | to set the canvas width of the circular progress bar, unit: `px` | Number | 132

