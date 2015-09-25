# 按钮形状

- order: 1

通过设置 `shape` 为 `circle` `circle-outline`，可以把按钮形状设为圆形，并且 `circle-outline` 在 hover 时会有动画效果。

---

````jsx
var Button = antd.Button;

React.render(<div>
  <Button type="primary" shape="circle" size="lg">
    <i className="anticon anticon-search"></i>
  </Button>
  <Button type="primary" shape="circle">
    <i className="anticon anticon-search"></i>
  </Button>
  <Button type="primary" shape="circle" size="sm">
    <i className="anticon anticon-search"></i>
  </Button>
  <br />
  <Button type="ghost" shape="circle-outline" size="lg">
    <i className="anticon anticon-search"></i>
  </Button>
  <Button type="ghost" shape="circle-outline">
    <i className="anticon anticon-search"></i>
  </Button>
  <Button type="ghost" shape="circle-outline" size="sm">
    <i className="anticon anticon-search"></i>
  </Button>
</div>
, document.getElementById('components-button-demo-shape'));
````

<style>
#components-button-demo-shape .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
