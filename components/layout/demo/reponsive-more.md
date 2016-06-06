---
order: 8
title: 其他属性的响应式
---

`span` `pull` `push` `offset` `order` 属性可以通过内嵌到 `xs` `sm` `md` `lg` 属性中来使用。

其中 `xs={6}` 相当于 `xs={{ span: 6 }}`。

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <Row>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }} />
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} />
  </Row>
, mountNode);
````
