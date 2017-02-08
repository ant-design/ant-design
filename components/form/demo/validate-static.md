---
order: 10
title:
  zh-CN: 校验提示
  en-US: Validation message
---

## zh-CN

我们为表单控件定义了三种校验状态，为 `<FormItem>` 定义 `validateStatus` 属性即可。

validateStatus: 'success', 'warning', 'error', 'validating'。

另外为输入框添加反馈图标，设置 `<FormItem>` 的 `hasFeedback` 属性值为 `true` 即可。

## en-US

We provide three kinds of validation status for form. You can use it just define `validateStatus` property on `<FormItem>`.

validateStatus: 'success', 'warning', 'error', 'validating'。

To set `hasFeedback` property to `true` enable to display feed icon of input control.

````__react
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
