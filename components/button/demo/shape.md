# 按钮形状

- order: 1

通过设置 `shape` 为 `circle` `circle-outline`，可以把按钮形状设为圆形，并且 `circle-outline` 在 hover 时会有动画效果。

---

````jsx
import { Button, Icon } from 'antd';

ReactDOM.render(<div>
  <Button type="primary" shape="circle" size="large">
    <Icon type="search" />
  </Button>
  <Button type="primary" shape="circle">
    <Icon type="search" />
  </Button>
  <Button type="primary" shape="circle" size="small">
    <Icon type="search" />
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
</div>
, document.getElementById('components-button-demo-shape'));
````

<style>
#components-button-demo-shape .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
