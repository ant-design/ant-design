---
order: 10
title:
  zh-CN: 自定义校验
  en-US: Customized Validation
---

## zh-CN

我们提供了 `validateStatus` `help` `hasFeedback` 等属性，你可以不需要使用 `Form.create` 和 `getFieldDecorator`，自己定义校验的时机和内容。

1. `validateStatus`: 校验状态，可选 'success', 'warning', 'error', 'validating'。
2. `hasFeedback`：用于给输入框添加反馈图标。
3. `help`：设置校验文案。

## en-US

We provide properties like `validateStatus` `help` `hasFeedback` to customize your own validate status and message, without using `Form.create` and `getFieldDecorator`.

1. `validateStatus`: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
2. `hasFeedback`: display feed icon of input control
3. `help`: display validate message.

````jsx
import { Form, Input, DatePicker, Col } from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
  <Form>
    <FormItem
      label="Fail"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </FormItem>

    <FormItem
      label="Warning"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      validateStatus="warning"
    >
      <Input placeholder="Warning" id="warning" />
    </FormItem>

    <FormItem
      label="Validating"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating" />
    </FormItem>

    <FormItem
      label="Success"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="success"
    >
      <Input placeholder="I'm the content" id="success" />
    </FormItem>

    <FormItem
      label="Warning"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="warning"
    >
      <Input placeholder="Warning" id="warning" />
    </FormItem>

    <FormItem
      label="Fail"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      hasFeedback
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
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
