# 三种大小

- order: 0

三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `32px` 和 `22px` ，默认高度为 `28px`

---

````jsx
import { Select } from 'antd';
const Option = Select.Option;

function handleChange(value) {
  console.log('selected ' + value);
}

ReactDOM.render(
  <div>
  <Select size="large" defaultValue="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
    <Select defaultValue="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
    <Select size="small" defaultValue="lucy" style={{width:200}} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  </div>
, document.getElementById('components-select-demo-size'));
````

````css
.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}
````
