---
category: Components
group: 数据展示
title: Tag
subtitle: 标签
description: 进行标记和分类的小标签。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_SBsSrKLg00AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JPNAQYrVkYkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/colorful.tsx">多彩标签</code>
<code src="./demo/control.tsx">动态添加和删除</code>
<code src="./demo/checkable.tsx">可选择标签</code>
<code src="./demo/animation.tsx">添加动画</code>
<code src="./demo/icon.tsx">图标按钮</code>
<code src="./demo/status.tsx">预设状态的标签</code>
<code src="./demo/customize.tsx" debug>自定义关闭按钮</code>
<code src="./demo/draggable.tsx">可拖拽标签</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/disabled.tsx" debug>禁用标签</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 自定义语义化结构类名 | Record<SemanticDOM, string> \| (info: { props }) => Record<SemanticDOM, string> | - |  |
| closeIcon | 自定义关闭按钮。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮 | ReactNode | false | 4.4.0 |
| color | 标签色 | string | - |  |
| disabled | 是否禁用标签 | boolean | false | 6.0.0 |
| href | 点击跳转的地址，指定此属性`tag`组件会渲染成 `<a>` 标签 | string | - | 6.0.0 |
| icon | 设置图标 | ReactNode | - |  |
| onClose | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为） | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| styles | 自定义语义化结构样式 | Record<SemanticDOM, CSSProperties> \| (info: { props }) => Record<SemanticDOM, CSSProperties> | - |  |
| target | 相当于 a 标签的 target 属性，href 存在时生效 | string | - | 6.0.0 |
| variant | 标签变体 | `'filled' \| 'solid' \| 'outlined'` | `'filled'` | 6.0.0 |

### Tag.CheckableTag

| 参数     | 说明                 | 类型              | 默认值 | 版本   |
| -------- | -------------------- | ----------------- | ------ | ------ |
| checked  | 设置标签的选中状态   | boolean           | false  |        |
| icon     | 设置图标             | ReactNode         | -      | 5.27.0 |
| onChange | 点击标签时触发的回调 | (checked) => void | -      |        |

### Tag.CheckableTagGroup

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 语义化结构 class | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| defaultValue | 初始选中值 | `string \| number \| Array<string \| number> \| null` | - |  |
| disabled | 禁用选中 | `boolean` | - |  |
| multiple | 多选模式 | `boolean` | - |  |
| value | 选中值 | `string \| number \| Array<string \| number> \| null` | - |  |
| options | 选项列表 | `Array<{ label: ReactNode; value: string \| number } \| string \| number>` | - |  |
| onChange | 点击标签时触发的回调 | `(value: string \| number \| Array<string \| number> \| null) => void` | - |  |

## Semantic DOM

### Tag

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Tag.CheckableTagGroup

<code src="./demo/_semantic_group.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Tag"></ComponentTokenTable>
