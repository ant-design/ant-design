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
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

ReactDOM.render(
  <Form>
    <FormItem
      {...formItemLayout}
      label="Fail"
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Warning"
      validateStatus="warning"
    >
      <Input placeholder="Warning" id="warning" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Success"
      hasFeedback
      validateStatus="success"
    >
      <Input placeholder="I'm the content" id="success" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Warning"
      hasFeedback
      validateStatus="warning"
    >
      <Input placeholder="Warning" id="warning" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Fail"
      hasFeedback
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Success"
      hasFeedback
      validateStatus="success"
    >
      <DatePicker style={{ width: '100%' }} />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Warning"
      hasFeedback
      validateStatus="warning"
    >
      <TimePicker style={{ width: '100%' }} />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Error"
      hasFeedback
      validateStatus="error"
    >
      <Select defaultValue="1">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Cascader defaultValue={['1']} options={[]} />
    </FormItem>

    <FormItem
      label="inline"
      {...formItemLayout}
    >
      <Col span={11}>
        <FormItem validateStatus="error" help="Please select the correct date">
          <DatePicker />
        </FormItem>
      </Col>
      <Col span={2}>
        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          -
        </span>
      </Col>
      <Col span={11}>
        <FormItem>
          <DatePicker />
        </FormItem>
      </Col>
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Success"
      hasFeedback
      validateStatus="success"
    >
      <InputNumber style={{ width: '100%' }} />
    </FormItem>
  </Form>
, mountNode);
````
