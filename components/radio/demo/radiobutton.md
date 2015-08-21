# 按钮样式

- order: 3

按钮样式的单选组合。

---

````jsx
var RadioButton = antd.Radio.Button;
var RadioGroup = antd.Radio.Group;

function onChange(e) {
  console.log('radio checked:' + e.target.value);
}

React.render((
  <RadioGroup onChange={onChange} defaultValue="a">
    <RadioButton value="a">A</RadioButton>
    <RadioButton value="b">B</RadioButton>
    <RadioButton value="c">C</RadioButton>
    <RadioButton value="d">D</RadioButton>
  </RadioGroup>
), document.getElementById('components-radio-demo-radiobutton'));
````

