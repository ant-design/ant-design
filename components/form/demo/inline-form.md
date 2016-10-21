---
order: 1
title:
  zh-CN: 平行排列
  en-US: Inline form
---

## zh-CN

行内排列，常用于登录界面。

## en-US

Inline form is often used for login.

````jsx
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('Received values of form:', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName')(
            <Input addonBefore={<Icon type="user" />} placeholder="Please input the account" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password')(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Please input the password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('agreement')(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
