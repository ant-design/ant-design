---
category: Components
chinese: 提及
cols: 1
type: Views
english: Mention
---

提及组件。

## 何时使用

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## API

```jsx
<Mention
  onChange={onChange}
  suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
/>
```

### Mention API

| API     | 说明           | 类型     |
|----------|---------------|----------|
| toString    | 把 EditorState 转成字符串 | Function(editorState: EditorState): String |
| toEditorState    | 把字符串转成 EditorState | Function(string: String): EditorState |
| getMentions    | 获取当前 editorState 中提到的人的列表 | Function(editorState: EditorState): Array<String> |

### Mention props

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|--------------|
| suggestions    | 建议内容 | Array<string> or Array<Mention.Nav> | [] |
| suggestionStyle | 弹出下拉框样式 | Objet | {} |
| onSearchChange | 输入框中 @ 变化时回调 | function(value:String) | [] |
| onChange | 输入框内容变化时回调 | function(editorState: EditorState) | null |
| notFoundContent| 未找到时的内容 | string | '无匹配结果，轻敲空格完成输入' |
| loading | 加载中 | boolean | false |
| multiLines | 多行模式 | boolean | false |
| defaultValue | 默认值 | EditorState, 可以用 Mention.toEditorState(text) 把文字转换成 EditorState | null |
| value | 值 | EditorState | null |

### Nav props

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|--------------|
| value    | 建议值，选择建议时，用此值插入到输入框中 | string | "" |
| children | 建议内容 | Objet | {} |
