---
order: 4
title:
  zh-CN: 自定义描述文案
  en-US: Customized description
---

## zh-CN

自定义描述文案。

## en-US

Customized description content.

````jsx
import { Spin, Alert } from 'antd';

ReactDOM.render(
  <Spin tip="Loading...">
    <Alert message="消息提示的文案"
      description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
      type="info"
    />
  </Spin>
, mountNode);
````
