# 图标按钮

- order: 6

`Button` 内可以嵌套图标，图标可以放在文字前、后，也可以单独存在。

---

````jsx
import { Button, Icon } from 'antd';

ReactDOM.render(<div>
  <Button type="primary" shape="circle" size="large">
    <Icon type="search" />
  </Button>
  <Button type="primary" size="large">
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

  <Button type="primary" shape="circle" size="small">
    <Icon type="search" />
  </Button>
  <Button type="primary" size="small">
    <Icon type="search" />
  小按钮
  </Button>

  <br />

  <Button type="ghost" shape="circle-outline" size="large">
    <Icon type="search" />
  </Button>
  <Button type="ghost" shape="circle-outline">
    <Icon type="search" />
  </Button>
  <Button type="ghost" shape="circle-outline" size="small">
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
