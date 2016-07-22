---
order: 5
title:
  zh-CN: 按钮组合
  en-US: Button Group
---

## zh-CN

可以将多个 `Button` 放入 `Button.Group` 的容器中。

通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

## en-US

Buttons can be grouped by placing multiple `Button` components into a `Button.Group`.

The `size` can be set to `large`, `small` or left unset resulting in a default size.

````jsx
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

ReactDOM.render(
  <div>
    <h4>Basic</h4>
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button type="primary">OK</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button disabled>L</Button>
      <Button disabled>M</Button>
      <Button disabled>R</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary">L</Button>
      <Button>M</Button>
      <Button type="ghost">M</Button>
      <Button type="dashed">R</Button>
    </ButtonGroup>

    <h4>With Icon</h4>
    <ButtonGroup>
      <Button type="primary">
        <Icon type="left" />Go back
      </Button>
      <Button type="primary">
        Go forward<Icon type="right" />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary" icon="cloud" />
      <Button type="primary" icon="cloud-download" />
    </ButtonGroup>

    <h4>Size</h4>
    <ButtonGroup size="large">
      <Button type="ghost">Large</Button>
      <Button type="ghost">Large</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="ghost">Default</Button>
      <Button type="ghost">Default</Button>
    </ButtonGroup>
    <ButtonGroup size="small">
      <Button type="ghost">Small</Button>
      <Button type="ghost">Small</Button>
    </ButtonGroup>
  </div>,
  mountNode
);
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
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
#components-button-demo-button-group .ant-btn {
  margin-bottom: 12px;
  margin-right: 0;
}
</style>
