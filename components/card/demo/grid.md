---
order: 4
title:
  zh-CN: 栅格卡片
  en-US: Grid card
---

## zh-CN

在系统概览页面常常和栅格进行配合。

## en-US

Cards usually cooperate with grid layout in overview page.

````jsx
import { Card, Col, Row } from 'antd';

ReactDOM.render(
  <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row>
      <Col span="8">
        <Card title="Card title" bordered={false}>Card content</Card>
      </Col>
      <Col span="8">
        <Card title="Card title" bordered={false}>Card content</Card>
      </Col>
      <Col span="8">
        <Card title="Card title" bordered={false}>Card content</Card>
      </Col>
    </Row>
  </div>
, mountNode);
````

````css
/* Increase grid spacing of 16px  */
.code-box-demo .ant-row {
  margin-left: -8px;
  margin-right: -8px;
}
.code-box-demo .ant-row > div {
  padding: 0 8px;
}
````
