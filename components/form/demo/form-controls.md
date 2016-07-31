---
order: 3
title: 
  zh-CN: 表单控件
  en-US: Form controls
---

## zh-CN

展示所有支持的表单控件。

**注**： 输入框：只有正确设置了 type 属性的输入控件才能被赋予正确的样式。

## en-US

A list off all the controls that can be used with form.

**Note**: Input control: Only if set correct type for it, then it will be set correct style 

````jsx
import { Form, Input, Select, Checkbox, Radio } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Form horizontal>
    <FormItem
      id="control-input"
      label="input control"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Input id="control-input" placeholder="Please enter..." />
    </FormItem>

    <FormItem
      id="control-textarea"
      label="text area"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Input type="textarea" id="control-textarea" rows="3" />
    </FormItem>

    <FormItem
      id="select"
      label="Select box"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={handleSelectChange}>
        <Option value="jack">jack</Option>
        <Option value="lucy">lucy</Option>
        <Option value="disabled" disabled>disabled</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </FormItem>

    <FormItem
      label="Checkbox"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Checkbox className="ant-checkbox-vertical">item 1</Checkbox>
      <Checkbox className="ant-checkbox-vertical">item 2</Checkbox>
      <Checkbox className="ant-checkbox-vertical" disabled>item 3 (disabled)</Checkbox>
    </FormItem>

    <FormItem
      label="Checkbox"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Checkbox className="ant-checkbox-inline">item 1</Checkbox>
      <Checkbox className="ant-checkbox-inline">item 2</Checkbox>
      <Checkbox className="ant-checkbox-inline">item 3</Checkbox>
    </FormItem>

    <FormItem
      label="Radio"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <RadioGroup defaultValue="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
, mountNode);
````
