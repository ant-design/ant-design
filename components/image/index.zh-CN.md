---
category: Components
subtitle: 图片
type: 数据展示
title: Image
cols: 2
---

可预览的图片。

## 何时使用

- 需要预览。
- 大图加载展示 loading 或加载失败容错。

## API

| 参数           | 说明             | 类型        | 默认值 | 版本  |
| -------------- | ---------------- | ----------- | ------ | ----- |
| fallback       | 加载失败容错地址 | string      | -      | 4.6.0 |
| onPreviewClose | 预览关闭回调     | function(e) | -      | 4.6.0 |
| placeholder    | 加载占位         | ReactNode   | -      | 4.6.0 |
| preview        | 是否开启预览     | boolean     | true   | 4.6.0 |
