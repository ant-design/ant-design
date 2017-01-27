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
| toString    | convert EditorState to string | Function(editorState: EditorState): string |
| toEditorState    | convert string to  EditorState | Function(value: string): EditorState |
| getMentions    | get mentioned people in current editorState | Function(editorState: EditorState): string[] |


### Mention props

| Property     | Description          | Type     | Default       |
|----------|---------------|----------|--------------|
| suggestions    | suggestion content | Array<string\|Mention.Nav> | [] |
| suggestionStyle | style of suggestion container | object | {} |
| onSearchChange | Callback function called when search content changes | function(value:string) | [] |
| onChange | Callback function called when content of input changes | function(editorState: EditorState) | null |
| onSelect | Callback function called when select from suggestions | function(suggestion: string, data?: any) | null |
| notFoundContent| suggestion when suggestions empty | string | '无匹配结果，轻敲空格完成输入' |
| loading | loading mode | boolean | false |
| multiLines | multilines mode | boolean | false |
| prefix | character which will trigger Mention to show mention list | string | '@' |
| defaultValue | default value | EditorState, you can use `Mention.toEditorState` to convert text to `EditorState` | null |
| value | core state of mention | EditorState | null |
| placeholder | placeholder of input | string | null |
| getSuggestionContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative.  | Function() | () => document.body |
| onFocus | Callback function called when mention component get focus |  function() | null |
| onBlur | Callback function called when mention component blur | function() | nul |

### Nav props

| Property     | Description           | Type     | Default       |
|----------|---------------|----------|--------------|
| value    | value of suggestion，the value will insert into input filed while selected | string | "" |
| children | suggestion content | object | {} |
