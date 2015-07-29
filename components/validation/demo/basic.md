# 基本

- order: 0

表单校验实例

---

````jsx
var Validation = antd.Validation;
var Validator = Validation.Validator;
var Select = antd.Select;
var Option = Select.Option;

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
        must: {},
        email: {},
        name: {},
        select: {},
        startDate: {},
        endDate: {}
      },
      formData: {
        must: undefined,
        email: undefined,
        name: undefined,
        select: undefined,
        startDate: undefined,
        endDate: undefined
      }
    };
  },

  validateStyle(item, hasFeedback=true) {
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
        if (value === 'yiminghe') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 1000);
    }
  },

  render() {
    var formData = this.state.formData;
    var status = this.state.status;

    return (
    <form onSubmit={this.handleSubmit} className="ant-form-horizontal">
      <Validation ref='validation' onValidate={this.handleValidate}>
        <div className="ant-form-item">
          <label className="col-6" for="must" required>必填选项：</label>
          <div className="col-12">
            <div className= {this.validateStyle("must")}>
              <Validator rules={[{required: true, message: '该项必填' }]}>
                <input name='must' className="ant-input" id="must" value={formData.must} />
              </Validator>
              {status.must.errors ? <div className="ant-form-explain">{status.must.errors.join(',')}</div> : null}
            </div>
          </div>
        </div>

        <div className="ant-form-item">
          <label className="col-6" for="email" required>邮箱校验：</label>
          <div className="col-12">
            <div className= {this.validateStyle("email")}>
              <Validator rules={{type: 'email', message: '请填写正确的邮箱地址'}} trigger="onBlur">
                <input name='email' className="ant-input" value={formData.email} onChange={this.setField.bind(this, 'email')}/>
              </Validator>
              {status.email.isValidating ? <div className="ant-form-explain">正在校验中...</div> : null}
              {status.email.errors ? <div className="ant-form-explain">{status.email.errors.join(',')}</div> : null}
            </div>
          </div>
        </div>

        <div className="ant-form-item">
          <label className="col-6" for="name" required>用户名：</label>
          <div className="col-12">
            <div className= {this.validateStyle("name")}>
              <Validator rules={[{required: true, min: 5, message: '用户名至少为 5 个字符'}, {validator: this.userExists}]}>
                <input name='name' className="ant-input" value={formData.name} />
              </Validator>
              {status.name.isValidating ? <div className="ant-form-explain">正在校验中...</div> : null}
              {status.name.errors ? <div className="ant-form-explain">{status.name.errors.join(',')}</div> : null}
            </div>
          </div>
        </div>

        <div className="ant-form-item">
          <label className="col-6" for="select" required>选择框：</label>
          <div className="col-12">
            <div className= {this.validateStyle("select", false)}>
              <Validator rules={[{required: true, message: '请输入'}]}>
                <Select style={{width:200}} name="select">
                  <Option value="jack">jack</Option>
                  <Option value="lucy">lucy</Option>
                  <Option value="disabled" disabled>disabled</Option>
                  <Option value="yiminghe">yiminghe</Option>
                </Select>
              </Validator>
              {status.select.errors ? <div className="ant-form-explain">{status.select.errors.join(',')}</div> : null}
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
