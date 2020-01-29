---
order: 20
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

基本使用。

## en-US

Basic Usage.

```jsx
import { Select, Icon } from 'antd';

const smileIcon = <Icon type="smile" />;
const mehIcon = <Icon type="meh" />;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <div>
    <Select
      suffixIcon={smileIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select suffixIcon={mehIcon} defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>,
  mountNode,
);
```
