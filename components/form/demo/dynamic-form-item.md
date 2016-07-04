---
order: 15
title: 动态增减表单项
---

动态增加、减少表单项。

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
        <Form.Item {...formItemLayout} label={`好朋友${k}：`} key={k}>
          <Input {...getFieldProps(`name${k}`, {
            rules: [{
              required: true,
              whitespace: true,
              message: '你好友的名字捏！',
            }],
          })} style={{ width: '80%', marginRight: 8 }}
          />
          <Button onClick={() => this.remove(k)}>删除</Button>
        </Form.Item>
      );
    });
    return (
      <Form horizontal form={this.props.form}>
        {formItems}
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={this.add} style={{ marginRight: 8 }}>新增好朋友</Button>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Form.Item>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
