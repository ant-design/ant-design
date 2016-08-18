---
order: 2
title: 
  zh-CN: 左右偏移
  en-US: Offset
---

## zh-CN

列偏移。

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

## en-US

`Offset` can set the column to the right side. For example, using `offset = {4}` can set the element shifted to the right four columns width.

Column offset.


````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={8}>.ant-col-8</Col>
      <Col span={8} offset={8}>.ant-col-8</Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>.ant-col-6 .ant-col-offset-6</Col>
      <Col span={6} offset={6}>.ant-col-6 .ant-col-offset-6</Col>
    </Row>
    <Row>
      <Col span={12} offset={6}>.ant-col-12 .ant-col-offset-6</Col>
    </Row>
  </div>,
  mountNode
);
````
