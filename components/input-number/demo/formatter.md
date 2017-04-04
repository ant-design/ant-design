---
order: 4
title:
    zh-CN: 格式化展示
    en-US: Formatter
---

## zh-CN

展示具有具体含义的数据。

## en-US

Display value within it's situation.

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
  <div>
    <InputNumber formatter={value => `$ ${value}`} defaultValue={100} onChange={onChange} />
    <InputNumber formatter={value => `${value.replace('%', '')}%`} defaultValue={100} onChange={onChange} />
  </div>
, mountNode);
````
