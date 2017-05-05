---
category: Components
type: Data Entry
title: Mention
---

Mention component。

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

| API     | Description           | Type     |
|----------|---------------|----------|--------------|
| toString    | convert ContentState to string | Function(contentState: ContentState): string |
| toContentState (recommended)    | convert string to ContentState | Function(value: string): ContentState |
| toEditorState (Backward compatible)    | convert string to ContentState | Function(value: string): ContentState |
| getMentions    | get mentioned people in current contentState | Function(ContentState: contentState): string[] |


### Mention props

| Property     | Description          | Type     | Default       |
|----------|---------------|----------|--------------|
| suggestions    | suggestion content | Array<string\|Mention.Nav> | [] |
| suggestionStyle | style of suggestion container | object | {} |
| onSearchChange | Callback function called when search content changes | function(value:string, trigger: string) | [] |
| onChange | Callback function called when content of input changes | function(contentState: ContentState) | null |
| onSelect | Callback function called when select from suggestions | function(suggestion: string, data?: any) | null |
| notFoundContent| suggestion when suggestions empty | string | '无匹配结果，轻敲空格完成输入' |
| loading | loading mode | boolean | false |
| multiLines | multilines mode | boolean | false |
| prefix | character which will trigger Mention to show mention list | string or Array<string> | '@' |
| defaultValue | default value | ContentState, you can use `Mention.toContentState` or `Mention.toEditorState` to convert text to `ContentState` | null |
| value | core state of mention | ContentState | null |
| placeholder | placeholder of input | string | null |
| getSuggestionContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative.  | function | () => document.body |
| onFocus | Callback function called when mention component get focus |  functione) | null |
| onBlur | Callback function called when mention component blur | function(e) | null |
| readOnly | Tell if the input is readonly. | boolean | false |
| disabled | Tell if the input is disabled. | boolean | false |

### Nav props

| Property     | Description           | Type     | Default       |
|----------|---------------|----------|--------------|
| value    | value of suggestion，the value will insert into input filed while selected | string | "" |
| children | suggestion content | object | {} |
