---
type: 反馈
category: Components
subtitle: 抽屉
title: Drawer
---

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| closable | 是否显示右上角的关闭按钮 | boolean | true | 3.7.0 |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false | 3.7.0 |
| getContainer | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| `() => HTMLElement` \| Selectors \| false | 'body' | 3.7.0 |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true | 3.7.0 |
| mask | 是否展示遮罩 | Boolean | true | 3.7.0 |
| maskStyle | 遮罩样式 | object | {} | 3.7.0 |
| style | 可用于设置 Drawer 最外层容器的样式 | object | - | 3.7.0 |
| bodyStyle | 可用于设置 Drawer 的样式，调整浮层位置等 | object | - | 3.12.0 |
| title | 标题 | string \| ReactNode | - | 3.7.0 |
| visible | Drawer 是否可见 | boolean | - | 3.7.0 |
| width | 宽度 | string \| number | 256 | 3.7.0 |
| height | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用 | string \| number | 256 | 3.9.0 |
| className | 对话框外层容器的类名 | string | - | 3.8.0 |
| zIndex | 设置 Drawer 的 `z-index` | Number | 1000 | 3.7.0 |
| placement | 抽屉的方向 | 'top' \| 'right' \| 'bottom' \| 'left' | 'right' | 3.7.0 |
| onClose | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 | 3.7.0 |
| afterVisibleChange | 切换抽屉时动画结束后的回调 | function(visible) | 无 | 3.17.0 |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true | 3.19.8 |

<style>
#_hj_feedback_container {
  display: none;
}
</style>
