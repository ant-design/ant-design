---
category: Components
subtitle: 提及
type: 数据录入
title: Mentions
---

提及组件。

> 原 Mention 组件已废弃，原文档请点击[这里](/components/mention)。

## 何时使用

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## API

```jsx
<Mention
  onChange={onChange}
  suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
/>
```

## API

```jsx
<Mentions onChange={onChange}>
  <Mentions.Option value="sample">Sample</Mentions.Option>
</Mentions>
```

### Mention

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 自动获得焦点 | boolean | `false` | 3.19.0 |
| defaultValue | 默认值 | string | - | 3.19.0 |
| filterOption | 自定义过滤逻辑 | false \| (input: string, option: OptionProps) => boolean | - | 3.19.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | 'Not Found' | 3.19.0 |
| placement | 弹出层展示位置 | 'top' \| 'bottom' | 'bottom' | 3.19.0 |
| prefix | 设置触发关键字 | string \| string[] | '@' | 3.19.0 |
| split | 设置选中项前后分隔符 | string | ' ' | 3.19.0 |
| validateSearch | 自定义触发验证逻辑 | (text: string, props: MentionsProps) => void | - | 3.19.0 |
| value | 设置值 | string | - | 3.19.0 |
| onChange | 值改变时触发 | (text: string) => void | - | 3.19.0 |
| onSelect | 选择选项时触发 | (option: OptionProps, prefix: string) => void | - | 3.19.0 |
| onSearch | 搜索时触发 | (text: string, prefix: string) => void | - | 3.19.0 |
| onFocus | 获得焦点时触发 | () => void | - | 3.19.0 |
| onBlur | 失去焦点时触发 | () => void | - | 3.19.0 |

### Mention 方法

| 名称    | 描述     | 版本   |
| ------- | -------- | ------ |
| blur()  | 移除焦点 | 3.19.0 |
| focus() | 获取焦点 | 3.19.0 |

### Option

| 参数     | 说明           | 类型      | 默认值 | 版本   |
| -------- | -------------- | --------- | ------ | ------ |
| children | 选项内容       | ReactNode | -      | 3.19.0 |
| value    | 选择时填充的值 | string    | ''     | 3.19.0 |
