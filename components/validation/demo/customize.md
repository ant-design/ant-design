# 自定义校验规则 

- order: 1

密码校验实例。

这里使用了 validation 的 `forceValidate(fields, callback)`  方法，在对第一次输入的密码进行校验时会触发二次密码的校验。

---

````jsx
var Validation = antd.Validation;
var Validator = Validation.Validator;
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

  handleReset(e) {
    this.refs.validation.reset();
    this.setState(this.getInitialState());
    e.preventDefault();
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

  getPassStrenth(value, type) {
    if (value) {
      var strength;
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      type === 'pass' ? this.setState({ passBarShow: true, passStrength: strength }) : this.setState({ rePassBarShow: true, rePassStrength: strength });
    } else {
      type === 'pass' ? this.setState({ passBarShow: false }) : this.setState({ rePassBarShow: false });
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
    var strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
    var classSet = cx({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H'
    });
    var level = {
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
    var formData = this.state.formData;
    var status = this.state.status;

    return (
      <form className="ant-form-horizontal">
        <Validation ref="validation" onValidate={this.handleValidate}>

          <div className="ant-form-item">
            <label className="col-6" htmlFor="confirmPass" required>密码：</label>
            <div className="col-10">
              <div className={this.renderValidateStyle('pass', false)}>
                <Validator rules={[{required: true, whitespace: true, message: '请填写密码'}, {validator: this.checkPass}]} trigger="onChange">
                  <input name="pass" id="confirmPass" className="ant-input" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.pass}/>
                </Validator>
                {status.pass.errors ? <div className="ant-form-explain">{status.pass.errors.join(',')}</div> : null}
              </div>
            </div>
            <div className="col-6">
              {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
            </div>
          </div>

          <div className="ant-form-item">
            <label className="col-6" htmlFor="confirmPass2" required>确认密码：</label>
            <div className="col-10">
              <div className={this.renderValidateStyle('rePass', false)}>
                <Validator rules={[{
                  required: true,
                  whitespace: true,
                  message: '请再次输入密码'
                }, {validator: this.checkPass2}]}>
                  <input name="rePass" id="confirmPass2" className="ant-input" type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autocomplete="off" value={formData.rePass}/>
                </Validator>
                {status.rePass.errors ? <div className="ant-form-explain"> {status.rePass.errors.join(', ')}</div> : null}
              </div>
            </div>
            <div className="col-6">
              {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
            </div>
          </div>

          <div className="ant-form-item">
            <div className="col-offset-6 col-12">
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

React.render(<Form />, document.getElementById('components-validation-demo-customize'));
````

<style>
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
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -moz-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
</style>
