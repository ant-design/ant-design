# Flex排序

- order: 6

通过 Flex 布局的 Order 来改变元素的排序。


---


````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row type="flex">
      <Col span="6" order="4">1 col-order-4</Col>
      <Col span="6" order="3">2 col-order-3</Col>
      <Col span="6" order="2">3 col-order-2</Col>
      <Col span="6" order="1">4 col-order-1</Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-flex-order')
);
````
