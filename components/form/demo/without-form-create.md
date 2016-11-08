---
order: 9
title:
  zh-CN: 自行处理表单数据
  en-US: Handle Form Data Manually
---

## zh-CN

使用 `Form.create` 处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用 `Form.create` 并自行处理数据。

## en-US

`Form.create` will collect and validate form data automatically. But if you don't need this feature or the default behaviour cannot satisfy you business, you can drop `Form.create` and handle form data manually.

````jsx
import { Form, InputNumber } from 'antd';
const FormItem = Form.Item;

const RawForm = React.createClass({
  getInitialState() {
    return {
      number: {
        value: 11,
      },
    };
  },
  handleNumberChange(value) {
    this.setState({
      number: {
        ...this.validatePrimeNumber(value),
        value,
      },
    });
  },
  validatePrimeNumber(number) {
    if (number === 11) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'The prime number between 8 to 12 is 11!',
    };
  },
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    const number = this.state.number;
    return (
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="Prime num between 8 & 12"
          validateStatus={number.validateStatus}
          help={number.errorMsg}
        >
          <InputNumber
            min={8}
            max={12}
            value={number.value}
            onChange={this.handleNumberChange}
          />
        </FormItem>
      </Form>
    );
  },
});

ReactDOM.render(<RawForm />, mountNode);
````
