# 基本

- order: 0

基本的表单校验例子。

每个表单域要声明 `name` 属性作为校验的标识，可通过其 `isValidating`、`errors` 属性判断是否处于校验中、是否校验不通过状态，具体可参见 **用户名** 校验。

表单提交的时候，通过 Validation 的 validate 方法判断是否所有表单域校验通过（isValid 会作为回调函数的参数传入）。

---

````jsx

import {Validation, Select, Radio, Button, Datepicker, InputNumber, Form, Input} from 'antd';
const Validator = Validation.Validator;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

function noop() {
  return false;
}

const Demo = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    return {
      status: {
        email: {},
        name: {},
        select: {},
        radio: {},
        passwd: {},
        rePasswd: {},
        textarea: {},
        birthday: {},
        primeNumber: {}
      },
      formData: {
        email: undefined,
        name: undefined,
        select: undefined,
        radio: undefined,
        passwd: undefined,
        rePasswd: undefined,
        textarea: undefined,
        birthday: undefined,
        primeNumber: 9
      },
      isEmailOver: false, // email 是否输入完毕
      emailValidateMethod: 'onBlur' // 用于改变 email 的验证方法
    };
  },

  renderValidateStyle(item) {
    const formData = this.state.formData;
    const status = this.state.status;

    const classes = cx({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  },

  handleEmailInputBlur() {
    this.setState({
      isEmailOver: true
    });
  },

  handleEmailInputFocus() {
    if (this.state.isEmailOver) {
      this.setState({
        emailValidateMethod: 'onChange'
      });
    }
  },

  handleReset(e) {
    this.refs.validation.reset();
    this.setState(this.getInitialState());
    e.preventDefault();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isEmailOver: true
    });
    const validation = this.refs.validation;
    validation.validate((valid) => {
      if (!valid) {
        console.log('error in form');
        return;
      } else {
        console.log('submit');
      }
      console.log(this.state.formData);
    });
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(function () {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  checkPass(rule, value, callback) {
    if (this.state.formData.passwd) {
      this.refs.validation.forceValidate(['rePasswd']);
    }

    callback();
  },

  checkPass2(rule, value, callback) {
    if (value && value !== this.state.formData.passwd) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()){
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  },

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('8~12之间的质数明明是11啊!'));
    } else {
      callback();
    }
  },

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <FormItem
            label="用户名："
            id="name"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('name')}
            hasFeedback
            help={status.name.isValidating ? "正在校验中.." : status.name.errors ? status.name.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, min: 5, message: '用户名至少为 5 个字符'}, {validator: this.userExists}]}>
                <Input name="name" id="name" value={formData.name} placeholder="实时校验，输入 JasonWood 看看" onChange={this.setField.bind(this, 'name')} />
              </Validator>
          </FormItem>

          <FormItem
            label="邮箱："
            id="email"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('email')}
            hasFeedback={this.state.isEmailOver}
            help={status.email.errors ? status.email.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, type:'email', message: '请输入正确的邮箱地址'}]} trigger={this.state.emailValidateMethod}>
                <Input type="email" name="email" id="email" value={formData.email}  placeholder="onBlur 与 onChange 相结合" onBlur={this.handleEmailInputBlur} onFocus={this.handleEmailInputFocus} />
              </Validator>
          </FormItem>

          <FormItem
            label="国籍："
            id="select"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('select')}
            help={status.select.errors ? status.select.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择您的国籍'}]}>
                <Select size="large" placeholder="请选择国家" style={{width:"100%"}} name="select" value={formData.select}>
                  <Option value="china">中国</Option>
                  <Option value="use">美国</Option>
                  <Option value="japan">日本</Option>
                  <Option value="korean">韩国</Option>
                  <Option value="Thailand">泰国</Option>
                </Select>
              </Validator>
          </FormItem>

          <FormItem
            label="性别："
            id="radio"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('radio')}
            help={status.radio.errors ? status.radio.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择您的性别'}]}>
                <RadioGroup name="radio" value={formData.radio}>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
              </Validator>
          </FormItem>

          <FormItem
            label="密码："
            id="password"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('passwd')}
            hasFeedback
            help={status.passwd.errors ? status.passwd.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, whitespace: true, message: '请填写密码'}, {validator: this.checkPass}]}>
                <Input name="passwd" id="password" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.passwd}/>
              </Validator>
          </FormItem>

          <FormItem
            label="确认密码："
            id="password2"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('rePasswd')}
            hasFeedback
            help={status.rePasswd.errors ? status.rePasswd.errors.join(',') : null}
            required>
              <Validator rules={[{
                required: true,
                whitespace: true,
                message: '请再次输入密码'
              }, {validator: this.checkPass2}]}>
                <Input name="rePasswd" id="password2" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.rePasswd} placeholder="两次输入密码保持一致"/>
              </Validator>
          </FormItem>

          <FormItem
            label="生日："
            id="birthday"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('birthday')}
            help={status.birthday.errors ? status.birthday.errors.join(',') : null}
            required>
              <Validator rules={[{
                required: true,
                type: 'date',
                message: '你的生日是什么呢?'
              }, {validator: this.checkBirthday}]}>
                <Datepicker name="birthday" value={formData.birthday}></Datepicker>
              </Validator>
          </FormItem>

          <FormItem
            label="8~12间的质数："
            id="primeNumber"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('primeNumber')}
            help={status.primeNumber.errors ? status.primeNumber.errors.join(',') : null}
            required>
              <Validator rules={[{validator: this.checkPrime}]}>
                <InputNumber name="primeNumber" min={8} max={12} value={formData.primeNumber}/>
              </Validator>
          </FormItem>

          <FormItem
            label="备注："
            id="textarea"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('textarea')}
            help={status.textarea.errors ? status.textarea.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '真的不打算写点什么吗？'}]}>
                <Input type="textarea" placeholder="随便写" id="textarea" name="textarea" value={formData.textarea} />
              </Validator>
          </FormItem>

          <FormItem
            wrapperCol={{span: 12, offset: 7}} >
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Validation>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-validation-demo-basic'));
````
