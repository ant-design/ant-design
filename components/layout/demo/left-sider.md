---
order: 2.5
title:
  en-US: Left Sider
---

## en-US

Varnish app style (left) menu uses the LeftSider to properly position the menu under the retracting header.

```jsx
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from '@allenai/varnish';

const { LeftSider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  siderWidthExpanded = '225px';

  siderWidthCollapsed = '80px';

  state = {
    displayMenuDemo: false,
    menuCollapsed: false,
  };

  handleMenuCollapse = menuCollapsed => {
    console.log(menuCollapsed);
    this.setState({ menuCollapsed });
  };

  handleShowHide = () => {
   this.setState({displayMenuDemo: !this.state.displayMenuDemo});
  };

  render() {
    return this.state.displayMenuDemo
    ? (
      <>
        {/* Put header here */}
        <Layout>
          <LeftSider
            collapsible
            width={this.siderWidthExpanded}
            collapsedWidth={this.siderWidthCollapsed}
            collapsed={this.state.menuCollapsed}
            onCollapse={this.handleMenuCollapse}
          >
            <Menu defaultSelectedKeys={[1]} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={this.handleShowHide}>
                Hide Menu
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </LeftSider>
          {/* Put content here */}
        </Layout>
        {/* Put footer here */}
      </>)
    : <Button onClick={this.handleShowHide}>
        Show LeftSider
      </Button>};
}

ReactDOM.render(<SiderDemo />, mountNode);
```
