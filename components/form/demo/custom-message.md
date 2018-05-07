---
order: 15
title:
  zh-CN: 自定义message
  en-US: Custom Message
---

## zh-CN

`message`可以使用ReactNode类型。

## en-US

You can use type ReactNode for `message`.

````jsx
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class App extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="Account"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('account', {
            rules: [{
              required: true,
              message: 'Account is required',
            }, {
              pattern: /^$/,
              message: (<span>Account does not exist, <a rel="noopener noreferrer" href="https://www.alipay.com/" target="_blank">Forgot account?</a></span>),
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedApp = Form.create()(App);

ReactDOM.render(<WrappedApp />, mountNode);
````
