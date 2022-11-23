---
category: Components
type: Data Entry
title: Mentions
cover: https://gw.alipayobjects.com/zos/alicdn/0pF5j477V/Mentions.svg
---

Mention component.

## When To Use

When you need to mention someone or something.

### Usage upgrade after 4.24.4

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="After version 4.24.4, we provide a simpler usage <Mentions options={[...]} />  with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0." />, mountNode);
```

```jsx
// works when >=4.24.4, recommended ✅
const options = [{ value: 'sample', label: 'sample' }];
return <Mentions options={options} />;

// works when <4.24.4, deprecated when >=4.24.4 🙅🏻‍♀️
<Mentions onChange={onChange}>
  <Mentions.Option value="sample">Sample</Mentions.Option>
</Mentions>;
```

## API

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
| options | Option Configuration | [Options](#Option) | \[] | 4.24.4 |

### Mention methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

### Option

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | The value of suggestion, the value will insert into input filed while selected | string | - |
| label | Title of the option | React.ReactNode | - |
| key | The key value of the option | string | - |
| disabled | Optional | boolean | - |
| className | className | string | - |
| style | The style of the option | React.CSSProperties | - |
