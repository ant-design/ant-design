---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```jsx
import { Switch } from 'antd';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

ReactDOM.render(<Switch defaultChecked onChange={onChange} />, mountNode);
```

<style>
.ant-switch {
  margin-bottom: 8px;
}
</style>
