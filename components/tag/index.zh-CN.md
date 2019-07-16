---
category: Components
subtitle: 标签
type: 数据展示
title: Tag
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterClose | 关闭动画完成后的回调，请使用 `onClose`, 我们将在下个版本删除此项 | () => void | - |  |
| closable | 标签是否可以关闭 | boolean | false |  |
| color | 标签色 | string | - |  |
| onClose | 关闭时的回调 | (e) => void | - |  |
| visible | 是否显示标签 | boolean | `true` | 3.7.0 |

### Tag.CheckableTag

| 参数     | 说明                 | 类型              | 默认值 | 版本 |
| -------- | -------------------- | ----------------- | ------ | ---- |
| checked  | 设置标签的选中状态   | boolean           | false  |      |
| onChange | 点击标签时触发的回调 | (checked) => void | -      |      |
