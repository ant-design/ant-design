---
order: 0
title: 基本
---

省市区级联。

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
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu1',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu2',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu3',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu4',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu5',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu6',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu7',
      label: '西湖西湖西湖西湖西湖西湖',
    }, {
      value: 'xihu8',
      label: '西湖西湖西湖西湖西湖西湖',
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
      label: '中华门中华门中华门中华门中华门',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Cascader options={options} onChange={onChange} placeholder="请选择地区" />
, mountNode);
````
