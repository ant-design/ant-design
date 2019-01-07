---
order: 1
title:
  zh-CN: 单位
  en-US: Unit
---

## zh-CN

简单的展示。

## en-US

Simplest Usage.

```jsx
import { Number, Row, Col } from 'antd';

ReactDOM.render(
  <Row gutter={16}>
    <Col span={12}>
      <Number title="Account Balance" value={1128} precision={2} prefix="¥" />
    </Col>
    <Col span={12}>
      <Number title="Unmerged" value={93} suffix="/ 100" />
    </Col>
  </Row>,
  mountNode
);
```
