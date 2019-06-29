---
category: Components
type: Data Entry
title: Slider
---

A Slider component for displaying current value and intervals in range.

## When To Use

To input a value in a range.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| defaultValue | The default value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]` | number\|number\[] | 0 or \[0, 0] | 3.0.0 |
| disabled | If true, the slider will not be interactable. | boolean | false | 3.0.0 |
| dots | Whether the thumb can drag over tick only. | boolean | false | 3.0.0 |
| included | Make effect when `marks` not null, `true` means containment and `false` means coordinative | boolean | true | 3.0.0 |
| marks | Tick mark of Slider, type of key must be `number`, and must in closed interval \[min, max], each mark can declare its own style. | object | { number: string\|ReactNode } or { number: { style: object, label: string\|ReactNode } } | 3.0.0 |
| max | The maximum value the slider can slide to | number | 100 | 3.0.0 |
| min | The minimum value the slider can slide to. | number | 0 | 3.0.0 |
| range | dual thumb mode | boolean | false | 3.0.0 |
| step | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When `marks` no null, `step` can be `null`. | number\|null | 1 | 3.0.0 |
| tipFormatter | Slider will pass its value to `tipFormatter`, and display its value in Tooltip, and hide Tooltip when return value is null. | Function\|null | IDENTITY | 3.0.0 |
| value | The value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]` | number\|number\[] | 3.0.0 |
| vertical | If true, the slider will be vertical. | Boolean | false | 3.0.0 |
| onAfterChange | Fire when `onmouseup` is fired. | Function(value) | NOOP | 3.0.0 |
| onChange | Callback function that is fired when the user changes the slider's value. | Function(value) | NOOP | 3.0.0 |
| tooltipPlacement | Set Tooltip display position. Ref [`Tooltip`](/components/tooltip/). | string |  | 3.19.0 |
| tooltipVisible | If true, Tooltip will show always, or it will not show anyway, even if dragging or hovering. | Boolean |  | 3.11.0 |
| getTooltipPopupContainer | The DOM container of the Tooltip, the default behavior is to create a div element in body. | Function | () => document.body | 3.19.0 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
