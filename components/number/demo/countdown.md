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

const Countdown = Number.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

ReactDOM.render(
  <Row gutter={16}>
    <Col span={12}>
      <Countdown title="倒计时" value={deadline} />
    </Col>
    <Col span={12}>
      <Countdown title="倒计时" value={deadline} format="HH:mm:ss:SSS" />
    </Col>
    <Col span={24}>
      <Countdown title="倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
    </Col>
  </Row>,
  mountNode
);
```
