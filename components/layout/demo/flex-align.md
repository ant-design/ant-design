---
order: 5
title: Flex 对齐
---

Flex 子元素垂直对齐。

````jsx
import { Row, Col } from 'antd';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

ReactDOM.render(
  <div>
    <p>顶部对齐</p>
    <Row type="flex" justify="center" align="top">
      <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
    </Row>

    <p>居中对齐</p>
    <Row type="flex" justify="space-around" align="middle">
      <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
    </Row>

    <p>底部对齐</p>
    <Row type="flex" justify="space-between" align="bottom">
      <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
      <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
    </Row>
  </div>,
  mountNode
);
````
