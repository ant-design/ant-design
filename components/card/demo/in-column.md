---
order: 4
title:
  zh-CN: 栅格卡片
  en-US: Card in column
---

## zh-CN

在系统概览页面常常和栅格进行配合。

## en-US

Cards usually cooperate with grid column layout in overview page.

```jsx
import { Card, Col, Row } from 'antd';

ReactDOM.render(
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>,
  mountNode,
);
```

```css
.site-card-wrapper {
  background: #ececec;
  padding: 30px;
}
```

<style>
  [data-theme="dark"] .site-card-wrapper {
    background: #303030;
  }
</style>
