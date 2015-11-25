# 禁用状态

- order: 7

1) 单独为输入控件设置 `disabled` 属性；

2) 为 `<fieldset>` 设置 `disabled` 属性，可以禁用 `<fieldset>` 中包含的所有控件。

---

````jsx
import {Row, Col, Button, Input, Form} from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
  <Form horizontal>
    <FormItem
      label="单独禁用输入框："
      labelCol={{span:5}}
      wrapperCol={{span:12}}>
      <Input defaultValue="我是禁用的" disabled />
    </FormItem>

    <fieldset disabled>
      <legend>禁用的 fieldset</legend>
      <FormItem
        id="userName"
        label="用户名："
        labelCol={{span:5}}
        wrapperCol={{span:12}}
        required>
        <p className="ant-form-text">大眼萌 minion</p>
      </FormItem>
      <FormItem
        id="password"
        label="密码："
        labelCol={{span:5}}
        wrapperCol={{span:12}}
        required>
        <Input type="password" defaultValue="123456" id="password" />
      </FormItem>
      <Row>
        <Col span="12" offset="5">
          <Button htmlType="submit" type="primary">确定</Button>
        </Col>
      </Row>
    </fieldset>
  </Form>
, document.getElementById('components-form-demo-disabled'));
````
