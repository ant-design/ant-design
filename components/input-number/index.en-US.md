---
category: Components
chinese: 数字输入框
type: Form Controls
english: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When to use

When a numeric value needs to be provided.

## API

| property    | description           | type               | default       |
|-------------|----------------|--------------------|--------------|
| min     | min value   | Number | -Infinity        |
| max     | max vale       | Number      | Infinity           |
| value     | current value       | Number      |            |
| step     | The number to which the current value is increased or decreased. It can be an integer or decimal.  | Number or String      |  1      |
| defaultValue     | initial value       | Number      |            |
| onChange     | The callback triggered when the value is changed.     | Function      |            |
| disabled     | disable the input       | Boolean      |      false      |
| size    | width of input box  | String      |      none      |
