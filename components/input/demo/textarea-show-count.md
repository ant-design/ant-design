---
order: 12
title:
  zh-CN: 带字数提示的文本域
  en-US: Textarea with character counting
---

## zh-CN

展示字数提示。

## en-US

Show character counting.

```jsx
import { Input } from 'antd';

const { TextArea } = Input;

ReactDOM.render(<TextArea showCount maxLength={100} />, mountNode);
```
