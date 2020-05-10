---
order: 7
title:
  zh-CN: Flex 填充
  en-US: Flex Stretch
---

## zh-CN

Col 提供 `flex` 属性以支持填充。

## en-US

Col provides `flex` prop to support fill rest.

```jsx
import { Row, Col, Divider } from 'antd';

ReactDOM.render(
  <>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Percentage columns
    </Divider>
    <Row>
      <Col flex={2}>2 / 5</Col>
      <Col flex={3}>3 / 5</Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Fill rest 
    </Divider>
    <Row>
      <Col flex="100px">100px</Col>
      <Col flex="auto">Fill Rest</Col>
    </Row>
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      Raw flex style
    </Divider>
    <Row>
      <Col flex="1 1 200px">1 1 200px</Col>
      <Col flex="0 1 300px">0 1 300px</Col>
    </Row>
  </>,
  mountNode,
);
```
