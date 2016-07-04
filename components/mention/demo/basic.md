---
order: 0
title: 基本使用
---

## zh-CN

基本使用

## en-US

Basic usage.

````jsx

import { Mention } from 'antd';

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Mention
    onChange={onChange}
    defaultValue="@afc163"
    suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
  />,
  mountNode
);
````
