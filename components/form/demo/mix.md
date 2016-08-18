---
order: 5
title: 
  zh-CN: 表单组合
  en-US: mix
---

## zh-CN

集中营，展示和表单相关的其他 ant-design 组件。

## en-US

A mix to demonstrate others ant-design component related to form.

````jsx
import { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
         Cascader, Slider, Button, Col, Upload, Icon } from 'antd';
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
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit} >
        <FormItem
          label="InputNumber Control"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <InputNumber min={1} max={10} style={{ width: 100 }}
            {...getFieldProps('inputNumber', { initialValue: 3 })}
          />
          <span className="ant-form-text"> machines</span>
        </FormItem>

        <FormItem
          label="I'm the title"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <p className="ant-form-text" id="static" name="static">O, wind, if winter comes, can spring be far behind?</p>
          <p className="ant-form-text">
            <a href="#">link</a>
          </p>
        </FormItem>

        <FormItem
          label="Switch"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })} />
        </FormItem>

        <FormItem
          label="Slider"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} {...getFieldProps('slider')} />
        </FormItem>

        <FormItem
          label="Select"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          <Select style={{ width: 200 }}
            {...getFieldProps('select')}
          >
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Cascader"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
          hasFeedback
        >
          <Cascader style={{ width: 200 }} options={areaData} {...getFieldProps('area')} />
        </FormItem>

        <FormItem
          label="DatePicker"
          labelCol={{ span: 8 }}
          required
        >
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('startDate')} />
            </FormItem>
          </Col>
          <Col span="1">
            <p className="ant-form-split">-</p>
          </Col>
          <Col span="6">
            <FormItem>
              <DatePicker {...getFieldProps('endDate')} />
            </FormItem>
          </Col>
        </FormItem>


        <FormItem
          label="TimePicker"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          <TimePicker {...getFieldProps('time')} />
        </FormItem>

        <FormItem
          label="Options"
          labelCol={{ span: 8 }}
        >
          <RadioGroup {...getFieldProps('rg')}>
            <RadioButton value="a">item 1</RadioButton>
            <RadioButton value="b">item 2</RadioButton>
            <RadioButton value="c">item 3</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="logo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          help="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
            {...getFieldProps('upload', {
              valuePropName: 'fileList',
              normalize: this.normFile,
            })}
          >
            <Button type="ghost">
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
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
