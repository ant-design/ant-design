---
order: 6
title: 菜单隐藏方式
---

默认是点击关闭菜单，可以关闭此功能。

````jsx
import { Menu, Dropdown, Icon } from 'antd';

const OverlayVisible = React.createClass({
  getInitialState() {
    return {
      visible: false,
    };
  },
  handleMenuClick(e) {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  },
  handleVisibleChange(flag) {
    this.setState({ visible: flag });
  },
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">点我不会关闭菜单</Menu.Item>
        <Menu.Item key="2">点我还是不会关闭菜单</Menu.Item>
        <Menu.Item key="3">点我才会关闭菜单</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="ant-dropdown-link" href="#">
          鼠标移入 <Icon type="down" />
        </a>
      </Dropdown>
    );
  },
});

ReactDOM.render(<OverlayVisible />, mountNode);
````
