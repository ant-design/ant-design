# 不可用

- order: 1

Radio 不可用。

---

````jsx
var Radio = antd.Radio;
var container = document.getElementById('components-radio-demo-disable');

React.render(<div>
  <Radio defaultChecked={false} disabled={true}/> &nbsp;&nbsp;
  <Radio defaultChecked={true} disabled={true}/>
</div>, container);
````
