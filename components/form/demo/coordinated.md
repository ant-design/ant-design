---
order: 21
title:
  zh-CN: 表单联动
  en-US: Coordinated Controls
---

## zh-CN

使用 `setFieldsValue` 来动态设置其他控件的值。

## en-US

Use `setFieldsValue` to set other control's value programmaticly.

```tsx
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const App = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const onSelectChange = value => {
    console.log(value);
    form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  return (
    <Form
      form={form}
      name="coordinated"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="note"
        label="Note"
        rules={[{ required: true, message: 'Please input your note!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Select placeholder="Select a option and change input text above" onChange={onSelectChange}>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<App />, mountNode);
```
