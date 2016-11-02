---
order: 11
title:
  zh-CN: 校验其他组件
  en-US: Other Form Controls
---

## zh-CN

以上演示没有出现的表单控件对应的校验演示。

## en-US

Demostration for validataion configuration for form controls which are not show in the above demos.

````jsx
import { Select, Button, InputNumber, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const Demo = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
    });
  },

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('The prime number between 8 to 12 is 11!'));
    } else {
      callback();
    }
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Country"
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country' },
            ],
          })(
            <Select placeholder="Please select a country" style={{ width: '100%' }}>
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
              <Option value="japan">Japan</Option>
              <Option value="korean">Korea</Option>
              <Option value="Thailand">Thai</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Favourite colors"
        >
          {getFieldDecorator('multiSelect', {
            rules: [
              { required: true, message: 'Please select your favourite colors', type: 'array' },
            ],
          })(
            <Select multiple placeholder="Please select favourite colors" style={{ width: '100%' }}>
              <Option value="red">Red</Option>
              <Option value="orange">Orange</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Prime num between 8, 12"
        >
          {getFieldDecorator('primeNumber', {
            rules: [{ validator: this.checkPrime }],
          })(
            <InputNumber min={8} max={12} />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  },
}));

ReactDOM.render(<Demo />, mountNode);
````
