# Flex布局

- order: 4

Flex 布局基础。

使用 `row-flex` 定义 `flex` 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。

---

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <p>子元素居左排列</p>
    <Row type="flex" justify="start">
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
    </Row>

    <p>子元素居中排列</p>
    <Row type="flex" justify="center">
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
    </Row>

    <p>子元素居右排列</p>
    <Row type="flex" justify="end">
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
    </Row>

    <p>子元素等宽排列</p>
    <Row type="flex" justify="space-between">
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
    </Row>

    <p>子元素分散对齐</p>
    <Row type="flex" justify="space-around">
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
      <Col span="4">.col-4</Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-flex')
);
````
