---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的展示。

## en-US

Simplest Usage.

```jsx
import { Statistic, Row, Col } from 'antd';

ReactDOM.render(
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="New Users" value={1024} />
    </Col>
  </Row>,
  mountNode
);
```
