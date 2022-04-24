---
order: 99
title:
  zh-CN: Style debug
  en-US: Style debug
debug: true
---

## zh-CN

buggy!

## en-US

buggy!

```tsx
import * as React from 'react';
import { Menu, MenuProps, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface DemoState {
  theme: 'light' | 'dark';
  current: string;
}

class Demo extends React.Component<{}, DemoState> {
  state: DemoState = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = (value: boolean) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="inline"
          inlineCollapsed
          // Test only. Remove in future.
          _internalRenderMenuItem={node =>
            React.cloneElement(node, {
              style: {
                ...node.props.style,
                textDecoration: 'underline',
              },
            })
          }
          // Test only. Remove in future.
          _internalRenderSubMenuItem={node =>
            React.cloneElement(node, {
              style: {
                ...node.props.style,
                background: 'rgba(255,255,255,0.3)',
              },
            })
          }
          // Test only. Remove in future.
          _internalDisableMenuItemTitleTooltip
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One Long Long Long Long">
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
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </Menu>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
