---
order: 15
title: 
  zh-CN: 动态增减表单项
  en-US: Dynamic form item
---

## zh-CN

动态增加、减少表单项。

## en-US

Add or remove form items dynamically.

````jsx
import { Form, Input, Button } from 'antd';

let uuid = 0;
let Demo = React.createClass({
  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    let keys = form.getFieldValue('keys');
    keys = keys.filter((key) => {
      return key !== k;
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys,
    });
  },
  add() {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    let keys = form.getFieldValue('keys');
    keys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys,
    });
  },
  submit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log(errors);
      }
      console.log(values);
    });
  },
  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    getFieldProps('keys', {
      initialValue: [0],
    });

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const formItems = getFieldValue('keys').map((k) => {
      return (
        <Form.Item {...formItemLayout} label={`good friend${k}：`} key={k}>
          <Input {...getFieldProps(`name${k}`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Your good friend's name",
            }],
          })} style={{ width: '80%', marginRight: 8 }}
          />
          <Button onClick={() => this.remove(k)}>remove</Button>
        </Form.Item>
      );
    });
    return (
      <Form horizontal form={this.props.form}>
        {formItems}
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={this.add} style={{ marginRight: 8 }}>add good friend</Button>
          <Button type="primary" onClick={this.submit}>submit</Button>
        </Form.Item>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
