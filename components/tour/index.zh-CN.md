---
category: Components
type: 其他
subtitle: 悬浮按钮
title: FloatButton
cover: https://gw.alipayobjects.com/zos/bmw-prod/9b1b62fe-e677-4afc-b9fe-1b2993662611.svg
---

悬浮按钮。自 `5.0.0` 版本开始提供该组件。

## 何时使用

- 用于网站上的全局功能；
- 无论浏览到何处都可以看见的按钮。

## API

### 共同的 API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| icon | 自定义图标 | ReactNode | - |  |
| description | 文字及其它内容 | ReactNode | - |  |
| tooltip | 气泡卡片的内容 | ReactNode \| () => ReactNode | - |  |
| type | 设置按钮类型 | `default` \| `primary` | `default` |  |
| shape | 设置按钮形状 | `circle` \| `square` | `circle` |  |
| onClick | 点击按钮时的回调 | (event) => void | - |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| target | 相当于 a 标签的 target 属性，href 存在时生效 | string | - |  |

### FloatButton.Group

| 参数         | 说明                             | 类型                    | 默认值   | 版本 |
| ------------ | -------------------------------- | ----------------------- | -------- | ---- |
| shape        | 设置包含的 FloatButton 按钮形状  | `circle` \| `square`    | `circle` |      |
| trigger      | 触发方式（有触发方式为菜单模式） | `click` \| `hover`      | -        |      |
| open         | 受控展开                         | boolean                 | -        |      |
| onOpenChange | 展开收起时的回调                 | (open: boolean) => void | -        |      |

### FloatButton.BackTop

| 参数             | 说明                               | 类型              | 默认值       | 版本 |
| ---------------- | ---------------------------------- | ----------------- | ------------ | ---- |
| duration         | 回到顶部所需时间（ms）             | number            | 450          |      |
| target           | 设置需要监听其滚动事件的元素       | () => HTMLElement | () => window |      |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number            | 400          |      |
| onClick          | 点击按钮的回调函数                 | () => void        | -            |      |
