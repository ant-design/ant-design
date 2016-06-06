---
order: 1
title: 区块间隔
---

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔。

````jsx
import { Row, Col } from 'antd';

ReactDOM.render(
  <div className="gutter-example">
    <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">.ant-col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">.ant-col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">.ant-col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="gutter-box">.ant-col-6</div>
      </Col>
    </Row>
  </div>
, mountNode);
````

````css
.gutter-example .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #2db7f5;
  height: 80px;
  line-height: 80px;
  border-radius: 6px;
}
````
