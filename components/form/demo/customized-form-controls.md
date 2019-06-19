---
order: 7
title:
  zh-CN: 自定义表单控件
  en-US: Customized Form Controls
---

## zh-CN

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

> - 提供受控属性 `value` 或其它与 [`valuePropName`](http://ant.design/components/form/#getFieldDecorator-参数) 的值同名的属性。
> - 提供 `onChange` 事件或 [`trigger`](http://ant.design/components/form/#getFieldDecorator-参数) 的值同名的事件。
> - 支持 ref：
>   - React@16.3.0 之前只有 Class 组件支持。
>   - React@16.3.0 及之后可以通过 [forwardRef](https://reactjs.org/docs/forwarding-refs.html) 添加 ref 支持。（[示例](https://codesandbox.io/s/7wj199900x)）

## en-US

Customized or third-party form controls can be used in Form, too. Controls must follow these conventions:

> - It has a controlled property `value` or other name which is equal to the value of [`valuePropName`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).
> - It has event `onChange` or an event which name is equal to the value of [`trigger`](http://ant.design/components/form/?locale=en-US#getFieldDecorator's-parameters).
> - Support ref:
>   - Can only use class component before React@16.3.0.
>   - Can use [forwardRef](https://reactjs.org/docs/forwarding-refs.html) to add ref support after React@16.3.0. ([Sample](https://codesandbox.io/s/7wj199900x))

```jsx
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const { state } = this;
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

ReactDOM.render(<WrappedDemo />, mountNode);
```
