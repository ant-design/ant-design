---
order: 2
title: 
  zh-CN: 侧边导航
  en-US: Aside
---

## zh-CN

顶级导航在侧边栏。

侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部份。

## en-US

Aside top level navigation

A left-right structure of page layouts is used to Aside navigation, Generally, the mainnav is placed on the left side of the page, and the secondary menu is placed on the top of the working area. Contents will adapt the layout to the viewing area to improve the horizontal space usage, while the layout of the whole page is not stable.

The level of the aisde navigation is scalable. The first, second, and third level navigations could be present more fluently and relevantly, and aside navigation can be fixed, allowing the user to quickly switch and spot the current position, improving the user experience. However, this navigation occupies some horizontal space of the contents.

````__react
import { Menu, Breadcrumb, Icon } from 'antd';
import BrowserDemo from 'site/theme/template/BrowserDemo';
const SubMenu = Menu.SubMenu;

ReactDOM.render(
  <BrowserDemo>
    <div className="layout-aside">
      <aside className="layout-sider">
        <div className="layout-logo"></div>
        <Menu mode="inline" theme="dark"
          defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
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
      <div className="layout-main">
        <div className="layout-header"></div>
        <div className="layout-container">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App list</Breadcrumb.Item>
            <Breadcrumb.Item>Any App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="layout-content">
            <div style={{ height: 590 }}>
              Contents
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
.layout-aside {
  position: relative;
  min-height: 100%;
}

.layout-aside .layout-logo {
  height: 32px;
  background: #333;
  border-radius: 4px;
  margin: 16px 24px;
}

.layout-aside .layout-sider {
  width: 224px;
  background: #404040;
  position: absolute;
  overflow: auto;
  padding-bottom: 24px;
  height: 100%;
}

.layout-aside .layout-sider > .menu {
  margin-bottom: 20px;
}

.layout-aside .layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
}

.layout-aside .layout-main {
  margin-left: 224px;
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
