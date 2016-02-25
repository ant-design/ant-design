# 响应式

- order: 7

支持 xs、sm、md、lg 四种屏幕大小的响应式设计配置。

---

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div className="gutter-example">
    <Row gutter={16}>
      <Col xs={0} xs={2} xs={4} lg={6}>
        <div className="gutter-box">col</div>
      </Col>
      <Col xs={12} xs={10} xs={8} lg={6}>
        <div className="gutter-box">col</div>
      </Col>
      <Col xs={12} xs={10} xs={8} lg={6}>
        <div className="gutter-box">col</div>
      </Col>
      <Col xs={0} xs={10} xs={4} lg={6}>
        <div className="gutter-box">col</div>
      </Col>
    </Row>
  </div>
, mountNode);
````
