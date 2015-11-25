# 输入框组合

- order: 4

各类输入框的组合展现。

---

````jsx
import {Form, Input, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

ReactDOM.render(
  <Form horizontal>
    <FormItem
      label="标签输入框："
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}>
      <Input addonBefore="Http://" defaultValue="mysite.com" id="site1"/>
    </FormItem>

    <FormItem
      label="标签输入框："
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}>
      <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" id="site2"/>
    </FormItem>

    <FormItem
      label="select 标签输入框："
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}>
      <InputGroup>
        <Input id="site4" placeholder="www.mysite" />
        <div className="ant-input-group-wrap">
          <Select defaultValue=".com" style={{width:70}}>
            <Option value=".com">.com</Option>
            <Option value=".jp">.jp</Option>
            <Option value=".cn">.cn</Option>
            <Option value=".org">.org</Option>
          </Select>
        </div>
      </InputGroup>
    </FormItem>

    <FormItem
      label="输入身份证："
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}>
      <InputGroup>
        <Col span="6">
          <Input id="certNo1" />
        </Col>
        <Col span="6">
          <Input id="certNo2" />
        </Col>
        <Col span="6">
          <Input id="certNo3" />
        </Col>
        <Col span="6">
          <Input id="certNo4" />
        </Col>
      </InputGroup>
    </FormItem>

    <FormItem
      label="电话号码："
      labelCol={{span: 6}}
      wrapperCol={{span: 16}}>
      <Row>
        <Col span="4">
          <Input id="tel1" defaultValue="086" />
        </Col>
        <Col span="2">
          <p className="ant-form-split">--</p>
        </Col>
        <Col span="18">
          <InputGroup>
            <Col span="8">
              <Input id="tel1" />
            </Col>
            <Col span="8">
              <Input id="tel2" />
            </Col>
            <Col span="8">
              <Input id="tel3" />
            </Col>
          </InputGroup>
        </Col>
      </Row>
    </FormItem>
  </Form>

, document.getElementById('components-form-demo-input-group'));
````
