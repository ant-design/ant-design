---
order: 5
title: 按钮组合
---

可以将多个 `Button` 放入 `Button.Group` 的容器中。

通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

````jsx
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

ReactDOM.render(<div>
  <h4>基本组合</h4>
  <ButtonGroup>
    <Button type="primary">确定</Button>
    <Button type="primary">取消</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button disabled>左</Button>
    <Button disabled>中</Button>
    <Button disabled>右</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button type="primary">左</Button>
    <Button type="ghost">中</Button>
    <Button type="ghost">中</Button>
    <Button>右</Button>
  </ButtonGroup>

  <h4>带图标按钮组合</h4>
  <ButtonGroup>
    <Button type="primary">
      <Icon type="left" />后退
    </Button>
    <Button type="primary">
      前进<Icon type="right" />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button type="primary" icon="cloud" />
    <Button type="primary" icon="cloud-download" />
  </ButtonGroup>

  <h4>尺寸</h4>
  <ButtonGroup size="large">
    <Button type="ghost">大</Button>
    <Button type="ghost">大</Button>
    <Button type="ghost">大</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button type="ghost">默认</Button>
    <Button type="ghost">默认</Button>
    <Button type="ghost">默认</Button>
  </ButtonGroup>
  <ButtonGroup size="small">
    <Button type="ghost">小</Button>
    <Button type="ghost">小</Button>
    <Button type="ghost">小</Button>
  </ButtonGroup>
</div>, mountNode);
````

<style>
#components-button-demo-button-group h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn {
  margin-bottom: 8px;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
#components-button-demo-button-group .ant-btn {
  margin-bottom: 12px;
}
</style>
