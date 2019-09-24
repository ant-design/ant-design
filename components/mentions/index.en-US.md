---
category: Components
type: Data Entry
title: Mentions
---

Mention component.

> Mention component is deprecated. Please click [here](/components/mention) to view old document.

## When To Use

When need to mention someone or something.

## API

```jsx
<Mentions onChange={onChange}>
  <Mentions.Option value="sample">Sample</Mentions.Option>
</Mentions>
```

### Mention

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | Auto get focus when component mounted | boolean | `false` | 3.19.0 |
| defaultValue | Default value | string | - | 3.19.0 |
| filterOption | Customize filter option logic | false \| (input: string, option: OptionProps) => boolean | - | 3.19.0 |
| notFoundContent | Set mentions content when not match | ReactNode | 'Not Found' | 3.19.0 |
| placement | Set popup placement | 'top' \| 'bottom' | 'bottom' | 3.19.0 |
| prefix | Set trigger prefix keyword | string \| string[] | '@' | 3.19.0 |
| split | Set split string before and after selected mention | string | ' ' | 3.19.0 |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - | 3.19.0 |
| value | Set value of mentions | string | - | 3.19.0 |
| onChange | Trigger when value changed | (text: string) => void | - | 3.19.0 |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - | 3.19.0 |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - | 3.19.0 |
| onFocus | Trigger when mentions get focus | () => void | - | 3.19.0 |
| onBlur | Trigger when mentions lose focus | () => void | - | 3.19.0 |
| getPopupContainer | Set the mount HTML node for suggestions | () => HTMLElement | - | 3.22.0 |

### Mention methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus | 3.19.0  |
| focus() | get focus    | 3.19.0  |

### Option

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | suggestion content | ReactNode | - | 3.19.0 |
| value | value of suggestion, the value will insert into input filed while selected | string | '' | 3.19.0 |
