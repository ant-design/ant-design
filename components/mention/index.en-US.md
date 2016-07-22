---
category: Components
chinese: 提及
cols: 1
type: Views
english: Mention
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
| suggestionStyle | style of suggestion container | Objet | {} |
| onSearchChange | Callback function called when search content changes | function(value:String) | [] |
| onChange | Callback function called when content of input changes | function(editorState: EditorState) | null |
| notFoundContent| suggestion when suggestions empty | string | '无匹配结果，轻敲空格完成输入' |
| loading | loading mode | boolean | false |
| multiLines | multilines mode | boolean | false |
| defaultValue | default value | EditorState, you can use `Mention.toEditorState` to convert text to `EditorState` | null |
| value | core state of mention | EditorState | null |

### Nav props

| Property     | Description           | Type     | Default       |
|----------|---------------|----------|--------------|
| value    | value of suggestion，the value will insert into input filed while selected | string | "" |
| children | suggestion content | Objet | {} |
