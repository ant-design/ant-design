---
order: 6
title:
  zh-CN: 排序
  en-US: Order
---

## zh-CN

通过 `order` 来改变元素的排序。

## en-US

To change the element sort by `order`.

```jsx
import { Row, Col, Divider } from 'antd';

ReactDOM.render(
  <>
    <Divider orientation="left">Normal</Divider>
    <Row>
      <Col span={6} order={4}>
        1 col-order-4
      </Col>
      <Col span={6} order={3}>
        2 col-order-3
      </Col>
      <Col span={6} order={2}>
        3 col-order-2
      </Col>
      <Col span={6} order={1}>
        4 col-order-1
      </Col>
    </Row>
    <Divider orientation="left">Responsive</Divider>
    <Row>
      <Col span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
        1 col-order-responsive
      </Col>
      <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} md={{ order: 4 }} lg={{ order: 3 }}>
        2 col-order-responsive
      </Col>
      <Col span={6} xs={{ order: 3 }} sm={{ order: 4 }} md={{ order: 2 }} lg={{ order: 1 }}>
        3 col-order-responsive
      </Col>
      <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
        4 col-order-responsive
      </Col>
    </Row>
  </>,
  mountNode,
);
```

```css
#components-grid-demo-flex-order [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}
```
