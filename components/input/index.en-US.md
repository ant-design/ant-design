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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| addonAfter | The label text displayed after (on the right side of) the input field. | string\|ReactNode |  |
| addonBefore | The label text displayed before (on the left side of) the input field. | string\|ReactNode |  |
| defaultValue | The initial input content | string |  |
| disabled | Whether the input is disabled. | boolean | false |
| id | The ID for input | string |  |
| prefix | The prefix icon for the Input. | string\|ReactNode |  |
| size | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small` | string | `default` |
| suffix | The suffix icon for the Input. | string\|ReactNode |  |
| type | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)(use `Input.TextArea` instead of `type="textarea"`) | string | `text` |
| value | The input content value | string |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` and `options` props defined
> then `value`, `defaultValue`, and `id` props of `Input` are automatically set.

The rest of the props of Input are exactly the same as the original [input](https://facebook.github.io/react/docs/events.html#supported-events).

### Input.TextArea

> If you are using `antd@<2.12`, please use `Input[type=textarea]`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| autosize | Height autosize feature, can be set to `true|false` or an object `{ minRows: 2, maxRows: 6 }` | boolean\|object | false |
| defaultValue | The initial input content | string |  |
| value | The input content value | string |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  |

The rest of the props of `Input.TextArea` are the same as the original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

#### Input.Search

`Added in 2.5.0`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| enterButton | to show a enter button after input | boolean\|ReactNode | false |
| onSearch | The callback function that is triggered when you click on the search-icon or press Enter key. | function(value) |  |

Supports all props of `Input`.

#### Input.Group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| compact | Whether use compact style | boolean | false |
| size | The size of `Input.Group` specifies the size of the included `Input` fields. Available: `large` `default` `small` | string | `default` |

```html
<Input.Group>
  <Input />
  <Input />
</Input.Group>
```
