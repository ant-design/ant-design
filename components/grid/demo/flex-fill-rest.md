---
order: 7
title:
  zh-CN: Flex 填充
  en-US: Flex Fill Rest
---

## zh-CN

Flex 填充剩余空间。

## en-US

Flex fill rest space.

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <p>Fix left</p>
    <Row type="flex">
      <Col style={{ width: 100 }}>100px</Col>
      <Col style={{ flex: 'auto' }}>fill rest</Col>
    </Row>

    <p>Fix middle</p>
    <Row type="flex">
      <Col style={{ flex: 'auto' }}>fill rest</Col>
      <Col style={{ width: 100 }}>100px</Col>
      <Col style={{ flex: 'auto' }}>fill rest</Col>
    </Row>

    <p>Merge with span</p>
    <Row type="flex">
      <Col style={{ width: 100 }}>100px</Col>
      <Col span={4}>col-4</Col>
      <Col style={{ flex: 'auto' }}>fill rest</Col>
    </Row>
  </div>,
  mountNode
);
````
