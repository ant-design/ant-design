# 基本

- order: 0

数字输入框

---

````jsx
var InputNumber = antd.InputNumber;

function onChange(v){
  console.log('changed',v);
}

React.render(
  <div><InputNumber min={1} max={10} defaultValue={3} onChange={onChange} style={{width:100}}/></div>
, document.getElementById('components-input-number-demo-basic'));
````

