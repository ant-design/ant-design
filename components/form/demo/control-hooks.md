---
order: 1
title:
  zh-CN: 表单方法调用
  en-US: Form methods
---

## zh-CN

通过 `Form.useForm` 对表单数据域进行交互。

## en-US

Call form method with `Form.useForm`.

```tsx
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      username: 'light',
      password: 'bamboo',
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item label="Name" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

```css
#components-form-demo-control-hooks .ant-btn {
  margin-right: 8px;
}
```
