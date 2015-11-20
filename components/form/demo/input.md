# Input 输入框

- order: 0

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），具体使用详见 [API](/components/form/#input)。

注意： 在表单里面，我们只使用**大尺寸**， 即高度为 **32px**，作为唯一的尺寸。

---


````jsx
import {Row, Col, Input} from 'antd';
const InputGroup = Input.Group;

ReactDOM.render(
  <Row>
    <InputGroup>
      <Col span="6">
        <Input id="largeInput" size="large" placeholder="大尺寸" />
      </Col>
      <Col span="6">
        <Input id="defaultInput" placeholder="默认尺寸" />
      </Col>
      <Col span="6">
        <Input id="smallInput" placeholder="小尺寸" size="small" />
      </Col>
    </InputGroup>
  </Row>
, document.getElementById('components-form-demo-input'));
````
