---
category: Components
type: Data Entry
title: Mention
---

Mention component.

## When To Use

When need to mention someone or something.

## API

```jsx
<Mention
  onChange={onChange}
  suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
/>
```

### Mention API

| API | Description | Type |
| --- | ----------- | ---- |
| getMentions | get mentioned people in current contentState | Function(ContentState: contentState): string\[] |
| toContentState | convert string to ContentState | Function(value: string): ContentState |
| toString | convert ContentState to string | Function(contentState: ContentState): string |

### Mention

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| autoFocus | get focus when component mounted | boolean | false |
| defaultValue | default value | ContentState, you can use `Mention.toContentState` to convert text to `ContentState` | null |
| disabled | Tell if the input is disabled. | boolean | false |
| getSuggestionContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative. | function | () => document.body |
| loading | loading mode | boolean | false |
| multiLines | multilines mode | boolean | false |
| notFoundContent | suggestion when suggestions empty | string | '无匹配结果，轻敲空格完成输入' |
| placeholder | placeholder of input | string | null |
| placement | The position of the suggestion relative to the target, which can be one of `top` and `bottom` | string | 'bottom'. |
| prefix | character which will trigger Mention to show mention list | string or Array<string> | '@' |
| readOnly | Tell if the input is readonly. | boolean | false |
| suggestions | suggestion content | Array&lt;string\|Mention.Nav> | \[] |
| suggestionStyle | style of suggestion container | object | {} |
| value | core state of mention | ContentState | null |
| onBlur | Callback function called when mention component blur | function(e) | null |
| onChange | Callback function called when content of input changes | function(contentState: ContentState) | null |
| onFocus | Callback function called when mention component get focus | functione) | null |
| onSearchChange | Callback function called when search content changes | function(value:string, trigger: string) | \[] |
| onSelect | Callback function called when select from suggestions | function(suggestion: string, data?: any) | null |

### Mention methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |

### Nav

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| children | suggestion content | object | {} |
| value | value of suggestion，the value will insert into input filed while selected | string | "" |
