---
order: 1
title:
  zh-CN: 单位
  en-US: Unit
---

## zh-CN

通过前缀和后缀添加单位。

## en-US

Add unit through `prefix` and `suffix`.

```jsx
import { Statistic, Row, Col } from 'antd';

ReactDOM.render(
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Account Balance" value={1128} precision={2} prefix="¥" />
    </Col>
    <Col span={12}>
      <Statistic title="Unmerged" value={93} suffix="/ 100" />
    </Col>
  </Row>,
  mountNode
);
```
