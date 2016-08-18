---
order: 4
title: 
  zh-CN: 输入框组合
  en-US: Input group
---

## zh-CN

各类输入框的组合展现。

## en-US

Input group of different type input controls.

````jsx
import { Form, Input, Select, Col } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const selectAfter = (
  <Select defaultValue=".com" style={{ width: 70 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

ReactDOM.render(
  <Form horizontal>
    <FormItem
      label="Input control"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Input addonBefore="Http://" defaultValue="mysite.com" id="site1" />
    </FormItem>

    <FormItem
      label="Input control"
      labelCol={{ span: 6 }}
      validateStatus="success"
      wrapperCol={{ span: 16 }}
    >
      <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" id="site2" />
    </FormItem>

    <FormItem
      label="Select input control"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Input addonAfter={selectAfter} placeholder="www.mysite" id="site4" />
    </FormItem>

    <FormItem
      label="Please input your identity number"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <InputGroup>
        <Col span="6">
          <Input id="certNo1" />
        </Col>
        <Col span="6">
          <Input id="certNo2" />
        </Col>
        <Col span="6">
          <Input id="certNo3" />
        </Col>
        <Col span="6">
          <Input id="certNo4" />
        </Col>
      </InputGroup>
    </FormItem>

    <FormItem
      label="Tel"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <InputGroup>
        <Col span="4">
          <Input id="tel1" defaultValue="086" />
        </Col>
        <Col span="2">
          <p className="ant-form-split">--</p>
        </Col>
        <Col span="6">
          <Input id="tel1" />
        </Col>
        <Col span="6">
          <Input id="tel2" />
        </Col>
        <Col span="6">
          <Input id="tel3" />
        </Col>
      </InputGroup>
    </FormItem>
  </Form>

, mountNode);
````
