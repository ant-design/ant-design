---
category: Components
subtitle: 标签
group: 数据展示
title: Tag
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_SBsSrKLg00AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JPNAQYrVkYkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/colorful.tsx">多彩标签</code>
<code src="./demo/colorful-inverse.tsx" debug>反色多彩标签</code>
<code src="./demo/control.tsx">动态添加和删除</code>
<code src="./demo/checkable.tsx">可选择标签</code>
<code src="./demo/animation.tsx">添加动画</code>
<code src="./demo/icon.tsx">图标按钮</code>
<code src="./demo/status.tsx">预设状态的标签</code>
<code src="./demo/customize.tsx" debug>自定义关闭按钮</code>

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closable | 标签是否可以关闭（点击默认关闭） | boolean | false |  |
| closeIcon | 自定义关闭按钮 | ReactNode | - | 4.4.0 |
| color | 标签色 | string | - |  |
| icon | 设置图标 | ReactNode | - |  |
| onClose | 关闭时的回调（可通过 `e.preventDefault()` 来阻止默认行为） | (e) => void | - |  |

### Tag.CheckableTag

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| checked  | 设置标签的选中状态   | boolean           | false  |
| onChange | 点击标签时触发的回调 | (checked) => void | -      |
