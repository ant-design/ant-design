---
order: 7
title:
  zh-CN: 内部卡片
  en-US: Inner card
---

## zh-CN

可以放在普通卡片内部，展示多层级结构的信息。

## en-US

It can be placed inside the ordinary card to display the information of the multilevel structure.

```jsx
import { Card } from 'antd';

ReactDOM.render(
  <Card title="Card title">
    <p className="site-card-demo-inner-p">Group title</p>
    <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>
  </Card>,
  mountNode,
);
```

```css
.site-card-demo-inner-p {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
  font-weight: 500;
}
```

<style>
[data-theme="dark"] .site-card-demo-inner-p {
  color: rgba(255,255,255,.85);
}
</style>
