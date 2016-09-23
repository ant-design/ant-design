---
order: 0
title:
  zh-CN: 基础布局
  en-US: Basic Layout
---

## zh-CN

从堆叠到水平排列。

使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。

## en-US

From the stack to the horizontal arrangement.

You can create a basic grid system by using a single set of `Row` and` Col` grid assembly, ,all of the columns (Col) must be placed in `Row`.

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={12}>.ant-col-12</Col>
      <Col span={12}>.ant-col-12</Col>
    </Row>
    <Row>
      <Col span={8}>.ant-col-8</Col>
      <Col span={8}>.ant-col-8</Col>
      <Col span={8}>.ant-col-8</Col>
    </Row>
    <Row>
      <Col span={6}>.ant-col-6</Col>
      <Col span={6}>.ant-col-6</Col>
      <Col span={6}>.ant-col-6</Col>
      <Col span={6}>.ant-col-6</Col>
    </Row>
  </div>,
  mountNode
);
````
