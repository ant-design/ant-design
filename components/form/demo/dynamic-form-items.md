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
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

const data = [];

for (let i = 0; i < 10; i++) {
  data.push({ name: `A${i}`, type: 'a' });
  data.push({ name: `B${i}`, type: 'b' });
}

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    const users = form.getFieldValue('users');
    if (users) {
      users.forEach(item => {
        if (item) {
          delete item.type;
        }
      });
      form.setFieldsValue({ users });
    }
  };

  return (
    <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.Item name="type">
        <Select options={options} onChange={handleChange} />
      </Form.Item>
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.type !== curValues.type || prevValues.users !== curValues.users
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Missing type' }]}
                      >
                        <Select disabled={!form.getFieldValue('type')} style={{ width: 100 }}>
                          {data
                            .filter(p => p.type === form.getFieldValue('type'))
                            .map(item => (
                              <Select.Option
                                key={item.name}
                                value={item.name}
                                disabled={
                                  form
                                    .getFieldValue('users')
                                    .findIndex(p => p && p.type === item.name) !== -1
                                }
                              >
                                {item.name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
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
