# 左右偏移

- order: 2

列偏移。

使用 `.col-offset-*` 类可以将列向右侧偏。例如，`.col-offset-4` 类将 `.col-4` 元素向右侧偏移了4个列（column）的宽度。

---

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span="8">.col-8</Col>
      <Col span="8" offset="8">.col-8</Col>
    </Row>
    <Row>
      <Col span="6" offset="6">.col-6 .col-offset-6</Col>
      <Col span="6" offset="6">.col-6 .col-offset-6</Col>
    </Row>
    <Row>
      <Col span="12" offset="6">.col-12 .col-offset-6</Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-offset')
);
````
