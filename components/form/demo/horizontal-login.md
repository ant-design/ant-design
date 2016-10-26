---
order: 0
title:
  zh-CN: 水平登陆栏
  en-US: Horizontal Login Form
---

## zh-CN

水平登陆栏，常用在顶部导航栏中。

## en-US

Horizontal login form is often used in navigation bar.

````jsx
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const HorizontalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Log in</Button>
        </FormItem>
      </Form>
    );
  },
}));

ReactDOM.render(<HorizontalLoginForm />, mountNode);
````
