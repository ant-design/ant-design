# 其他表单域校验

- order: 1

提供以下组件表单域的校验。

`Select` `Radio` `DatePicker` `InputNumber`。

---

````jsx
import {Validation, Select, Radio, Button, DatePicker, InputNumber, Form} from 'antd';
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

const Demo = React.createClass({
  mixins: [Validation.FieldMixin],

  getInitialState() {
    return {
      status: {
        select: {},
        multiSelect: {},
        radio: {},
        birthday: {},
        primeNumber: {}
      },
      formData: {
        select: undefined,
        multiSelect: undefined,
        radio: undefined,
        birthday: null,
        primeNumber: 9
      }
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
            label="国籍："
            id="select"
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('select')}
            help={status.select.errors ? status.select.errors.join(',') : null}
            required>
              <Validator rules={[{required: true, message: '请选择您的国籍'}]}>
                <Select size="large" placeholder="请选择国家" style={{width: '100%'}} name="select" value={formData.select}>
                  <Option value="china">中国</Option>
                  <Option value="use">美国</Option>
                  <Option value="japan">日本</Option>
                  <Option value="korean">韩国</Option>
                  <Option value="Thailand">泰国</Option>
                </Select>
              </Validator>
          </FormItem>

          <FormItem
            label="喜欢的颜色："
            labelCol={{span: 7}}
            wrapperCol={{span: 12}}
            validateStatus={this.renderValidateStyle('multiSelect')}
            help={status.multiSelect.errors ? status.multiSelect.errors.join(',') : null}
            required>
            <Validator rules={[{required: true, message: '请选择您喜欢的颜色', type: 'array'}]}>
              <Select multiple size="large" placeholder="请选择颜色" style={{width: '100%'}} name="multiSelect" value={formData.multiSelect}>
                <Option value="red">红色</Option>
                <Option value="orange">橙色</Option>
                <Option value="yellow">黄色</Option>
                <Option value="green">绿色</Option>
                <Option value="blue">蓝色</Option>
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
                <DatePicker name="birthday" value={formData.birthday} />
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
                <InputNumber name="primeNumber" min={8} max={12} value={formData.primeNumber} />
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

ReactDOM.render(<Demo />, document.getElementById('components-validation-demo-other-items'));
````
