---
category: Components
type: Form Controls
title: Slider
---

A Slider component for displaying current value and intervals in range.

## When to use

To input a value in a range.

## API

| Property     | Description           | Type     | Default       |
|------------|----------------|-------------|--------------|
| range          | dual thumb mode | Boolean          | false
| min            | The minimum value the slider can slide to. | Number			| 0
| max            | The maximum value the slider can slide to | Number			| 100
| step           | The granularity the slider can step through values. Must greater than 0, and be devided by (max - min) . When  `marks` no null, `step` can be `null`. | Number or null	| 1
| marks          | Tick mark of Slider, type of key must be `Number`, and must in closed interva [min, max] ，each mark can declare its own style. | Object{} | Object{Number: String or React.Component} or Object{Number: { style, label}}
| dots           | Whether the thumb can drag over tick only. | Boolean | false
| value          | The value of slider. When `range` is `false`, use `Number`, otherwise, use `[Number, Number]`   | Number or [Number, Number] |
| defaultValue   | The default value of slider. When `range` is `false`, use `Number`, otherwise, use `[Number, Number]`   | Number or [Number, Number] | 0 or [0, 0]
| included       | Make effect when `marks` not null，`true` means containment and `false` means coordinative | Boolean			 | true
| disabled       | If true, the slider will not be interactable. | Boolean 			| false
| onChange       | Callback function that is fired when the user changes the slider's value. | Function | NOOP
| onAfterChange  | Fire when  `onmouseup` is fired. | Function        | NOOP
| tipFormatter   | Slider will pass its value to `tipFormatter`, and display its value in Tooltip, and hide Tooltip when return value is null. | Function or null | IDENTITY
