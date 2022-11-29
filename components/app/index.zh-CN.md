---
category: Components
subtitle: 包裹组件
group: 数据展示
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

新的应用程序组件，提供全局样式和静态功能替换。

## 何时使用

React 18 并发模式下的静态函数不能很好地支持。在 v5 中，我们建议使用钩子进行静态替换。但它会在用户手册中定义这个。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/MyApp.tsx">基本</code>

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | `boolean` \| `{ pointAtCenter: boolean}` | `true` |  |
