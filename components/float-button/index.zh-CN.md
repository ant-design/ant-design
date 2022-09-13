---
category: Components
type: 其他
subtitle: 悬浮按钮
title: FloatButton
cover: https://gw.alipayobjects.com/zos/alicdn/tJZ5jbTwX/BackTop.svg
---

一个更加通用按钮组件

## 何时使用

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| duration | 回到顶部所需时间（ms） | number | 450 | 4.4.0 |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |  |
| visibilityHeight | 滚动高度达到此参数值才出现 FloatButton | number | 400 |  |
| onClick | 点击按钮的回调函数 | function | - |  |
