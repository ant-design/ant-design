---
order: 4
title:
  zh-CN: 主题
  en-US: Menu Themes
---

## zh-CN

内建了两套主题 `light` 和 `dark`，默认 `light`。

## en-US

There are two built-in themes: `light` and `dark`. The default value is `light`. They can be applied to the `Menu`, and the Sub-menu will inherit this, or you can override at the `SubMenu` level

```jsx
import { Menu, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    menuTheme: 'dark',
    subMenuTheme: 'dark',
    current: '1',
  };

  changeMenuTheme = value => {
    this.setState({
      menuTheme: value ? 'dark' : 'light',
    });
  };

  changeSubMenuTheme = value => {
    this.setState({
      subMenuTheme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <>
        Menu Theme:{' '}
        <Switch
          checked={this.state.menuTheme === 'dark'}
          onChange={this.changeMenuTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        Sub-Menu Theme: <Switch
          checked={this.state.subMenuTheme === 'dark'}
          onChange={this.changeSubMenuTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.menuTheme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            icon={<MailOutlined />}
            title="Navigation One"
            theme={this.state.subMenuTheme}
          >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </>
    );
  }
}

ReactDOM.render(<Sider />, mountNode);
```
