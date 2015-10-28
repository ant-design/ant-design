# 基础布局

- order: 1

从堆叠到水平排列。

使用单一的一组 `.col-*` 栅格类，就可以创建一个基本的栅格系统，所有列（column）必须放在 `.row` 内。

---

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span="12">.col-12</Col>
      <Col span="12">.col-12</Col>
    </Row>
    <Row className="testRowClassName">
      <Col span="8">.col-8</Col>
      <Col span="8">.col-8</Col>
      <Col span="8" className="testColClassName">.col-8</Col>
    </Row>
    <Row>
      <Col span="6">.col-6</Col>
      <Col span="6">.col-6</Col>
      <Col span="6">.col-6</Col>
      <Col span="6">.col-6</Col>
    </Row>
  </div>,
  document.getElementById('components-layout-demo-basic')
);
````

<style>
.testRowClassName {
	background: #f0f0f0;
}
div.testColClassName {
	background: rgba(24, 115, 216, 0.9);
}
</style>
