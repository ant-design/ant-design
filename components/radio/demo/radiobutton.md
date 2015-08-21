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
    <RadioButton value="a">杭州</RadioButton>
    <RadioButton value="b">上海</RadioButton>
    <RadioButton value="c">北京</RadioButton>
    <RadioButton value="d">成都</RadioButton>
  </RadioGroup>
), document.getElementById('components-radio-demo-radiobutton'));
````

