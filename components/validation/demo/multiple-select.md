# 多选 Select

- order: 2

多选 Select 的校验例子。

---

````jsx
var Validation = antd.Validation;
var Validator = Validation.Validator;
var Select = antd.Select;
var Option = Select.Option;
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

var Form = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    return {
      status: {
        select: {}
      },
      formData: {
        select: undefined
      }
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

  render() {
    var formData = this.state.formData;
    var status = this.state.status;

    return (
      <form className="ant-form-horizontal">
        <Validation ref="validation" onValidate={this.handleValidate}>
          <div className="ant-form-item">
            <label className="col-7" required>喜欢的颜色：</label>
            <div className="col-12">
              <div className={this.renderValidateStyle('select', false)}>
                <Validator rules={[{required: true, message: '请选择您喜欢的颜色', type: 'array'}]}>
                  <Select multiple size="large" placeholder="请选择颜色" style={{width:"100%"}} name="select" value={formData.select}>
                    <Option value="red">红色</Option>
                    <Option value="orange">橙色</Option>
                    <Option value="yellow">黄色</Option>
                    <Option value="green">绿色</Option>
                    <Option value="blue">蓝色</Option>
                  </Select>
                </Validator>
                {status.select.errors ? <div className="ant-form-explain">{status.select.errors.join(',')}</div> : null}
              </div>
            </div>
          </div>
          
          <div className="ant-form-item">
            <div className="col-offset-6 col-12">
              <Button type="primary" onClick={this.handleSubmit}>确 定</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={this.handleReset}>重 置</Button>
            </div>
          </div>
        </Validation>
      </form>
    );
  }
});

ReactDOM.render(<Form />, document.getElementById('components-validation-demo-multiple-select'));
````
