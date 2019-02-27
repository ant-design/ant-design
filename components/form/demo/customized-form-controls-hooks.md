---
order: 7
title:
  zh-CN: 自定义表单控件 DEBUG
  en-US: Customized Form Controls DEBUG
debug: true
---

````jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Form, Input, Button,
} from 'antd';

function NumberInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <Input ref={inputRef} {...props} />;
}

const MyNumberInput = forwardRef(NumberInput);

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
    const number = Number(value);
    if (Number.isNaN(number)) {
       callback('Not a number!');
      return;
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            rules: [{ validator: this.checkPrice }],
          })(<MyNumberInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

ReactDOM.render(<WrappedDemo />, mountNode);
````
