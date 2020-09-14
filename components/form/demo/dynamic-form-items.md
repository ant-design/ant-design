---
order: 4.1
title:
  zh-CN: 动态增减嵌套字段
  en-US: Dynamic Form nest Items
---

## zh-CN

嵌套表单字段需要对 `field` 进行拓展，将 `field.name` 和 `field.fieldKey` 应用于控制字段。

## en-US

Nest dynamic field need extends `field`. Pass `field.name` and `field.fieldKey` to nest item.

```jsx
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Demo = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

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
