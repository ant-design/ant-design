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

参数 | 说明 | 类型 | 默认值
----|------|-----|------
size | 组件大小，可选值为 `small` `default` `large` | string | 'default'
spinning | 是否旋转 | boolean | true
tip | 当作为包裹元素时，可以自定义描述文案 | string | -
delay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | -
wrapperClassName | 包装器的类属性 | string | -
