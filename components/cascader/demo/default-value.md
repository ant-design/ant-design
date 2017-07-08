---
order: 1
title:
  zh-CN: 默认值
  en-US: Default value
---

## zh-CN

默认值通过数组的方式指定。

## en-US

Specifies default value by an array.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: '路网',
  label: '路网',
  children: [{
    value: '普通路网',
    label: '普通路网',
    children: [{
      value: '路网提取',
      label: '路网提取',
    }],
  }],
}, {
  value: '属性',
  label: '属性',
  children: [{
    value: '常规属性',
    label: '常规属性',
    children: [{
      value: '属性标记',
      label: '属性标记',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Cascader defaultValue={['路网', '普通路网', '路网提取']} options={options} onChange={onChange} />
, mountNode);
````
