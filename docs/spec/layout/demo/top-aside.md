---
order: 1
title:
  zh-CN: 顶部导航 + 侧边栏
  en-US: Top aside
---

## zh-CN

顶级导航在头部，次级导航在侧边栏。

## en-US

The top navigation is placed on the top, and the secondary navigation is placed on the aside.

````__react
import { Menu, Breadcrumb, Icon } from 'antd';
import BrowserDemo from 'site/theme/template/BrowserDemo';
const SubMenu = Menu.SubMenu;

ReactDOM.render(
  <BrowserDemo>
    <div className="layout-topaside">
      <div className="layout-header">
        <div className="layout-wrapper">
          <div className="layout-logo"></div>
          <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
            <Menu.Item key="1">Navigation 1</Menu.Item>
            <Menu.Item key="2">Navigation 2</Menu.Item>
            <Menu.Item key="3">Navigation 3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="layout-subheader">
        <div className="layout-wrapper">
          <Menu mode="horizontal"
            defaultSelectedKeys={['1']} style={{marginLeft: 124}}>
            <Menu.Item key="1">Second nav</Menu.Item>
            <Menu.Item key="2">Second nav</Menu.Item>
            <Menu.Item key="3">Second nav</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="layout-wrapper">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App list</Breadcrumb.Item>
          <Breadcrumb.Item>Any app</Breadcrumb.Item>
        </Breadcrumb>
        <div className="layout-container">
          <aside className="layout-sider">
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={<span><Icon type="user" />Navigation 1</span>}>
                <Menu.Item key="1">item 1</Menu.Item>
                <Menu.Item key="2">item 2</Menu.Item>
                <Menu.Item key="3">item 3</Menu.Item>
                <Menu.Item key="4">item 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Navigation 2</span>}>
                <Menu.Item key="5">item 5</Menu.Item>
                <Menu.Item key="6">item 6</Menu.Item>
                <Menu.Item key="7">item 7</Menu.Item>
                <Menu.Item key="8">item 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />Navigation 3</span>}>
                <Menu.Item key="9">item 9</Menu.Item>
                <Menu.Item key="10">item 10</Menu.Item>
                <Menu.Item key="11">item 11</Menu.Item>
                <Menu.Item key="12">item 12</Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          <div className="layout-content">
            <div style={{ height: 240 }}>
              <div style={{clear: 'both'}}>Contents</div>
            </div>
          </div>
        </div>
        <div className="layout-footer">
          Ant Design all rights reserved © 2015 Created by Ant UED
        </div>
      </div>
    </div>
  </BrowserDemo>
, mountNode);
````

````css
.layout-topaside {
  height: 100%;
}

.layout-topaside .layout-wrapper {
  padding: 0 50px;
}

.layout-topaside .layout-header {
  background: #404040;
  height: 64px;
}

.layout-topaside .layout-logo {
  width: 120px;
  height: 32px;
  background: #333;
  border-radius: 4px;
  margin: 16px 24px 16px 0;
  float: left;
}

.layout-topaside .layout-subheader {
  height: 48px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
  margin-bottom: 12px;
}

.layout-topaside .layout-container {
  background: #fff;
  margin: 12px 0 0;
  position: relative;
  padding: 24px 0;
  overflow: hidden;
  border-radius: 4px;
}

.layout-topaside .layout-sider {
  width: 224px;
  float: left;
}

.layout-topaside .layout-content {
  border-left: 1px solid #e9e9e9;
  padding: 0 24px;
  overflow: auto;
  position: relative;
  left: -1px;
}

.layout-topaside .layout-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
````
