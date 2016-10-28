---
order: 6
title:
  zh-CN: 表单组合
  en-US: Mix
---

## zh-CN

集中营，展示和表单相关的其他 ant-design 组件。

## en-US

A mix to demonstrate others ant-design component related to form.

````jsx
import { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
         Cascader, Slider, Button, Col, Upload, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const areaData = [{
  value: 'shanghai',
  label: 'Shanghai',
  children: [{
    value: 'shanghaishi',
    label: 'Shanghai',
    children: [{
      value: 'pudongxinqu',
      label: 'Pudong New District',
    }],
  }],
}];

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('Received the values of form', this.props.form.getFieldsValue());
  },

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          label="I'm the title"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <p className="ant-form-text" id="static" name="static">O, wind, if winter comes, can spring be far behind?</p>
          <p className="ant-form-text">
            <a href="#">link</a>
          </p>
        </FormItem>

        <FormItem
          label="InputNumber"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          {getFieldDecorator('inputNumber', { initialValue: 3 })(
            <InputNumber min={1} max={10} style={{ width: 100 }} />
          )}
          <span className="ant-form-text"> machines</span>
        </FormItem>

        <FormItem
          label="Switch"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          {getFieldDecorator('switch', { valuePropName: 'checked' })(
            <Switch />
          )}
        </FormItem>

        <FormItem
          label="Slider"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          {getFieldDecorator('slider')(
            <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
          )}
        </FormItem>

        <FormItem
          label="Select"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          {getFieldDecorator('select')(
            <Select style={{ width: 200 }}>
              <Option value="Jack">jack</Option>
              <Option value="Lucy">lucy</Option>
              <Option value="disabled" disabled>disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Cascader"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
          hasFeedback
        >
          {getFieldDecorator('area')(
            <Cascader style={{ width: 200 }} options={areaData} />
          )}
        </FormItem>

        <FormItem
          label="DatePicker"
          labelCol={{ span: 8 }}
          required
        >
          <Col span="6">
            <FormItem>
              {getFieldDecorator('startDate')(
                <DatePicker />
              )}
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <FormItem>
              {getFieldDecorator('endDate')(
                <DatePicker />
              )}
            </FormItem>
          </Col>
        </FormItem>


        <FormItem
          label="TimePicker"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          {getFieldDecorator('time')(
            <TimePicker />
          )}
        </FormItem>

        <FormItem
          label="Options"
          labelCol={{ span: 8 }}
        >
          {getFieldDecorator('rg')(
            <RadioGroup>
              <RadioButton value="a">item 1</RadioButton>
              <RadioButton value="b">item 2</RadioButton>
              <RadioButton value="c">item 3</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          label="logo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          help="longgggggggggggggggggggggggggggggggggg"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            normalize: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">OK</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
