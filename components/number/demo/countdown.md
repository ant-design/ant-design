---
order: 0
title:
  zh-CN: 单位
  en-US: Unit
only: true
---

## zh-CN

简单的展示。

## en-US

Simplest Usage.

```jsx
import { Number, Row, Col } from 'antd';
import moment from 'moment';
const deadline = Date.now() + 300000 * 123456; // Moment is also OK

ReactDOM.render(
  <Row gutter={16}>
    <Col span={12}>
      <Number title="倒计时" formatter="countdown" value={deadline} />
    </Col>
  </Row>,
  mountNode
);
```
