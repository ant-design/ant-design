---
category: Components
subtitle: 提及
type: Data Entry
title: Mention
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
| toString    | 把 ContentState 转成字符串 | Function(contentState: ContentState): string |
| toContentState(推荐)    | 把字符串转成 ContentState | Function(value: string): ContentState |
| toEditorState(兼容)    | 把字符串转成 ContentState | Function(value: string): ContentState |
| getMentions    | 获取当前 contentState 中提到的人的列表 | Function(contentState: ContentState): string[] |

### Mention props

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|--------------|
| suggestions    | 建议内容 | Array<string\|Mention.Nav> | [] |
| suggestionStyle | 弹出下拉框样式 | object | {} |
| onSearchChange | 输入框中 @ 变化时回调 | function(value:string, trigger: string) | [] |
| onChange | 输入框内容变化时回调 | function(contentState: ContentState) | null |
| onSelect | 下拉框选择建议时回调 | function(suggestion: string, data?: any) | null |
| notFoundContent| 未找到时的内容 | string | '无匹配结果，轻敲空格完成输入' |
| loading | 加载中 | boolean | false |
| multiLines | 多行模式 | boolean | false |
| prefix | 触发弹出下拉框的字符 | string or Array<string> | '@' |
| placeholder | 输入框默认文字 | string | null |
| defaultValue | 默认值 | ContentState, 可以用 `Mention.toContentState(text)` 或 `Mention.toEditorState(text)`  把文字转换成 ContentState | null |
| value | 值 | ContentState | null |
| getSuggestionContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位| function() | () => document.body |
| onFocus | 获得焦点时回调 |  function(e) | null |
| onBlur | 失去焦点时回调 | function(e) | null |
| readOnly | 是否只读. | boolean | false |
| disabled | 是否禁用状态. | boolean | false |

### Nav props

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|--------------|
| value    | 建议值，选择建议时，用此值插入到输入框中 | string | "" |
| children | 建议内容 | object | {} |
