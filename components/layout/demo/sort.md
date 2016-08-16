---
order: 3
title: 
  zh-CN: 布局排序
  en-US: Layout sort
---

## zh-CN

列排序。

通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。

## en-US

By using `push` and` pull` class you can easily change column order.

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={18} push={6}>.ant-col-18 .ant-col-push-6</Col>
      <Col span={6} pull={18}>.ant-col-6 .ant-col-pull-18</Col>
    </Row>
  </div>,
  mountNode
);
````
