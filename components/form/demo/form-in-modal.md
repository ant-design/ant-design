---
order: 14
title: 与 Modal 配合使用
---

在 Modal 中使用 Form，当点击 Modal 的确定时，调用 `this.props.form.getFieldsValue` 获取表单内的值。

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
        <Modal title="登录" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
          <Form horizontal form={this.props.form}>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
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
