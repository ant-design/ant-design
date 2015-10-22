# 不可用

- order: 1

checkbox 不可用。

---

````jsx
var Checkbox = antd.Checkbox;
var container = document.getElementById('components-checkbox-demo-disable');

ReactDOM.render(<div>
  <Checkbox defaultChecked={false} disabled={true}/>
  <br />
  <Checkbox defaultChecked={true} disabled={true}/>
</div>, container);
````
