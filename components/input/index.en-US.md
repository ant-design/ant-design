---
category: Components
type: Data Entry
title: Input
---

A basic widget for getting the user input is a text field.
Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## API

### Input

| Property       | Description           | Type     | Default       |
|----------------|-----------------------|----------|---------------|
| type | The type of input, `text` or `textarea`(`type=textarea` are deprecated after `2.12`, please use `Input.TextArea`) | string  | `text`    |
| id | The ID for input | string |   |
| value | The input content value | string |   |
| defaultValue | The initial input content | string |   |
| size | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small` | string | `default` |
| disabled | Tell if the input is disabled. | boolean | false |
| addonBefore | The label text displayed before (on the left side of) the input field. | string\|ReactNode |   |
| addonAfter | The label text displayed after (on the right side of) the input field. | string\|ReactNode  |   |
| prefix | The Input with prefix icon. | string\|ReactNode | |
| suffix | The Input with suffix icon. | string\|ReactNode | |
| onPressEnter | The callback function that is triggered when pressing Enter key. | function(e) |   |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` and `options` props defined
then `value`, `defaultValue`, and `id` props are automatically set.

The rest props of Input is exactly same as original [input](https://facebook.github.io/react/docs/events.html#supported-events).

### Input.TextArea

> It you are using `antd@<2.12`, please use `Input[type=textarea]`.

| Property       | Description           | Type     | Default       |
|----------------|-----------------------|----------|---------------|
| defaultValue | The initial input content | string |   |
| value | The input content value | string |   |
| onPressEnter | The callback function that is triggered when pressing Enter key. | function(e) |   |
| autosize | Height autosize feature, can be set to `true|false` or a object `{ minRows: 2, maxRows: 6 }` | boolean\|object | false |

The rest props of `Input.TextArea` is the same as original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

#### Input.Search

`Added in 2.5.0`

| Property  | Description                          | Type       | Default |
|-----------|--------------------------------------|------------|---------|
| onSearch | The callback function that is triggered when you click on the search-icon or press Enter key. | function(value) |  |

Support all props of `Input`.

#### Input.Group

| Property  | Description                      | Type   | Default   |
|-----------|----------------------------------|--------|-----------|
|  size | The size of `Input.Group` specifies the size of the included `Input` fields. Available: `large` `default` `small` | string | `default` |
|  compact | whether use compact style | boolean | false |


```html
<Input.Group>
  <Input />
  <Input />
</Input.Group>
```
