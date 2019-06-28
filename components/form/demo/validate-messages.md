---
order: 7
title:
  zh-CN: 自定义校验信息
  en-US: Customize validate messages
---

## zh-CN

通过 `validateMessages` 或 `message` 自定义校验信息模板，模板内容可参考[此处](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts)。

## en-US

Customize validate message template with `validateMessages` or `message`. Ref [here](https://github.com/react-component/field-form/blob/master/src/utils/messages.ts) about message template.

```tsx
import { Form, Input, InputNumber, Button } from 'antd';

const validateMessages = {
  required: 'You should provide ${name}!',
};

const Demo = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form
      layout="vertical"
      name="validate-messages"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Form.Item name="username" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Password should not be empty!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
