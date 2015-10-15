# 基本

- order: 0

基本的表单校验例子。

每个表单域要声明 `name` 属性作为校验的标识，可通过其 `isValidating`、`errors` 属性判断是否处于校验中、是否校验不通过状态，具体可参见 **用户名** 校验。

表单提交的时候，通过 Validation 的 validate 方法判断是否所有表单域校验通过（isValid 会作为回调函数的参数传入）。

---

````jsx
var Validation = antd.Validation;
var Validator = Validation.Validator;
var Select = antd.Select;
var Option = Select.Option;
var Radio = antd.Radio;
var RadioGroup = antd.Radio.Group;
var Button = antd.Button;

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

var Form = React.createClass({
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
        textarea: {}
      },
      formData: {
        email: undefined,
        name: undefined,
        select: undefined,
        radio: undefined,
        passwd: undefined,
        rePasswd: undefined,
        textarea: undefined
      },
      isEmailOver: false, // email 是否输入完毕
      emailValidateMethod: 'onBlur' // 用于改变 email 的验证方法
    };
  },

  renderValidateStyle(item, hasFeedback=true) {
    var formData = this.state.formData;
    var status = this.state.status;

    var classes = cx({
      'has-feedback': hasFeedback,
      'has-error': status[item].errors,
      'is-validating': status[item].isValidating,
      'has-success': formData[item] && !status[item].errors && !status[item].isValidating
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
    var validation = this.refs.validation;
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
        if (value === 'Jasonwood') {
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

  render() {
    var formData = this.state.formData;
    var status = this.state.status;

    return (
      <form className="ant-form-horizontal">
        <Validation ref="validation" onValidate={this.handleValidate}>
          <div className="ant-form-item">
            <label className="col-7" htmlFor="name" required>用户名：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('name')}>
                <Validator rules={[{required: true, min: 5, message: '用户名至少为 5 个字符'}, {validator: this.userExists}]}>
                  <input name="name" id="name" className="ant-input" value={formData.name} placeholder="实时校验，输入 JasonWood 看看" />
                </Validator>
                {status.name.isValidating ? <div className="ant-form-explain">正在校验中...</div> : null}
                {status.name.errors ? <div className="ant-form-explain">{status.name.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-7" htmlFor="email" required>邮箱：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('email', this.state.isEmailOver)}>
                <Validator rules={[{required: true, type:'email', message: '请输入正确的邮箱地址'}]} trigger={this.state.emailValidateMethod}>
                  <input name="email" id="email" className="ant-input" value={formData.email}  placeholder="onBlur 与 onChange 相结合" onBlur={this.handleEmailInputBlur} onFocus={this.handleEmailInputFocus} />
                </Validator>
                {status.email.errors ? <div className="ant-form-explain">{status.email.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-7" required>国籍：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('select', false)}>
                <Validator rules={[{required: true, message: '请选择您的国籍'}]}>
                  <Select size="large" placeholder="请选择国家" style={{width:"100%"}} name="select" value={formData.select}>
                    <Option value="china">中国</Option>
                    <Option value="use">美国</Option>
                    <Option value="japan">日本</Option>
                    <Option value="korean">韩国</Option>
                    <Option value="Thailand">泰国</Option>
                  </Select>
                </Validator>
                {status.select.errors ? <div className="ant-form-explain">{status.select.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item ant-form-item-compact">
            <label className="col-7" required>性别：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('radio', false)}>
                <Validator rules={[{required: true, message: '请选择您的性别'}]}>
                  <RadioGroup name="radio" value={formData.radio}>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                  </RadioGroup>
                </Validator>
                {status.radio.errors ? <div className="ant-form-explain">{status.radio.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-7" htmlFor="password" required>密码：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('passwd')}>
                <Validator rules={[{required: true, whitespace: true, message: '请填写密码'}, {validator: this.checkPass}]}>
                  <input name="passwd" id="password" className="ant-input" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.passwd}/>
                </Validator>
                {status.passwd.errors ? <div className="ant-form-explain">{status.passwd.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-7" htmlFor="password2" required>确认密码：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('rePasswd')}>
                <Validator rules={[{
                  required: true,
                  whitespace: true,
                  message: '请再次输入密码'
                }, {validator: this.checkPass2}]}>
                  <input name="rePasswd" id="password2" className="ant-input" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.rePasswd} placeholder="两次输入密码保持一致"/>
                </Validator>
                {status.rePasswd.errors ? <div className="ant-form-explain"> {status.rePasswd.errors.join(', ')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-7" htmlFor="remark" required>备注：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('textarea', false)}>
                <Validator rules={[{required: true, message: '真的不打算写点什么吗？'}]}>
                  <textarea className="ant-input" id="remark" name="textarea" value={formData.textarea} placeholder="写点什么吧">
                  </textarea>
                </Validator>
                {status.textarea.errors ? <div className="ant-form-explain">{status.textarea.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>

          <div className="ant-form-item">
            <div className="col-offset-7 col-12">
              <Button type="primary" onClick={this.handleSubmit}>确 定</Button>
            &nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleReset}>重 置</Button>
            </div>
          </div>
        </Validation>
      </form>
    );
  }
});

React.render(<Form />, document.getElementById('components-validation-demo-basic'));
````
