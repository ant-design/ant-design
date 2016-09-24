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

````jsx
import { Popconfirm, message } from 'antd';

function confirm() {
  message.success('Clicked confirm button');
}

function cancel() {
  message.error('Clicked cancel button');
}

ReactDOM.render(
  <Popconfirm title="Are you sure to delete this task?" onConfirm={confirm} onCancel={cancel} okText="Ok" cancelText="Cancel">
    <a href="#">Delete</a>
  </Popconfirm>
, mountNode);
````
