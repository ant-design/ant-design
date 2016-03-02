# 典型表单

- order: 2

示例展示了如何通过使用 `Form.create` 来获取和更新表单提交的数值。

---

````jsx
import { Form, Input, Button, Checkbox, Radio, Row, Col } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
          <p className="ant-form-text" id="userName" name="userName">大眼萌 minion</p>
        </FormItem>
        <FormItem
          label="密码："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
          <Input type="password" {...getFieldProps('pass')} placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="您的性别："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}>
          <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
            <Radio value="male">男的</Radio>
            <Radio value="female">女的</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="备注："
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          help="随便写点什么">
          <Input type="textarea" placeholder="随便写" {...getFieldProps('remark')} />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 14, offset: 6 }}>
          <label>
            <Checkbox {...getFieldProps('agreement')} />同意
          </label>
        </FormItem>
        <Row>
          <Col span="16" offset="6">
            <Button type="primary" htmlType="submit">确定</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
