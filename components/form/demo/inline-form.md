---
order: 1
title: 平行排列
---

行内排列，常用于登录界面。

````jsx
import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          label="账户"
        >
          <Input placeholder="请输入账户名"
            {...getFieldProps('userName')}
          />
        </FormItem>
        <FormItem
          label="密码"
        >
          <Input type="password" placeholder="请输入密码"
            {...getFieldProps('password')}
          />
        </FormItem>
        <FormItem>
          <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
        </FormItem>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
