---
order: 7
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

不同大小的级联选择器。

## en-US

Cascade selection box of different sizes.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <div>
    <Cascader size="large" options={options} onChange={onChange} /><br /><br />
    <Cascader options={options} onChange={onChange} /><br /><br />
    <Cascader size="small" options={options} onChange={onChange} /><br /><br />
  </div>
, mountNode);
````
