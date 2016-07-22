---
order: 4
title: 
  zh-CN: 自定义描述文案
  en-US: Customize description
---

## zh-CN

自定义描述文案，指定的 tip 文案会直接代替 `...`。

## en-US

Customize description content, specified tip content will replace the dots in `Spin`.

````jsx
import { Spin, Alert } from 'antd';

ReactDOM.render(
  <Spin tip="正在读取数据...">
    <Alert message="消息提示的文案"
      description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
      type="info"
    />
  </Spin>
, mountNode);
````
