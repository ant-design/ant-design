---
order: 6
title: 菜单隐藏方式
-------------

默认是点击关闭菜单,可以关闭此功能。

````jsx
import { Menu, Dropdown, Icon, Checkbox } from 'antd';
import React from 'React';

class OverlayVisible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Checkbox defaultChecked={false}>点我不会关闭菜单</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox defaultChecked={false}>点我还是不会关闭菜单</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox defaultChecked={false} onChange={() => this.setState({ visible: false })}>点我才会关闭菜单</Checkbox>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} onVisibleChange={flag => this.setState({ visible: flag })} visible={this.state.visible}>
        <a className="ant-dropdown-link" href="#">
          鼠标移入 <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}

ReactDOM.render(
  <OverlayVisible />
  , mountNode);
````
