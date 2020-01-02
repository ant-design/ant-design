---
order: 5
title:
  zh-CN: 对齐
  en-US: Alignment
---

## zh-CN

子元素垂直对齐。

## en-US

Child elements vertically aligned.

```jsx
import { Row, Col } from 'antd';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

ReactDOM.render(
  <div>
    <p>Align Top</p>
    <Row justify="center" align="top">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <p>Align Center</p>
    <Row justify="space-around" align="middle">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>

    <p>Align Bottom</p>
    <Row justify="space-between" align="bottom">
      <Col span={4}>
        <DemoBox value={100}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={50}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={120}>col-4</DemoBox>
      </Col>
      <Col span={4}>
        <DemoBox value={80}>col-4</DemoBox>
      </Col>
    </Row>
  </div>,
  mountNode,
);
```

```css
#components-grid-demo-flex-align [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}
```
