---
order: 5
title:
    zh-CN: 文本域
    en-US: Textarea
---

## zh-CN

用于多行输入，指定 `type` 为一个特殊的 `textarea`。

## en-US

For multi-line user input cases, an input whose `type` prop has the value of `"textarea"` can be used.

````jsx
import { Input } from 'antd';
const { TextArea } = Input;

ReactDOM.render(<TextArea rows={4} />, mountNode);
````
