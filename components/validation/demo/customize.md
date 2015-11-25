# 自定义校验规则

- order: 2

密码校验实例。

这里使用了 validation 的 `forceValidate(fields, callback)`  方法，在对第一次输入的密码进行校验时会触发二次密码的校验。

---

````jsx
import { Validation, Button, Form, Input, Row, Col } from 'antd';
import classNames from 'classnames';
const Validator = Validation.Validator;
const FormItem = Form.Item;

function noop() {
  return false;
}

const Demo = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    return {
      status: {
        pass: {},
        rePass: {}
      },
      formData: {
        pass: undefined,
        rePass: undefined
      },
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'L', // 密码强度
      rePassStrength: 'L'
    };
  },

  handleSubmit(e) {
    e.preventDefault();
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

  handleReset(e) {
    this.refs.validation.reset();
    this.setState(this.getInitialState());
    e.preventDefault();
  },

  renderValidateStyle(item) {
    const formData = this.state.formData;
    const status = this.state.status;

    const classes = classNames({
      'error': status[item].errors,
      'validating': status[item].isValidating,
      'success': formData[item] && !status[item].errors && !status[item].isValidating
    });

    return classes;
  },

  getPassStrenth(value, type) {
    if (value) {
      let strength;
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      if (type === 'pass') {
        this.setState({ passBarShow: true, passStrength: strength });
      } else {
        this.setState({ rePassBarShow: true, rePassStrength: strength });
      }
    } else {
      if (type === 'pass') {
        this.setState({ passBarShow: false });
      } else {
        this.setState({ rePassBarShow: false });
      }
    }
  },

  checkPass(rule, value, callback) {
    this.getPassStrenth(value, 'pass');

    if (this.state.formData.pass) {
      this.refs.validation.forceValidate(['rePass']);
    }

    callback();
  },

  checkPass2(rule, value, callback) {
    this.getPassStrenth(value, 'rePass');

    if (value && value !== this.state.formData.pass) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  renderPassStrengthBar(type) {
    const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
    const classSet = classNames({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H'
    });
    const level = {
      L: '低',
      M: '中',
      H: '高'
    };

    return (
      <div>
        <ul className={classSet}>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
          <span className="ant-form-text">
            {level[strength]}
          </span>
        </ul>
      </div>
    );
  },

  render() {
    const formData = this.state.formData;
    const status = this.state.status;

    return (
      <Form horizontal>
        <Validation ref="validation" onValidate={this.handleValidate}>
          <Row>
            <Col span="18">
              <FormItem
                label="密码："
                id="confirmPass"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                validateStatus={this.renderValidateStyle('pass')}
                help={status.pass.errors ? status.pass.errors.join(',') : null}
                required>
                  <Validator rules={[{required: true, whitespace: true, message: '请填写密码'}, {validator: this.checkPass}]} trigger="onChange">
                    <Input name="pass" id="confirmPass" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" value={formData.pass}/>
                  </Validator>
              </FormItem>
            </Col>
            <Col span="6">
              {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
            </Col>
          </Row>

          <Row>
            <Col span="18">
              <FormItem
                label="确认密码："
                id="confirmPass2"
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                validateStatus={this.renderValidateStyle('rePass')}
                help={status.rePass.errors ? status.rePass.errors.join(',') : null}
                required>
                  <Validator rules={[{
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码'
                  }, {validator: this.checkPass2}]}>
                    <Input name="rePass" id="confirmPass2" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" value={formData.rePass}/>
                    </Validator>
              </FormItem>
            </Col>
            <Col span="6">
              {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
            </Col>
          </Row>

          <FormItem
            wrapperCol={{span: 12, offset: 6}}
            required>
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Validation>
      </Form>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('components-validation-demo-customize'));
````

````css
.ant-pwd-strength {
  display: inline-block;
  margin-left: 8px;
  line-height: 32px;
  height: 32px;
  vertical-align: middle;
}

.ant-pwd-strength-item {
  float: left;
  margin-right: 1px;
  margin-top: 12px;
  width: 19px;
  height: 8px;
  line-height: 8px;
  list-style: none;
  background-color: #f3f3f3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ant-pwd-strength-item-1 {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.ant-pwd-strength-item-2 {
  width: 20px;
}

.ant-pwd-strength-item-3 {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-right: 8px;
}

.ant-pwd-strength-low .ant-pwd-strength-item-1, .ant-pwd-strength-medium .ant-pwd-strength-item-1, .ant-pwd-strength-high .ant-pwd-strength-item-1 {
  background-color: #FAC450;
}

.ant-pwd-strength-medium .ant-pwd-strength-item-2, .ant-pwd-strength-high .ant-pwd-strength-item-2 {
  background-color: rgba(135, 208, 104, .6);
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#9987D068,endColorstr=#9987D068);
}

.ant-pwd-strength-high .ant-pwd-strength-item-3 {
  background-color: #87D068;
}
````
