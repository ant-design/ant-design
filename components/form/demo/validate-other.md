---
order: 12
title: 校验其他组件
---

提供以下组件表单域的校验：`Select` `Radio` `DatePicker` `InputNumber` `Cascader`。在 submit 时使用 `validateFieldsAndScroll`，进行校验，可以自动把不在可见范围内的校验不通过的菜单域滚动进可见范围。

````jsx
import { Select, Radio, Checkbox, Button, DatePicker, TimePicker, InputNumber, Form, Cascader, Icon } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

let Demo = React.createClass({
  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true,
    });
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
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
    const address = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州',
      }],
    }];
    const { getFieldProps } = this.props.form;
    const selectProps = getFieldProps('select', {
      rules: [
        { required: true, message: '请选择您的国籍' },
      ],
    });
    const multiSelectProps = getFieldProps('multiSelect', {
      rules: [
        { required: true, message: '请选择您喜欢的颜色', type: 'array' },
      ],
    });
    const radioProps = getFieldProps('radio', {
      rules: [
        { required: true, message: '请选择您的性别' },
      ],
    });
    const birthdayProps = getFieldProps('birthday', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '你的生日是什么呢？',
        }, {
          validator: this.checkBirthday,
        },
      ],
    });
    const timeProps = getFieldProps('time', {
      getValueFromEvent: (value, timeString) => timeString,
      rules: [
        { required: true, message: '请选择一个时间' },
      ],
    });
    const primeNumberProps = getFieldProps('primeNumber', {
      rules: [{ validator: this.checkPrime }],
    });
    const addressProps = getFieldProps('address', {
      rules: [{ required: true, type: 'array' }],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="国籍"
        >
          <Select {...selectProps} placeholder="请选择国家" style={{ width: '100%' }}>
            <Option value="china">中国</Option>
            <Option value="use">美国</Option>
            <Option value="japan">日本</Option>
            <Option value="korean">韩国</Option>
            <Option value="Thailand">泰国</Option>
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="喜欢的颜色"
        >
          <Select {...multiSelectProps} multiple placeholder="请选择颜色" style={{ width: '100%' }}>
            <Option value="red">红色</Option>
            <Option value="orange">橙色</Option>
            <Option value="yellow">黄色</Option>
            <Option value="green">绿色</Option>
            <Option value="blue">蓝色</Option>
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="性别"
        >
          <RadioGroup {...radioProps}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </RadioGroup>
          <span><Icon type="info-circle-o" /> 暂不支持其它性别</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="兴趣爱好"
        >
          <Checkbox {...getFieldProps('eat', {
            valuePropName: 'checked',
          })}>吃饭饭</Checkbox>
          <Checkbox {...getFieldProps('sleep', {
            valuePropName: 'checked',
          })}>睡觉觉</Checkbox>
          <Checkbox {...getFieldProps('beat', {
            valuePropName: 'checked',
          })}>打豆豆</Checkbox>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="生日"
        >
          <DatePicker {...birthdayProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="选一个时间"
        >
          <TimePicker {...timeProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="8~12间的质数"
        >
          <InputNumber {...primeNumberProps} min={8} max={12} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="选择地址"
        >
          <Cascader {...addressProps} options={address} />
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 7 }}
        >
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = createForm()(Demo);
ReactDOM.render(<Demo />, mountNode);
````
