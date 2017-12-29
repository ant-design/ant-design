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

| API | 说明 | 类型 |
| --- | --- | --- |
| getMentions | 获取当前 contentState 中提到的人的列表 | Function(contentState: ContentState): string\[] |
| toContentState | 把字符串转成 ContentState | Function(value: string): ContentState |
| toString | 把 ContentState 转成字符串 | Function(contentState: ContentState): string |

### Mention

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| defaultValue | 默认值 | ContentState, 可以用 `Mention.toContentState(text)` 把文字转换成 ContentState | null |
| disabled | 是否禁用状态. | boolean | false |
| getSuggestionContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位 | function() | () => document.body |
| loading | 加载中 | boolean | false |
| multiLines | 多行模式 | boolean | false |
| notFoundContent | 未找到时的内容 | string | '无匹配结果，轻敲空格完成输入' |
| placeholder | 输入框默认文字 | string | null |
| placement | 建议框位置，可选 `top` `bottom` | string | 'bottom' |
| prefix | 触发弹出下拉框的字符 | string or Array<string> | '@' |
| readOnly | 是否只读. | boolean | false |
| suggestions | 建议内容 | Array&lt;string\|Mention.Nav> | \[] |
| suggestionStyle | 弹出下拉框样式 | object | {} |
| value | 值 | ContentState | null |
| onBlur | 失去焦点时回调 | function(e) | null |
| onChange | 输入框内容变化时回调 | function(contentState: ContentState) | null |
| onFocus | 获得焦点时回调 | function(e) | null |
| onSearchChange | 输入框中 @ 变化时回调 | function(value:string, trigger: string) | \[] |
| onSelect | 下拉框选择建议时回调 | function(suggestion: string, data?: any) | null |

### Mention 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### Nav

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 建议内容 | object | {} |
| value | 建议值，选择建议时，用此值插入到输入框中 | string | "" |
