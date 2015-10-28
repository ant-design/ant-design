# 布局排序

- order: 3

列排序。

通过使用 `.col-push-*` 和 `.col-pull-*` 类就可以很容易的改变列（column）的顺序。

---

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span="18" push="6">.col-18 .col-push-6</Col>
      <Col span="6" pull="18">.col-6 .col-pull-18</Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-sort')
);
````
