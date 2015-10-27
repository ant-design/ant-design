# 按钮状态

- order: 3

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。如果只是想使用按钮 disabled 后的样式，以便继续处理用户的点击事件，则使用 `.disabled` class 而非 `disabled` 属性。

---

````jsx
var Button = antd.Button;

ReactDOM.render(<div>
  <h4>使用 `disabled` 属性</h4>
  <Button type="primary">主按钮</Button>
  <Button type="primary" disabled>主按钮(失效)</Button>
  <br />
  <Button>次按钮</Button>
  <Button disabled>次按钮(失效)</Button>
  <br />
  <h4>使用 `.disabled` class</h4>
  <Button type="ghost">幽灵按钮</Button>
  <Button type="ghost" className="disabled">幽灵按钮(失效)</Button>
</div>
, document.getElementById('components-button-demo-status'));
````

<style>
#components-button-demo-status .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
