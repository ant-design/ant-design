---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

头像有三种尺寸，两种形状可选。

## en-US

Three sizes and two shapes are available.

````jsx
import { Avatar, Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={4}><Avatar size="large" icon="user" /></Col>
      <Col span={4}><Avatar icon="user" /></Col>
      <Col span={4}><Avatar size="small" icon="user" /></Col>
    </Row>
    <Row>
      <Col span={4}><Avatar shape="square" size="large" icon="user" /></Col>
      <Col span={4}><Avatar shape="square" icon="user" /></Col>
      <Col span={4}><Avatar shape="square" size="small" icon="user" /></Col>
    </Row>
  </div>
, mountNode);
````
