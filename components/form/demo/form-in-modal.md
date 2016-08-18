---
order: 14
title:
  zh-CN: 与 Modal 配合使用
  en-US: To use with modal
---

## zh-CN

在 Modal 中使用 Form，当点击 Modal 的确定时，调用 `this.props.form.getFieldsValue` 获取表单内的值。

## en-US

If you use Form in Modal, when you click the Modal, it could invoke `this.props.form.getFieldsValue` to get values of form.

````jsx
import { Button, Form, Input, Modal } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let Demo = React.createClass({
  getInitialState() {
    return { visible: false };
  },

  handleSubmit() {
    console.log(this.props.form.getFieldsValue());
    this.hideModal();
  },

  showModal() {
    this.setState({ visible: true });
  },

  hideModal() {
    this.setState({ visible: false });
  },

  render() {
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>点击有惊喜</Button>
        <Modal title="login" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
          <Form horizontal form={this.props.form}>
            <FormItem
              {...formItemLayout}
              label="User name"
            >
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              <Input {...getFieldProps('password', {})} type="password" autoComplete="off" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  },
});

Demo = createForm()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
