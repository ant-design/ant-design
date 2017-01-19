---
order: 7
title:
  zh-CN: 响应式布局
  en-US: Responsive
---

## zh-CN

参照 Bootstrap 的 [响应式设计](http://getbootstrap.com/css/#grid-media-queries)，预设四个响应尺寸：`xs` `sm` `md` `lg`。

## en-US

Referring to the Bootstrap [responsive design] (http://getbootstrap.com/css/#grid-media-queries), here preset four dimensions: `xs` `sm` `md` `lg`.

````__react
import { Row, Col } from 'antd';

ReactDOM.render(
  <Row>
    <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
    <Col xs={20} sm={16} md={12} lg={8}>Col</Col>
    <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
  </Row>
, mountNode);
````
