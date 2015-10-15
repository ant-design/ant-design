# 按钮类型

- order: 0

按钮有三种类型：主按钮、次按钮、幽灵按钮。

通过设置 `type` 为 `primary` `ghost` 可分别创建主按钮、幽灵按钮，若不设置 `type` 值则为次按钮。不同的样式可以用来区别其重要程度。

---
 
````jsx
var Button = antd.Button;

React.render(<div>
  <Button type="primary">主按钮</Button>
  <Button>次按钮</Button>
  <Button type="ghost">幽灵按钮</Button>
</div>,
document.getElementById('components-button-demo-basic'))
````

<style>
#components-button-demo-basic .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
