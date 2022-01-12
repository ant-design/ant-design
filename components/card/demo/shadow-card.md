---
order: 2
title:
  zh-CN: 阴影卡片
  en-US: shadow card
---

## zh-CN

包含标题、内容、操作区域。设置 mode 为'shadow'

## en-US

A shadow card containing a title, content and an extra corner content. Set mode to 'shadow'.

```jsx
import { Card } from 'infrad';

ReactDOM.render(
  <>
    <Card
      title="Default size card"
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
      mode="shadow"
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>,
  mountNode,
);
```

<style>
.code-box-demo p {
  margin: 0;
}
#components-card-demo-basic .ant-card { margin-bottom: 30px; }
</style>
