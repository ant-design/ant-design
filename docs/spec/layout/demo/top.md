---
order: 0
title: 
  zh-CN: 顶部导航
  en-US: Top
---
## zh-CN

一二级导航都在顶部。

顶部导航在页面布局上采用的是上下的结构，一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。

> `<BrowserDemo />` 做演示用，无须复制。

## en-US

The first and second level nav are both at the top.

A top-bottom structure of page layouts is used to top navigation. Generally, the mainnav is placed at the top of the page, and put log, the first level navigation, secondary menu(users, settings, notifications) from left to right in it. We always put contents in a fixed size navigation.( eg: `1200px`), the layout of the whole page is stable, it's not affected by viewing enviroment,; Top-bottom structure is conform to top-bottom viewing habit, it's a classical navigation pattern of websites. This pattern will bring demonstration efficiency up of the mian workarea, but it will also occupie some vertical spaces. And, because the horizontal space of the navigation is limited, this pattern is not suitable for the first level navigation which has too much information.

> `<BrowserDemo />` This is for demo, don't need to copy.

````__react
import { Menu, Breadcrumb } from 'antd';
import BrowserDemo from 'site/theme/template/BrowserDemo';

ReactDOM.render(
  <BrowserDemo>
    <div className="layout-top">
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
            <Menu.Item key="1">The second level navigation</Menu.Item>
            <Menu.Item key="2">The second level navigation</Menu.Item>
            <Menu.Item key="3">The second level navigation</Menu.Item>
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
          <div style={{ height: 210 }}></div>
        </div>
      </div>
      <div className="layout-footer">
        Ant Design all rights reserved © 2015 Created by Ant UED
      </div>
    </div>
  </BrowserDemo>
, mountNode);
````

````css
.layout-top {
  height: 100%;
}

.layout-top .layout-wrapper {
  padding: 0 50px;
}

.layout-top .layout-header {
  background: #404040;
  height: 64px;
}

.layout-top .layout-logo {
  width: 120px;
  height: 32px;
  background: #333;
  border-radius: 4px;
  margin: 16px 24px 16px 0;
  float: left;
}

.layout-top .layout-subheader {
  height: 48px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
  margin-bottom: 12px;
}

.layout-top .layout-container {
  background: #fff;
  margin: 12px 0 0;
  position: relative;
  padding-top: 24px;
  overflow: hidden;
  border-radius: 4px;
}

.layout-top .layout-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
````
