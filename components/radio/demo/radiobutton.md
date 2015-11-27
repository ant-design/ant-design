# 按钮样式

- order: 3

按钮样式的单选组合。

---

````jsx
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(e) {
  console.log('radio checked:' + e.target.value);
}

ReactDOM.render(<div>
  <div>
    <RadioGroup onChange={onChange} defaultValue="a">
      <RadioButton value="a">杭州</RadioButton>
      <RadioButton value="b" disabled>上海</RadioButton>
      <RadioButton value="c">北京</RadioButton>
      <RadioButton value="d">成都</RadioButton>
    </RadioGroup>
  </div>
  <div style={{ marginTop: 16 }}>
    <RadioGroup disabled onChange={onChange} defaultValue="a">
      <RadioButton value="a">杭州</RadioButton>
      <RadioButton value="b">上海</RadioButton>
      <RadioButton value="c">北京</RadioButton>
      <RadioButton value="d">成都</RadioButton>
    </RadioGroup>
  </div>
</div>, document.getElementById('components-radio-demo-radiobutton'));
````
