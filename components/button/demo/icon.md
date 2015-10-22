# 图标按钮

- order: 6

`Button` 内可以嵌套图标，图标可以放在文字前、后，也可以单独存在。

---

````jsx
var Button = antd.Button;
var Icon = antd.Icon;

ReactDOM.render(<div>
  <Button type="primary" shape="circle" size="lg">
    <Icon type="search" />
  </Button>
  <Button type="primary" size="lg">
    <Icon type="search" />
  大按钮
  </Button>

  <Button type="primary" shape="circle">
    <Icon type="search" />
  </Button>
  <Button type="primary">
    <Icon type="search" />
  中按钮
  </Button>

  <Button type="primary" shape="circle" size="sm">
    <Icon type="search" />
  </Button>
  <Button type="primary" size="sm">
    <Icon type="search" />
  小按钮
  </Button>

  <br />

  <Button type="ghost" shape="circle-outline" size="lg">
    <Icon type="search" />
  </Button>
  <Button type="ghost" shape="circle-outline">
    <Icon type="search" />
  </Button>
  <Button type="ghost" shape="circle-outline" size="sm">
    <Icon type="search" />
  </Button>
</div>,
document.getElementById('components-button-demo-icon'));
````

<style>
#components-button-demo-icon .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
