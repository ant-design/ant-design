---
category: Components
chinese: 数字输入框
type: Form Controls
english: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When to use

When you are required to obtain a standard number.

## API

Property, e.g.

| member        | description           | type               | default       |
|-------------|----------------|--------------------|--------------|
| min     | min value   | Number | -Infinity        |
| max     | max vale       | Number      | Infinity           |
| value     | current value       | Number      |            |
| step     | the range that value is changed each time, it can be a decimal  | Number or String      |  1      |
| defaultValue     | initial value       | Number      |            |
| onChange     | the callback once the value is changed       | Function      |            |
| disabled     | disable the input       | Boolean      |      false      |
| size    | width of input box  | String      |      none      |
