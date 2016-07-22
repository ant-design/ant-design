---
order: 5
title: 表单组合
---

集中营，展示和表单相关的其他 ant-design 组件。

````jsx
import { Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
         Cascader, Slider, Button, Col, Upload, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const areaData = [{
  value: 'shanghai',
  label: '上海',
  children: [{
    value: 'shanghaishi',
    label: '上海市',
    children: [{
      value: 'pudongxinqu',
      label: '浦东新区',
    }],
  }],
}];

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
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
          label="InputNumber 数字输入框"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <InputNumber min={1} max={10} style={{ width: 100 }}
            {...getFieldProps('inputNumber', { initialValue: 3 })}
          />
          <span className="ant-form-text"> 台机器</span>
        </FormItem>

        <FormItem
          label="我是标题"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>
          <p className="ant-form-text">
            <a href="#">链接文字</a>
          </p>
        </FormItem>

        <FormItem
          label="Switch 开关"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Switch {...getFieldProps('switch', { valuePropName: 'checked' })} />
        </FormItem>

        <FormItem
          label="Slider 滑动输入条"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          required
        >
          <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} {...getFieldProps('slider')} />
        </FormItem>

        <FormItem
          label="Select 选择器"
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
          label="级联选择"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
          hasFeedback
        >
          <Cascader style={{ width: 200 }} options={areaData} {...getFieldProps('area')} />
        </FormItem>

        <FormItem
          label="DatePicker 日期选择框"
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
          label="TimePicker 时间选择器"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          required
        >
          <TimePicker {...getFieldProps('time')} />
        </FormItem>

        <FormItem
          label="选项"
          labelCol={{ span: 8 }}
        >
          <RadioGroup {...getFieldProps('rg')}>
            <RadioButton value="a">选项一</RadioButton>
            <RadioButton value="b">选项二</RadioButton>
            <RadioButton value="c">选项三</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="logo图"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          help="提示信息要长长长长长长长长长长长长长长"
        >
          <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}
            {...getFieldProps('upload', {
              valuePropName: 'fileList',
              normalize: this.normFile,
            })}
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);

ReactDOM.render(<Demo />, mountNode);
````
