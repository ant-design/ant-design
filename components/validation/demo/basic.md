# 基本

- order: 0

表单校验实例

---

````jsx
var Validation = antd.Validation;
var Validator = Validation.Validator;

function toNumber(v) {
  var num = Number(v);
  // num === ' '
  if (!isNaN(num)) {
    num = parseInt(v);
  }
  return isNaN(num) ? v : num;
}

function cx(classNames) {
  if (typeof classNames === 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

var Form = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    return {
      status: {
        number: {},
        pass: {},
        pass2: {},
        blurNumber: {},
        optionalNumber: {},
        name: {},
        must: {}
      },
      formData: {
        number: 0,
        pass: undefined,
        pass2: undefined,
        blurNumber: undefined,
        optionalNumber: undefined,
        name: undefined,
        must: undefined
      }
    };
  },

  handleReset(e) {
    this.refs.validation.reset();
    this.setState(this.getInitialState());
    e.preventDefault();
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

  userExists(rule, value, callback) {

    if (!value) {
      callback();
    } else {
      setTimeout(function () {
        if (value === '1') {
          callback([new Error('are you kidding?')]);
        } else if (value === 'yiminghe') {
          callback([new Error('forbid yiminghe')]);
        } else {
          callback();
        }
      }, 1000);
    }
  },

  checkPass(rule, value, callback) {
    if (this.state.formData.pass2) {
      this.refs.validation.forceValidate(['pass2']);
    }
      callback();
  },

  checkPass2(rule, value, callback) {
    if (value !== this.state.formData.pass) {
      callback('two password are not same!');
    } else {
      callback();
    }
  },

  render() {
    var formData = this.state.formData;
    var status = this.state.status;
    
    var nameClasses = cx({
      'has-feedback': true,
      'has-error': status.name.errors,
      'is-validating': status.name.isValidating,
      'has-success': formData.name && !status.name.errors && !status.name.isValidating
    });

    return (
    <form onSubmit={this.handleSubmit} className="ant-form-horizontal">
      <Validation ref='validation' onValidate={this.handleValidate}>
        <div className="ant-form-item">
          <label className="col-6" for="name" required>用户名：</label>
          <div className="col-12">
            <div className= {nameClasses}>
              <Validator rules={[{required: true, min: 5}, {validator: this.userExists}]}>
                <input name='name' className="ant-input" id="name" value={formData.name}/>
              </Validator>
              {status.name.isValidating ? <div className="ant-form-explain">信息审核中...</div> : null}
              {status.name.errors ? <div className="ant-form-explain">{status.name.errors.join(',')}</div> : null}
            </div>
          </div>
        </div>

        <div className="ant-form-item">
          <div className="col-offset-6 col-12">
            <button type="submit" className="ant-btn ant-btn-primary">确 定</button>
          &nbsp;&nbsp;&nbsp;
            <a href='#' className="ant-btn" onClick={this.handleReset}>重 置</a>
          </div>
        </div>
      </Validation>
    </form>
    );
  }
});

React.render(
<Form />
, document.getElementById('components-validation-demo-basic'));
````
