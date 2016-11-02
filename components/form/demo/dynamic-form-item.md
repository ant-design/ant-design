---
order: 5
title:
  zh-CN: 动态增减表单项
  en-US: Dynamic Form Item
---

## zh-CN

动态增加、减少表单项。

## en-US

Add or remove form items dynamically.

````jsx
import { Form, Input, Button } from 'antd';

let uuid = 0;
let Demo = React.createClass({
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  },
  remove(k) {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  },
  add() {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const formItems = getFieldValue('keys').map((k) => {
      return (
        <Form.Item {...formItemLayout} label={`good friend${k}：`} key={k}>
          {getFieldDecorator(`name${k}`, {
            rules: [{
              required: true,
              whitespace: true,
              message: "Your good friend's name",
            }],
          })(
            <Input style={{ width: '60%', marginRight: 8 }} />
          )}
          <Button onClick={() => this.remove(k)}>Remove</Button>
        </Form.Item>
      );
    });
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={this.add} style={{ marginRight: 8 }}>Add good friend</Button>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);
ReactDOM.render(<Demo />, mountNode);
````
