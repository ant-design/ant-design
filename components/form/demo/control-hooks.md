---
order: 1
title:
  zh-CN: 表单控制
  en-US: Form control
---

## zh-CN

使用 Hooks 对表单进行控制。

## en-US

Control data of form by hooks.

```tsx
import { Form, Input, Button } from 'antd';

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="username">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button> <Button htmlType="button" onClick={onReset}>
        Reset
      </Button>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
