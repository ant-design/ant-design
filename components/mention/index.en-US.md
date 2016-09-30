---
category: Components
cols: 1
type: Views
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
| toString    | convert EditorState to string | Function(editorState: EditorState): String |
| toEditorState    | convert string to  EditorState | Function(string: String): EditorState |
| getMentions    | get mentioned people in current editorState | Function(editorState: EditorState): Array<String> |


### Mention props

| Property     | Description          | Type     | Default       |
|----------|---------------|----------|--------------|
| suggestions    | suggestion content | Array<string> or Array<Mention.Nav> | [] |
| suggestionStyle | style of suggestion container | Object | {} |
| onSearchChange | Callback function called when search content changes | function(value:String) | [] |
| onChange | Callback function called when content of input changes | function(editorState: EditorState) | null |
| onSelect | Callback function called when select from suggestions | function(suggestion: String) | null |
| notFoundContent| suggestion when suggestions empty | string | '无匹配结果，轻敲空格完成输入' |
| loading | loading mode | boolean | false |
| multiLines | multilines mode | boolean | false |
| prefix | character which will trigger Mention to show mention list | string | '@' |
| defaultValue | default value | EditorState, you can use `Mention.toEditorState` to convert text to `EditorState` | null |
| value | core state of mention | EditorState | null |
| placeHolder | placeholder of input | string | null |

### Nav props

| Property     | Description           | Type     | Default       |
|----------|---------------|----------|--------------|
| value    | value of suggestion，the value will insert into input filed while selected | string | "" |
| children | suggestion content | Objet | {} |
