---
order: 11
title:
  zh-CN: 表单联动
  en-US: Coordinated Controls
---

## zh-CN

使用 `setFieldsValue` 来动态设置其他控件的值。

## en-US

Use `setFieldsValue` to set other control's value programmaticly.

````jsx
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="Note"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Gender"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
            onChange: this.handleSelectChange,
          })(
            <Select placeholder="Select a option and change input text above">
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
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
