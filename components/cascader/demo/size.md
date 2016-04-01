---
order: 7
title: 大小
---

不同大小的级联选择器。

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
