---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

省市区级联。

## en-US

Cascade selection box for selecting province/city/district.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'shuing',
  label: '属性',
  children: [{
    value: 'changguishuxing',
    label: '常规属性',
    children: [{
      value: 'shuxingbiaoji',
      label: '属性标记',
    }],
  }],
}, {
  value: 'luwang',
  label: '路网',
  children: [{
    value: 'putongluwang',
    label: '普通路网',
    children: [{
      value: 'luwangronhe',
      label: '路网融合',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Cascader options={options} onChange={onChange} placeholder="Please select" />
, mountNode);
````
