---
order: 6
title:
  zh-CN: Flex 排序
  en-US: Flex Order
---

## zh-CN

通过 Flex 布局的 Order 来改变元素的排序。

## en-US

To change the element sort by Flex layout order.

```jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row type="flex">
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
  </div>,
  mountNode,
);
```
