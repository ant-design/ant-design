---
category: Components
group: Data Entry
title: Mentions
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e4bXT7Uhi9YAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*pxR2S53P_xoAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Mention component.

## When To Use

When you need to mention someone or something.

### Usage upgrade after 5.1.0

<Alert message="After version 5.1.0, we provide a simpler usage &lt;Mentions options={[...]} /&gt;  with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 6.0."></Alert>

```jsx
// works when >=5.1.0, recommended ✅
const options = [{ value: 'sample', label: 'sample' }];
return <Mentions options={options} />;

// works when <5.1.0, deprecated when >=5.1.0 🙅🏻‍♀️
return (
  <Mentions onChange={onChange}>
    <Mentions.Option value="sample">Sample</Mentions.Option>
  </Mentions>
);
```

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/async.tsx">Asynchronous loading</code>
<code src="./demo/form.tsx">With Form</code>
<code src="./demo/prefix.tsx">Customize Trigger Token</code>
<code src="./demo/readonly.tsx">disabled or readOnly</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/autoSize.tsx">autoSize</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Mention

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | Auto get focus when component mounted | boolean | false |  |
| autoSize | Textarea height autosize feature, can be set to true \| false or an object { minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| defaultValue | Default value | string | - |  |
| filterOption | Customize filter option logic | false \| (input: string, option: OptionProps) => boolean | - |  |
| getPopupContainer | Set the mount HTML node for suggestions | () => HTMLElement | - |  |
| notFoundContent | Set mentions content when not match | ReactNode | `Not Found` |  |
| placement | Set popup placement | `top` \| `bottom` | `bottom` |  |
| prefix | Set trigger prefix keyword | string \| string\[] | `@` |  |
| split | Set split string before and after selected mention | string | ` ` |  |
| status | Set validation status | 'error' \| 'warning' \| 'success' \| 'validating' | - | 4.19.0 |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - |  |
| value | Set value of mentions | string | - |  |
| onBlur | Trigger when mentions lose focus | () => void | - |  |
| onChange | Trigger when value changed | (text: string) => void | - |  |
| onFocus | Trigger when mentions get focus | () => void | - |  |
| onResize | The callback function that is triggered when textarea resize | function({ width, height }) | - |  |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - |  |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - |  |
| options | Option Configuration | [Options](#option) | \[] | 5.1.0 |

### Mention methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

### Option

<!-- prettier-ignore -->
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label | Title of the option | React.ReactNode | - |
| key | The key value of the option | string | - |
| disabled | Optional | boolean | - |
| className | className | string | - |
| style | The style of the option | React.CSSProperties | - |

## Design Token

<ComponentTokenTable component="Mentions"></ComponentTokenTable>
