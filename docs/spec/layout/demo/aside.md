---
order: 2
title: 侧边导航
---

顶级导航在侧边栏。

侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部份。

````jsx
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
          <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
            <Menu.Item key="1">选项1</Menu.Item>
            <Menu.Item key="2">选项2</Menu.Item>
            <Menu.Item key="3">选项3</Menu.Item>
            <Menu.Item key="4">选项4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
      <div className="layout-main">
        <div className="layout-header"></div>
        <div className="layout-container">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
          <div className="layout-content">
            <div style={{ height: 590 }}>
              内容区域
            </div>
          </div>
        </div>
        <div className="layout-footer">
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
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
