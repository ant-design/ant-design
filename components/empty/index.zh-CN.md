---
category: Components
subtitle: 空状态
type: 数据展示
title: Empty
cols: 1
---

空状态时的展示占位图。

## 何时使用

当目前没有数据时，用于显式的用户提示。

## 内置图片 (3.16.0 以上版本)

+ Empty.PRESENTED_IMAGE_SIMPLE

+ Empty.PRESENTED_IMAGE_DEFAULT

## API

```jsx
<Empty>
  <Button>创建</Button>
</Empty>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 自定义描述内容 | string \| ReactNode | - |
| imageStyle | 图片样式 | 同 style | - |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | string \| ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |
