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
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

ReactDOM.render(
  <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
    <a href="#">删除</a>
  </Popconfirm>
, mountNode);
````
