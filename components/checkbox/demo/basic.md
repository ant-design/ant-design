---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

简单的 checkbox。

## en-US

Basic usage of checkbox.

```jsx
import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(<Checkbox onChange={onChange}>Checkbox</Checkbox>, mountNode);
```
