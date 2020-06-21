---
order: 6
title:
  zh-CN: 排序
  en-US: Order
---

## zh-CN

通过 Order 来改变元素的排序。

## en-US

To change the element sort by order.

```jsx
import { Row, Col, Divider } from 'antd';

ReactDOM.render(
  <>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Normal
    </Divider>
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
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Responsive
    </Divider>
    <Row>
      <Col span={6} order={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        1 col-order-esponsive
      </Col>
      <Col span={6} order={{ xs: 2, sm: 1, md: 4, lg: 3 }}>
        2 col-order-esponsive
      </Col>
      <Col span={6} order={{ xs: 3, sm: 4, md: 1, lg: 2 }}>
        3 col-order-esponsive
      </Col>
      <Col span={6} order={{ xs: 4, sm: 3, md: 2, lg: 1 }}>
        4 col-order-esponsive
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
