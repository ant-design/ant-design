---
order: 7
title:
  zh-CN: 自定义表单控件
  en-US: Customized Form Controls
---

## zh-CN

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：
> * 提供受控属性 `value` 或其它与 [`valuePropName`](http://ant.design/components/form/#getFieldDecorator-参数) 的值同名的属性。
> * 提供 `onChange` 事件或 [`trigger`](http://ant.design/components/form/#getFieldDecorator-参数) 的值同名的事件。

## en-US

Customized or third-party form controls can be used in Form, too. Controls must follow these conventions:
> * It has a controlled property `value` or other name which is equal to the value of [`valuePropName`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).
> * It has event `onChange` or an event which name is equal to the value of [`trigger`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).


````jsx
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

const CustomizedInputNumber = React.createClass({
  getInitialState() {
    return {
      value: this.props.value || 0,
    };
  },
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  },
  handleChange(e) {
    const number = parseFloat(e.target.value || 0);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ value: number });
    }
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(number);
    }
  },
  render() {
    return (
      <Input
        type="text"
        size={this.props.size}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  },
});

const Demo = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem label="Number Only">
          {getFieldDecorator('number', {
            rules: [{ type: 'number' }],
          })(<CustomizedInputNumber />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  },
}));

ReactDOM.render(<Demo />, mountNode);
````
