---
category: Components
chinese: 输入框
type: Form Controls
english: Input
---

A basic widget for getting the user input is a text field.
Keyboard and mouse can be used for providing or changing data.

## When to Use

- A user input in a form field is needed.
- A search input is required.

## API

### Input

| Property       | Description           | Type     | Available Values | Default       |
|----------------|-----------------------|----------|------------------|---------------|
| type | The type of input. For a multi-line input, the 'textarea' value can be used. | string | 'text' or 'textarea' | 'text'    |
| id | The identifier. | number or string |   |   |
| value | The content value. | any |   |   |
| defaultValue | The initial value. | any |   |   |
| size | The size of the input box. The implicit value is 'default'. Note: in the context of a form, the 'large' size is used. | string | {'large','default','small'} | 'default' |
| disabled | Tell if the input is disabled. | bool |   | false |
| addonBefore | The label text displayed before (on the left side of) the input field. | node |   |   |
| addonAfter | The label text displayed after (on the right side of) the input field. | node |   |   |
| onPressEnter | The callback function that is triggered when pressing Enter key. | function(e) |   |   |
| autosize | Height autosize feature, available when type="textarea". | bool or object | `true` or `{ minRows: 2, maxRows: 6 }` | false |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` and `options` props defined  
then `value`, `defaultValue`, and `id` props are automatically set.

#### Input.Group

| Property  | Description                      | Type   | Available Values            | Default   |
|-----------|----------------------------------|--------|-----------------------------|-----------|
|  size | The size of `Input.Group` specifies the size of the included `Input` fields. | string | {'large','default','small'} | 'default' |

```html
<Input.Group className={string}>
  <Input />
  <Input />
</Input.Group>
```
