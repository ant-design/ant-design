---
order: 3
title:
  zh-CN: 高精度小数
  en-US: High precision decimals
---

## zh-CN

通过 `stringMode` 开启高精度小数支持，`onChange` 事件将返回 string 类型。对于旧版游览器，你需要 BigInt polyfill。

## en-US

Use `stringMode` to support high precision decimals support. `onChange` will return string value instead. You need polyfill of BigInt if browser not support.

```tsx
import { InputNumber } from 'antd';

function onChange(value: string) {
  console.log('changed', value);
}

ReactDOM.render(
  <InputNumber<string>
    style={{ width: 400 }}
    defaultValue="1"
    min="0"
    max="10"
    step="0.00000000000000000000000000000903"
    onChange={onChange}
    stringMode
  />,
  mountNode,
);
```
