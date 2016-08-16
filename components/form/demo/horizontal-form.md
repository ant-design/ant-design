---
order: 2
title: 
  zh-CN: 典型表单
  en-US: Horizontal form
---

## zh-CN

示例展示了如何通过使用 `Form.create` 来获取和更新表单提交的数值。

## en-US

How to use `Form.create` to get and update values of form.

````jsx
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('Received values of form:', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="User name"
        >
          <p className="ant-form-text" id="userName" name="userName">Big eye minion</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          <Input type="password" {...getFieldProps('pass', { initialValue: '' })} placeholder="Please input the password" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Gender"
        >
          <RadioGroup {...getFieldProps('gender', { initialValue: 'female' })}>
            <Radio value="male">male</Radio>
            <Radio value="female">female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="remarks"
          help="Please input something"
        >
          <Input type="textarea" placeholder="Please input something" {...getFieldProps('remark', { initialValue: '' })} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span>Sold myself <Tooltip title="I come for Qiu Xiang"><Icon type="question-circle-o" /></Tooltip></span>}
        >
          <Checkbox {...getFieldProps('agreement', { initialValue: false, valuePropName: 'checked' })}>agree</Checkbox>
        </FormItem>
        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">OK</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
