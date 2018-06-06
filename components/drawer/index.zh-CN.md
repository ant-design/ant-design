---
type: Feedback
category: Components
subtitle: 抽屉
title: Drawer
---

抽屉是一种覆盖在父窗体上的面板，从父窗体边框外滑入，用来承载信息或操作集合。抽屉在不离开父窗体情况下进行互动，用户身处上下文环境中，能更方便清楚地处理任务。

## 何时使用

* 创建或者编辑一个对象。
* 承载子任务。为了让子任务仍然置于主任务的上下文环境中，子任务对气泡 Popover 来说又过于复杂时，使用大号的抽屉来承载。
* 同一表单在多处使用


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false |
| getContainer | 指定 Drawer 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| mask | 是否展示遮罩 | Boolean | true |
| maskStyle | 遮罩样式 | object | {} |
| style | 可用于设置 Drawer 的样式，调整浮层位置等 | object | - |
| title | 标题 | string \| ReactNode | 无 |
| visible | Drawer 是否可见 | boolean | 无 |
| width | 宽度 | string \| number | 256 |
| wrapClassName | 对话框外层容器的类名 | string | - |
| zIndex | 设置 Drawer 的 `z-index` | Number | 1000 |
| placement | 抽屉的方向 | 'left' \| 'right' | 'right'
| onClose | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |
