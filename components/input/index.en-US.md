---
category: Components
type: Data Entry
title: Input
---

A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## API

### Input

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| addonAfter | The label text displayed after (on the right side of) the input field. | string\|ReactNode |  | 3.0.0 |
| addonBefore | The label text displayed before (on the left side of) the input field. | string\|ReactNode |  | 3.0.0 |
| defaultValue | The initial input content | string |  | 3.0.0 |
| disabled | Whether the input is disabled. | boolean | false | 3.0.0 |
| id | The ID for input | string |  | 3.0.0 |
| prefix | The prefix icon for the Input. | string\|ReactNode |  | 3.0.0 |
| size | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small` | string | `default` | 3.0.0 |
| suffix | The suffix icon for the Input. | string\|ReactNode |  | 3.0.0 |
| type | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)(use `Input.TextArea` instead of `type="textarea"`) | string | `text` | 3.0.0 |
| value | The input content value | string |  | 3.0.0 |
| onChange | callback when user input | function(e) |  | 3.9.3 |
| onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  | 3.0.0 |
| allowClear | allow to remove input content with clear icon | boolean |  | 3.12.0 |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` and `options` props defined then `value`, `defaultValue`, and `id` props of `Input` are automatically set.

The rest of the props of Input are exactly the same as the original [input](https://facebook.github.io/react/docs/events.html#supported-events).

### Input.TextArea

> If you are using `antd@<2.12`, please use `Input[type=textarea]`.

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| autosize | Height autosize feature, can be set to `true|false` or an object `{ minRows: 2, maxRows: 6 }` | boolean\|object | false | 3.0.0 |
| defaultValue | The initial input content | string |  | 3.0.0 |
| value | The input content value | string |  | 3.0.0 |
| onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  | 3.0.0 |

The rest of the props of `Input.TextArea` are the same as the original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

#### Input.Search

`Added in 2.5.0`

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| enterButton | to show an enter button after input. This prop is conflict with addon. | boolean\|ReactNode | false | 3.0.0 |
| onSearch | The callback function that is triggered when you click on the search-icon or press Enter key. | function(value, event) |  | 3.0.0 |

Supports all props of `Input`.

#### Input.Group

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| compact | Whether use compact style | boolean | false | 3.0.0 |
| size | The size of `Input.Group` specifies the size of the included `Input` fields. Available: `large` `default` `small` | string | `default` | 3.0.0 |

```html
<Input.Group>
  <input />
  <input />
</Input.Group>
```

#### Input.Password (Added in 3.12.0)

| Property         | Description                | Type    | Default | Version Added |
| ---------------- | -------------------------- | ------- | ------- | ------------- |
| visibilityToggle | Whether show toggle button | boolean | true    | 3.12.2        |

## FAQ

### Why Input lose focus when change `prefix/suffix`

When Input dynamic add or remove `prefix/suffix` will make React recreate the dom structure and new input will be not focused. You can set an empty `<span />` element to keep the dom structure:

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```
