---
order: 4
title:
  zh-CN: 定制回填内容
  en-US: Custom selection render
---

## zh-CN

使用 `optionLabelProp` 指定回填到选择框的 `Option` 属性。

## en-US

Spacified the prop name of Option which will be rendered in select box.

```jsx
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select one country"
    defaultValue={['china']}
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="china" label="China">
      <span role="img" aria-label="China">
        🇨🇳{' '}
      </span>
      China (中国)
    </Option>
    <Option value="usa" label="USA">
      <span role="img" aria-label="USA">
        🇺🇸{' '}
      </span>
      USA (美国)
    </Option>
    <Option value="japan" label="Japan">
      <span role="img" aria-label="USA">
        🇯🇵{' '}
      </span>
      Japan (日本)
    </Option>
    <Option value="koean" label="Koean">
      <span role="img" aria-label="USA">
        🇰🇷{' '}
      </span>
      Koean (韩国)
    </Option>
  </Select>,
  mountNode,
);
```
