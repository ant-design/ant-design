---
order: 3
title: 
    zh-CN: 输入框组合
    en-US: Input Group
---

## zh-CN

输入框的组合展现。

## en-US

Input.Group example

````jsx
import { Input, Col, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

ReactDOM.render(
  <div>
    <InputGroup size="large">
      <Col span="4">
        <Input defaultValue="0571" />
      </Col>
      <Col span="8">
        <Input defaultValue="26888888" />
      </Col>
    </InputGroup>
    <br />
    <InputGroup compact>
      <Col span="4">
        <Input defaultValue="0571" />
      </Col>
      <Col span="8">
        <Input defaultValue="26888888" />
      </Col>
    </InputGroup>
    <br />
    <InputGroup compact>
      <Col span="6">
        <Select defaultValue="Zhejiang">
          <Option value="Zhejiang">Zhejiang</Option>
          <Option value="Jiangsu">Jiangsu</Option>
        </Select>
      </Col>
      <Col span="12">
        <Input defaultValue="Xihu District, Hangzhou" />
      </Col>
    </InputGroup>
    <br />
    <InputGroup compact>
      <Col span="6">
        <Select defaultValue="Option1-1">
          <Option value="Option1-1">Option1-1</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select defaultValue="Option2-2">
          <Option value="Option2-1">Option2-1</Option>
          <Option value="Option2-2">Option2-2</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select defaultValue="Option3-1">
          <Option value="Option3-1">Option3-1</Option>
          <Option value="Option3-2">Option3-2</Option>
        </Select>
      </Col>
    </InputGroup>
    <br />
  </div>
, mountNode);
````
