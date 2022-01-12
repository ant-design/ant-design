---
order: 1
title:
  zh-CN: 灰底卡片
  en-US: gray card
---

## zh-CN

包含标题、内容、操作区域。设置 mode 为'gray'

## en-US

A gray card containing a title, content and an extra corner content. Set mode to 'gray'.

```jsx
import { Card } from 'infrad';

ReactDOM.render(
  <>
    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }} mode="gray">
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
