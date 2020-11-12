---
order: 1
title:
  zh-CN: 表单方法调用
  en-US: Form methods
---

## zh-CN

通过 `Form.useForm` 对表单数据域进行交互。

> 注意 `useForm` 是 [React Hooks](https://reactjs.org/docs/hooks-intro.html) 的实现，只能用于函数组件，class 组件请查看下面的例子。

## en-US

Call form method with `Form.useForm`.

> Note that `useForm` is a [React Hooks](https://reactjs.org/docs/hooks-intro.html) that only works in functional component.

```tsx
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Demo = () => {
  const [form] = Form.useForm();

  const onGenderChange = value => {
    form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : value === 'female' ? 'lady' : 'there'}!`,
    });
  };

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) => {
          return getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null;
        }}
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
