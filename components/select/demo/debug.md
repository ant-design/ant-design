---
order: 999
title:
  zh-CN: 4.0 Debug
  en-US: 4.0 Debug
debug: true
only: true
---

## zh-CN

基本使用。

## en-US

Basic Usage.

```jsx
import { Select, Input, Button } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <div>
    <Input style={{ width: 100 }} value="222" />
    <Select style={{ width: 120 }} onChange={handleChange} showSearch placeholder="233">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
      <Option value="long">I'm super super long!</Option>
    </Select>
    <Select
      mode="multiple"
      style={{ width: 120 }}
      defaultValue={['lucy']}
      onChange={handleChange}
      showSearch
      placeholder="233"
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
      <Option value="long">I'm super super long!</Option>
    </Select>
    <span>AntDesign</span>
    <Button>222</Button>
  </div>,
  mountNode,
);
```
