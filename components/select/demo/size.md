---
order: 1
title: 
  zh-CN: 三种大小
  en-US: Three sizes
---

## zh-CN

三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `32px` 和 `22px` ，默认高度为 `28px`

## en-US

The height of the inpub field for the select defaults to 28px. If size is set to large, the height will be 32px, and if set to small, 22px.

````__react
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <div>
    <Select size="large" defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">Yiminghe</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">Yiminghe</Option>
    </Select>
    <Select size="small" defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">Yiminghe</Option>
    </Select>
  </div>
, mountNode);
````

````css
.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}

#components-select-demo-search-box .code-box-demo .ant-select {
  margin: 0;
}
````
