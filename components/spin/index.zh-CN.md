---
category: Components
type: Feedback
title: Spin
subtitle: 加载中
---

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## API

| 参数       | 类型           | 默认值      | 说明         |
|------------|----------------|-------------|--------------|
| size       | enum           | default     | spin组件中点的大小，可选值为 small default large |
| spinning   | boolean        | true        | 用于内嵌其他组件的模式，可以关闭 loading 效果    |
| tip    | string        | 无        | 自定义描述文案 |
| delay | number (毫秒) | 无 | 延迟显示 loading 效果 |
