---
order: 3
title: 输入框组合
---

各类输入框的组合展现。

````jsx
import { Input, Select, Col } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

ReactDOM.render(
  <div>
    <InputGroup size="large">
      <Input placeholder="www.mysite" />
      <div className="ant-input-group-wrap">
        <Select defaultValue=".com" style={{ width: 70 }}>
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
        </Select>
      </div>
    </InputGroup>
    <InputGroup size="large" style={{ marginTop: 8 }}>
      <Col span="4">
        <Input defaultValue="0571" />
      </Col>
      <Col span="8">
        <Input defaultValue="26888888" />
      </Col>
    </InputGroup>
  </div>
, mountNode);
````
