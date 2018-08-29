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
import { Form, Input, Button } from 'antd';
import Component from '@reactions/component';

const FormItem = Form.Item;
const FormCreate = Form.Create;

const HorizontalLoginForm = () => (
  <FormCreate>
    {({ getFieldDecorator, validateFields }) => (
      <Component initialState={{ itemLength: 1 }}>
        {({ setState, state: { itemLength } }) => {
          const handleSubmit = (e) => {
            e.preventDefault();
            validateFields((err, values) => {
              if (!err) {
                console.log('Received values of form: ', values);
              }
            });
          };
          const handleAdd = () => setState({ itemLength: itemLength + 1 });

          const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
          };
          const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
          };

          return (
            <Form onSubmit={handleSubmit}>
              {new Array(itemLength).fill(0).map((_, index) => {
                const name = `item${index}`;
                return (
                  <FormItem {...formItemLayout} label={name} key={name}>
                    {getFieldDecorator(name)(
                      <Input />
                    )}
                  </FormItem>
                );
              })}
              <FormItem {...formTailLayout}>
                <Button onClick={handleAdd}>
                  Add
                </Button>
              </FormItem>
              <FormItem {...formTailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </FormItem>
            </Form>
          );
        }}
      </Component>
    )}
  </FormCreate>
);

ReactDOM.render(<HorizontalLoginForm />, mountNode);
````
