---
order: 3
title:
  zh-CN: 栅格排序
  en-US: Grid sort
---

## zh-CN

列排序。

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

## en-US

By using `push` and `pull` class you can easily change column order.

```tsx
import { Col, Row } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Row>
    <Col span={18} push={6}>
      col-18 col-push-6
    </Col>
    <Col span={6} pull={18}>
      col-6 col-pull-18
    </Col>
  </Row>
);

export default App;
```
