---
category: Components
type: Data Entry
title: Mentions
---

Mention component.

## When To Use

When need to mention someone or something.

## API

```jsx
<Mentions onChange={onChange}>
  <Mentions.Option value="sample">Sample</Mentions.Option>
</Mentions>
```

### Mention

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | Auto get focus when component mounted | boolean | `false` |
| defaultValue | Default value | string | - |
| filterOption | Customize filter option logic | false \| (input: string, option: OptionProps) => boolean | - |
| notFoundContent | Set mentions content when not match | ReactNode | 'Not Found' |
| prefix | Set trigger prefix keyword | string \| string[] | '@' |
| rows | Set row count | number | 1 |
| split | Set split string before and after selected mention | string | ' ' |
| validateSearch | Customize trigger search logic | (text: string, props: MentionsProps) => void | - |
| value | Set value of mentions | string | - |
| onChange | Trigger when value changed | (text: string) => void | - |
| onSelect | Trigger when user select the option | (option: OptionProps, prefix: string) => void | - |
| onSearch | Trigger when prefix hit | (text: string, prefix: string) => void | - |
| onFocus | Trigger when mentions get focus | () => void | - |
| onBlur | Trigger when mentions lose focus | () => void | - |

### Mention methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |

### Option

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| children | suggestion content | ReactNode | - |
| value | value of suggestion, the value will insert into input filed while selected | string | "" |
