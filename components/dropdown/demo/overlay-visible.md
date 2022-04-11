---
order: 7
title:
  zh-CN: 菜单隐藏方式
  en-US: The way of hiding menu.
---

## zh-CN

默认是点击关闭菜单，可以关闭此功能。

## en-US

The default is to close the menu when you click on menu items, this feature can be turned off.

```jsx
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class OverlayVisible extends React.Component {
  state = {
    visible: false,
  };

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const menu = (
      <Menu
        onClick={this.handleMenuClick}
        items={[
          {
            label: 'Clicking me will not close the menu.',
            key: '1',
          },
          {
            label: 'Clicking me will not close the menu also.',
            key: '2',
          },
          {
            label: 'Clicking me will close the menu.',
            key: '3',
          },
        ]}
      />
    );
    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Hover me <DownOutlined />
        </a>
      </Dropdown>
    );
  }
}

export default () => <OverlayVisible />;
```
