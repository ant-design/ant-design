---
order: 999
title:
  zh-CN: 4.0 Debug
  en-US: 4.0 Debug
debug: true
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
  <div
    style={{
      width: 500,
      position: 'relative',
      zIndex: 1,
      border: '1px solid red',
      background: '#FFF',
    }}
  >
    <Input style={{ width: 100 }} value="222" />
    <Select style={{ width: 120 }} onChange={handleChange} showSearch placeholder="233">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
      <Option value="long">I am super super long!</Option>
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
      <Option value="long">I am super super long!</Option>
    </Select>
    <span className="debug-align">AntDesign</span>
    <Button>222</Button>
  </div>,
  mountNode,
);
```

<style>
#components-select-demo-debug .debug-align {
  position: relative;
  display: inline-block;
  line-height: 32px;
  height: 32px;
  background: rgba(255, 0, 0, 0.1);
  box-sizing: border-box;
}
#components-select-demo-debug .debug-align:after {
  position: absolute;
  content: '';
  border: 1px solid green;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}
</style>
