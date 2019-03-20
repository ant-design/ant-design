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

<img src="https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png" height="35px">

+ Empty.PRESENTED_IMAGE_DEFAULT

<img src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" height="100px">

## API

```jsx
<Empty>
  <Button>创建</Button>
</Empty>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 自定义描述内容 | string \| ReactNode | - |
| imageStyle | 图片样式 | CSSProperties | - |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | string \| ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |
