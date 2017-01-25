---
order: 4
title:
  zh-CN: 可收起展开的侧边导航
  en-US: Collapsed aside
---

## zh-CN

页面横向空间有限时使用。侧边导航默认收起，点击底部按钮时展开。

## en-US

This pattern is used when the horizontal space is limited. By default, Aside navigation is collapsed. You can click the button at the bottom to expand it.

````__react
import { Menu, Breadcrumb, Icon } from 'antd';
import BrowserDemo from 'site/theme/template/BrowserDemo';
const SubMenu = Menu.SubMenu;

const AsideCollapse = React.createClass({
  getInitialState() {
    return {
      collapse: true,
    };
  },
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  render() {
    const collapse = this.state.collapse;
    return (
      <div className={collapse ? "layout-aside layout-aside-collapse" : "layout-aside"}>
        <aside className="layout-sider">
          <div className="layout-logo"></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Icon type="user" />
              {!collapse && <span className="nav-text">Navigation 1</span>}
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" />
              {!collapse && <span className="nav-text">Navigation 2</span>}
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="laptop" />
              {!collapse && <span className="nav-text">Navigation 3</span>}
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" />
              {!collapse && <span className="nav-text">Navigation 4</span>}
            </Menu.Item>
            <Menu.Item key="folder">
              <Icon type="folder" />
              {!collapse && <span className="nav-text">Navigation 5</span>}
            </Menu.Item>
          </Menu>
          <div className="aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className="layout-main">
          <div className="layout-header"></div>
          <div className="layout-container">
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>App list</Breadcrumb.Item>
              <Breadcrumb.Item>Any app</Breadcrumb.Item>
            </Breadcrumb>
            <div className="layout-content">
              <div style={{ height: 220 }}>
                Contents
              </div>
            </div>
          </div>
          <div className="layout-footer">
            Ant Design all rights reserved © 2015 Created by Ant UED
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<BrowserDemo><AsideCollapse /></BrowserDemo>, mountNode);
````

````css
.layout-aside {
  position: relative;
  min-height: 100%;
}

.layout-aside .layout-logo {
  height: 32px;
  background: #333;
  border-radius: 4px;
  margin: 16px 24px;
  transition: all .3s;
}

.layout-aside-collapse .layout-logo {
  width: 32px;
  margin: 16px;
  transition: all .3s;
}

.layout-aside .layout-sider {
  width: 224px;
  background: #404040;
  position: absolute;
  overflow: visible;
  padding-bottom: 24px;
  height: 100%;
  transition: all .3s;
}

.layout-aside-collapse .layout-sider {
  width: 64px;
  transition: all .3s;
}

.layout-aside .layout-sider > .menu {
  margin-bottom: 20px;
}

.layout-aside .layout-sider > .menu > .menu-item {
  margin: 16px 0;
}

.layout-aside .layout-sider > .menu > .menu-item .nav-text {
  vertical-align: baseline;
  display: inline-block;
}

.layout-aside .layout-sider > .menu > .menu-item > .anticon {
  transition: font-size .3s;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item {
  transition: all 0s ease;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item > .anticon {
  font-size: 16px;
  display: inline-block;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item .nav-text {
  display: none;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item:hover {
  background: #2db7f5;
  color: #fff;
  transition: all 0s ease;
}

.layout-aside-collapse .layout-sider > .menu > .menu-item:hover .nav-text {
  display: inline-block;
  vertical-align: top;
  background: #2db7f5;
  color: #fff;
  padding-right: 16px;
  border-radius: 0 5px 5px 0;
}

/* 实际使用中需要改成 position: fixed */
.layout-aside .aside-action {
  height: 42px;
  width: 224px;
  position: absolute;
  bottom: 0;
  background: #656565;
  color: #fff;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
  transition: all .3s;
}

.layout-aside-collapse .aside-action {
  width: 64px;
  transition: all .3s;
}

.layout-aside .layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
}

.layout-aside .layout-main {
  margin-left: 224px;
  transition: all .3s;
}

.layout-aside-collapse .layout-main {
  margin-left: 64px;
  transition: all .3s;
}

.layout-aside .layout-container {
  margin: 12px 16px 24px;
}

.layout-aside .layout-content {
  background: #fff;
  padding: 24px;
  margin-top: 12px;
  border-radius: 4px;
}

.layout-aside .layout-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: #fff;
  border-top: 1px solid #e9e9e9;
  width: 100%;
}
````
