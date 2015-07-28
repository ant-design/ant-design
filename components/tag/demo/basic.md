# 基本

- order: 0

简单的标签展示，添加 closable 表示可关闭。

---

````jsx
var Tag = antd.Tag;

function onClose() {
  console.log(this.props.children);
}

React.render(<div>
  <Tag href="http://www.baidu.com">标签一</Tag>
  <Tag closable onClose={onClose}>标签二</Tag>
  <Tag>标签三</Tag>
</div>, document.getElementById('components-tag-demo-basic'));
````
