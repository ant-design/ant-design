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
> * 不能是函数式组件。

## en-US

Customized or third-party form controls can be used in Form, too. Controls must follow these conventions:
> * It has a controlled property `value` or other name which is equal to the value of [`valuePropName`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).
> * It has event `onChange` or an event which name is equal to the value of [`trigger`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).
> * It must be a class component.

````jsx
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class PriceInput extends React.Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }
  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Price">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDemo = Form.create()(Demo);

ReactDOM.render(<WrappedDemo />, mountNode);
````
