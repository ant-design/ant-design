---
category: Components
group: Data Entry
title: Input
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y3R0RowXHlAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sBqqTatJ-AkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic usage</code>
<code src="./demo/size.tsx">Three sizes of Input</code>
<code src="./demo/addon.tsx">Pre / Post tab</code>
<code src="./demo/compact-style.tsx">Compact Style</code>
<code src="./demo/group.tsx" debug>Input Group</code>
<code src="./demo/search-input.tsx">Search box</code>
<code src="./demo/search-input-loading.tsx">Search box with loading</code>
<code src="./demo/textarea.tsx">TextArea</code>
<code src="./demo/autosize-textarea.tsx">Autosizing the height to fit the content</code>
<code src="./demo/tooltip.tsx">Format Tooltip Input</code>
<code src="./demo/presuffix.tsx">prefix and suffix</code>
<code src="./demo/password-input.tsx">Password box</code>
<code src="./demo/allowClear.tsx">With clear icon</code>
<code src="./demo/show-count.tsx">With character counting</code>
<code src="./demo/advance-count.tsx" version=">= 5.10.0">Custom count logic</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/borderless.tsx">Borderless</code>
<code src="./demo/focus.tsx">Focus</code>
<code src="./demo/borderless-debug.tsx" debug>Style Debug</code>
<code src="./demo/align.tsx" debug>Text Align</code>
<code src="./demo/textarea-resize.tsx" debug>TextArea</code>
<code src="./demo/debug-addon.tsx" debug>debug Pre / Post tab</code>
<code src="./demo/component-token.tsx" debug>debug token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Input

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| addonAfter | The label text displayed after (on the right side of) the input field | ReactNode | - |  |
| addonBefore | The label text displayed before (on the left side of) the input field | ReactNode | - |  |
| allowClear | If allow to remove input content with clear icon | boolean \| { clearIcon: ReactNode } | false |  |
| bordered | Whether has border style | boolean | true | 4.5.0 |
| classNames | Semantic DOM class | Record<[SemanticDOM](#input-1), string> | - | 5.4.0 |
| count | Character count config | [CountConfig](#countconfig) | - | 5.10.0 |
| defaultValue | The initial input content | string | - |  |
| disabled | Whether the input is disabled | boolean | false |  |
| id | The ID for input | string | - |  |
| maxLength | The maximum number of characters in Input | number | - |  |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| showCount | Whether to show character count | boolean \| { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode } | false | 4.18.0 info.value: 4.23.0 |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| styles | Semantic DOM style | Record<[SemanticDOM](#input-1), CSSProperties> | - | 5.4.0 |
| size | The size of the input box. Note: in the context of a form, the `middle` size is used | `large` \| `middle` \| `small` | - |  |
| suffix | The suffix icon for the Input | ReactNode | - |  |
| type | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)( use `Input.TextArea` instead of `type="textarea"`) | string | `text` |  |
| value | The input content value | string | - |  |
| onChange | Callback when user input | function(e) | - |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - |  |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` props defined then `value`, `defaultValue`, and `id` props of `Input` are automatically set.

The rest of the props of Input are exactly the same as the original [input](https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes).

#### CountConfig

```tsx
interface CountConfig {
  // Max character count. Different from the native `maxLength`, it will be marked warning but not truncated
  max?: number;
  // Custom character count, for example, the standard emoji length is greater than 1, you can customize the counting strategy to change it to 1
  strategy?: (value: string) => number;
  // Same as `showCount`
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
  // Custom clipping logic when the number of characters exceeds `count.max`, no clipping when not configured
  exceedFormatter?: (value: string, config: { max: number }) => string;
}
```

### Input.TextArea

Same as Input, and more:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoSize | Height auto size feature, can be set to true \| false or an object { minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | Semantic DOM class | Record<[SemanticDOM](#inputtextarea-1), string> | - | 5.4.0 |
| styles | Semantic DOM style | Record<[SemanticDOM](#inputtextarea-1), CSSProperties> | - | 5.4.0 |

The rest of the props of `Input.TextArea` are the same as the original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

#### Input.Search

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| enterButton | Whether to show an enter button after input. This property conflicts with the `addonAfter` property | boolean \| ReactNode | false |
| loading | Search box with loading | boolean | false |
| onSearch | The callback function triggered when you click on the search-icon, the clear-icon or press the Enter key | function(value, event, { source: "input" \| "clear" }) | - |

Supports all props of `Input`.

#### Input.Password

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| iconRender | Custom toggle button | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |
| visibilityToggle | Whether show toggle button or control password visible | boolean \| [VisibilityToggle](#visibilitytoggle) | true |  |

#### VisibilityToggle

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| visible | Whether the password is show or hide | boolean | false | 4.24.0 |
| onVisibleChange | Callback executed when visibility of the password is changed | boolean | - | 4.24.0 |

#### Input Methods

| Name | Description | Parameters | Version |
| --- | --- | --- | --- |
| blur | Remove focus | - |  |
| focus | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | option - 4.10.0 |

### Semantic DOM

#### Input

<!-- prettier-ignore -->
| Property | Description | Version |
| --- | --- | --- |
| input | `input` element | 5.4.0 |
| prefix | Wrapper of prefix | 5.4.0 |
| suffix | Wrapper of suffix | 5.4.0 |
| count | Text count element | 5.4.0 |

#### Input.TextArea

<!-- prettier-ignore -->
| Property | Description | Version |
| --- | --- | --- |
| textarea | `textarea` element | 5.4.0 |
| count | Text count element | 5.4.0 |

## Design Token

<ComponentTokenTable component="Input"></ComponentTokenTable>

## FAQ

### Why Input lose focus when change `prefix/suffix/showCount`

When Input dynamic add or remove `prefix/suffix/showCount` will make React recreate the dom structure and new input will be not focused. You can set an empty `<span />` element to keep the dom structure:

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

### Why TextArea in control can make `value` exceed `maxLength`?

When in control, component should show as what it set to avoid submit value not align with store value in Form.
