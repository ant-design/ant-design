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
import { Statistic, Card, Row, Col, Icon } from 'antd';

ReactDOM.render(
  <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic title="Feedback" value={1128} valueStyle={{ color: '#3f8600' }} prefix={<Icon type="like" />} />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Card>
      </Col>
    </Row>
  </div>,
  mountNode
);
```
