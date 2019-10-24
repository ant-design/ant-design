---
category: Components
type: Data Entry
title: Slider
---

A Slider component for displaying current value and intervals in range.

## When To Use

To input a value in a range.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |  |
| defaultValue | The default value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]` | number\|number\[] | 0 or \[0, 0] |  |
| disabled | If true, the slider will not be interactable. | boolean | false |  |
| dots | Whether the thumb can drag over tick only. | boolean | false |  |
| included | Make effect when `marks` not null, `true` means containment and `false` means coordinative | boolean | true |  |
| marks | Tick mark of Slider, type of key must be `number`, and must in closed interval \[min, max], each mark can declare its own style. | object | { number: string\|ReactNode } or { number: { style: object, label: string\|ReactNode } } |  |
| max | The maximum value the slider can slide to | number | 100 |  |
| min | The minimum value the slider can slide to. | number | 0 |  |
| range | dual thumb mode | boolean | false |  |
| reverse | reverse the component | boolean | false | 3.24.0 |
| step | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When `marks` no null, `step` can be `null`. | number\|null | 1 |  |
| tipFormatter | Slider will pass its value to `tipFormatter`, and display its value in Tooltip, and hide Tooltip when return value is null. | Function\|null | IDENTITY |  |
| value | The value of slider. When `range` is `false`, use `number`, otherwise, use `[number, number]` | number\|number\[] |  |
| vertical | If true, the slider will be vertical. | Boolean | false |  |
| onAfterChange | Fire when `onmouseup` is fired. | Function(value) | NOOP |  |
| onChange | Callback function that is fired when the user changes the slider's value. | Function(value) | NOOP |  |
| tooltipPlacement | Set Tooltip display position. Ref [`Tooltip`](/components/tooltip/). | string |  | 3.19.0 |
| tooltipVisible | If true, Tooltip will show always, or it will not show anyway, even if dragging or hovering. | Boolean |  | 3.11.0 |
| getTooltipPopupContainer | The DOM container of the Tooltip, the default behavior is to create a div element in body. | Function | () => document.body | 3.19.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |
