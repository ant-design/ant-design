# 表单校验

- order: 11

基本的表单校验例子。

---

````jsx
import { Button, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class BasicDemo extends React.Component {
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd']);
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  render() {
    const { isFieldValidating, getFieldError } = this.props.form;

    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          label="用户名："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          id="name"
          fieldOption={{
            rules: [
              { required: true, min: 5, message: '用户名至少为 5 个字符' },
              { validator: this.userExists },
            ],
          }}
          help={isFieldValidating('name') ? '正在校验中..' : (getFieldError('name') || []).join(', ')}>
          <Input placeholder="实时校验，输入 JasonWood 看看" />
        </FormItem>

        <FormItem
          label="邮箱："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          id="email"
          fieldOption={{
            validate: [{
              rules: [
                { required: true },
              ],
              trigger: 'onBlur',
            }, {
              rules: [
                { type: 'email', message: '请输入正确的邮箱地址' },
              ],
              trigger: ['onBlur', 'onChange'],
            }]
          }}>
          <Input type="email" placeholder="onBlur 与 onChange 相结合" />
        </FormItem>

        <FormItem
          label="密码："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          id="passwd"
          fieldOption={{
            rules: [
              { required: true, whitespace: true, message: '请填写密码' },
              { validator: this.checkPass.bind(this) },
            ],
          }}>
          <Input type="password" autoComplete="off"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
        </FormItem>

        <FormItem
          label="确认密码："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          hasFeedback
          id="rePasswd"
          fieldOption={{
            rules: [{
              required: true,
              whitespace: true,
              message: '请再次输入密码',
            }, {
              validator: this.checkPass2.bind(this),
            }],
          }}>
          <Input type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
        </FormItem>

        <FormItem
          label="备注："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
          id="textarea"
          fieldOption={{
            rules: [
              { required: true, message: '真的不打算写点什么吗？' },
            ],
          }}>
          <Input type="textarea" placeholder="随便写" id="textarea" name="textarea" />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }} >
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          &nbsp;&nbsp;&nbsp;
        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

BasicDemo = createForm({})(BasicDemo);

ReactDOM.render(<BasicDemo />, mountNode);
````