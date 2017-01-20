---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The basic example.

````__react
import { Popconfirm, message } from 'antd';

function confirm() {
  message.success('Click on Yes');
}

function cancel() {
  message.error('Click on No');
}

ReactDOM.render(
  <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>
, mountNode);
````
