# 用法示例

- order: 0

switch 用法

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-basic');

function onChange(checked){
  console.log('switch to ' + checked);
}

React.render(<div>
<p>
simple:&nbsp;
<Switch defaultChecked={false} onChange={onChange}/><br/>&nbsp;
</p>
<p>
disabled:&nbsp;
<Switch disabled/><br/>&nbsp;
</p>
<p>
children:&nbsp;
<Switch checkedChildren="开" unCheckedChildren="关"/><br/>&nbsp;
</p>
<p>
icon children:&nbsp;
<Switch checkedChildren={<i className="anticon anticon-check"></i>} unCheckedChildren={<i className="anticon anticon-cross"></i>}/>
</p>
</div>, container);
````
