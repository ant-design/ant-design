---
order: 15
title:
  zh-CN: 创建状态简单的表单应用
  en-US: Create a form application with simple state
---

## zh-CN

使用 `FormCreate` 组件，不需要再使用 `Form.create()`。

## en-US

Using the `FormCreate` component, you do not need to use `form.create ()`` again.

````jsx
import { Form, InputNumber, Button } from 'antd';
import Component from '@reactions/component';

const FormItem = Form.Item;
const FormCreate = Form.Create;

const SimpleForm = () => (
  <FormCreate>
    {({ getFieldDecorator, validateFields }) => (
      <Component initialState={{ result: 0 }}>
        {({ setState, state: { result } }) => {
          const handleAdd = (e) => {
            e.preventDefault();
            validateFields((err, { value }) => {
              if (!err) {
                setState({ result: result + value });
              }
            });
          };
          return (
            <Form onSubmit={handleAdd} layout="inline">
              <FormItem label="result">
                {result}
              </FormItem>
              <FormItem label="value">
                {getFieldDecorator('value', {
                  rules: [{ required: true }],
                })(<InputNumber />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Add
                </Button>
              </FormItem>
            </Form>
          );
        }}
      </Component>
    )}
  </FormCreate>
);

ReactDOM.render(<SimpleForm />, mountNode);
````
