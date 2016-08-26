---
order: 13
title:
  zh-CN: 自定义校验规则
  en-US: Customized validation
---

## zh-CN

密码校验实例。

这里使用了 `this.props.form.validateFields` 方法，在对第一次输入的密码进行校验时会触发二次密码的校验。

## en-US

Customized validation for Password.

To use `this.props.form.validateFields` method, when validating first password you enter will trigger the seconcd password validation.

````jsx
import { Button, Form, Input, Row, Col } from 'antd';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let Demo = React.createClass({
  getInitialState() {
    return {
      dirty: false,
      passBarShow: false, // Whether to display a tooltip of password strength
      rePassBarShow: false,
      passStrength: 'L', // Password strength
      rePassStrength: 'L',
    };
  },

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  getPassStrenth(value, type) {
    if (value) {
      let strength;
      // Customized the password strength, here is just a simple example
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      this.setState({
        [`${type}BarShow`]: true,
        [`${type}Strength`]: strength,
      });
    } else {
      this.setState({
        [`${type}BarShow`]: false,
      });
    }
  },

  checkPass(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'pass');

    if (form.getFieldValue('pass') && this.state.dirty) {
      form.validateFields(['rePass'], { force: true });
    }

    callback();
  },

  checkPass2(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'rePass');

    if (value && value !== form.getFieldValue('pass')) {
      callback('Two passwords you enter is inconsistent!');
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
      'ant-pwd-strength-high': strength === 'H',
    });
    const level = {
      L: 'Low',
      M: 'Middle',
      H: 'High',
    };

    return (
      <div>
        <ul className={classSet}>
          <li className="ant-pwd-strength-item ant-pwd-strength-item-1" />
          <li className="ant-pwd-strength-item ant-pwd-strength-item-2" />
          <li className="ant-pwd-strength-item ant-pwd-strength-item-3" />
          <span className="ant-form-text">
            {level[strength]}
          </span>
        </ul>
      </div>
    );
  },

  render() {
    const { getFieldProps } = this.props.form;

    const passProps = getFieldProps('pass', {
      rules: [
        { required: true, whitespace: true, message: 'Please enter your password' },
        { validator: this.checkPass },
      ],
      onChange: (e) => {
        console.log('Your password is stolen in this way', e.target.value);
      },
    });
    const rePassProps = getFieldProps('rePass', {
      rules: [{
        required: true,
        whitespace: true,
        message: 'Please confirm your password',
      }, {
        validator: this.checkPass2,
      }],
    });
    return (
      <div>
        <Form vertical style={{ maxWidth: 600 }} form={this.props.form}>
          <Row type="flex" align="middle">
            <Col span={12}>
              <FormItem label="Password">
                <Input {...passProps} type="password"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off" id="pass"
                  onBlur={(e) => {
                    const value = e.target.value;
                    this.setState({ dirty: this.state.dirty || !!value });
                  }}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
            </Col>
          </Row>
          <Row type="flex" align="middle">
            <Col span={12}>
              <FormItem label="Confirm">
                <Input {...rePassProps} type="password"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off" id="rePass"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
            </Col>
          </Row>
          <FormItem><Button type="primary" onClick={this.handleSubmit}>提交</Button></FormItem>
        </Form>
      </div>
    );
  },
});

Demo = createForm()(Demo);

ReactDOM.render(<Demo />, mountNode);
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
