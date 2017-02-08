---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| property    | description           | type               | default       |
|-------------|----------------|--------------------|--------------|
| min     | min value   | number | -Infinity        |
| max     | max vale       | number      | Infinity           |
| value     | current value       | number      |            |
| step     | The number to which the current value is increased or decreased. It can be an integer or decimal.  | number\|string      |  1      |
| defaultValue     | initial value       | number      |            |
| onChange     | The callback triggered when the value is changed.     | Function(value) |            |
| disabled     | disable the input       | boolean      |      false      |
| size    | width of input box  | string      |      none      |
