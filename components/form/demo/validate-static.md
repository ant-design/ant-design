---
order: 6
title: 
  zh-CN: 校验提示
  en-US: Validation message
---

## zh-CN

我们为表单控件定义了三种校验状态，为 `<FormItem>` 定义 `validateStatus` 属性即可。

validateStatus: 'success', 'warning', 'error', 'validating'。

另外为输入框添加反馈图标，设置 `<FormItem>` 的 `hasFeedback` 属性值为 `true` 即可。

**注意**: 反馈图标只对 `<Input />` 有效。

## en-US

We provide three kinds of validation status for form. You can use it just define `validateStatus` property on `<FormItem>`.

validateStatus: 'success', 'warning', 'error', 'validating'。

To set `hasFeedback` property to `true` enable to display feed icon of input control.

**PS**: Feed icon is just available for `<Input />`.

````jsx
import { Form, Input, DatePicker, Col } from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
  <Form horizontal>
    <FormItem
      label="Fail"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      validateStatus="error"
      help="Please enter a combination of numbers and alphabets"
    >
      <Input defaultValue="unavailable choice" id="error" />
    </FormItem>

    <FormItem
      label="Warning"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      validateStatus="warning"
    >
      <Input defaultValue="Warning" id="warning" />
    </FormItem>

    <FormItem
      label="Validating"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input defaultValue="I'm the content is being validated" id="validating" />
    </FormItem>

    <FormItem
      label="Success"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="success"
    >
      <Input defaultValue="I'm the content" id="success" />
    </FormItem>

    <FormItem
      label="Warning"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="warning"
    >
      <Input defaultValue="Warning" id="warning" />
    </FormItem>

    <FormItem
      label="Fail"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="error"
      help="Please enter a combination of numbers and alphabets"
    >
      <Input defaultValue="unavailable choice" id="error" />
    </FormItem>

    <FormItem
      label="inline"
      labelCol={{ span: 5 }}
      help
    >
      <Col span="6">
        <FormItem validateStatus="error" help="Please select the correct date">
          <DatePicker />
        </FormItem>
      </Col>
      <Col span="1">
        <p className="ant-form-split">-</p>
      </Col>
      <Col span="6">
        <FormItem>
          <DatePicker />
        </FormItem>
      </Col>
    </FormItem>
  </Form>
, mountNode);
````
