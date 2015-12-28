# 顶部导航 + 侧边栏

- order: 1

顶级导航在头部，次级导航在侧边栏。

---

````jsx
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

ReactDOM.render(
  <BrowserDemo>
    <div className="ant-layout-topaside">
      <div className="ant-layout-header">
        <div className="ant-layout-wrapper">
          <div className="ant-layout-logo"></div>
          <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
            <Menu.Item key="1">导航一</Menu.Item>
            <Menu.Item key="2">导航二</Menu.Item>
            <Menu.Item key="3">导航三</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="ant-layout-subheader">
        <div className="ant-layout-wrapper">
          <Menu mode="horizontal"
            defaultSelectedKeys={['1']} style={{marginLeft: 124}}>
            <Menu.Item key="1">二级导航</Menu.Item>
            <Menu.Item key="2">二级导航</Menu.Item>
            <Menu.Item key="3">二级导航</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="ant-layout-wrapper">
        <div className="ant-layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
            <Breadcrumb.Item>某应用</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ant-layout-container">
          <aside className="ant-layout-sider">
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
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
          <div className="ant-layout-content">
            <div style={{ height: 240 }}>
              <div style={{clear: 'both'}}>内容区域</div>
            </div>
          </div>
        </div>
        <div className="ant-layout-footer">
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
        </div>
      </div>
    </div>
  </BrowserDemo>
, document.getElementById('spec-layout-demo-top-aside'));
````

````css
.ant-layout-topaside {
  height: 100%;
}

.ant-layout-topaside .ant-layout-wrapper {
  padding: 0 50px;
}

.ant-layout-topaside .ant-layout-header {
  background: #404040;
  height: 64px;
}

.ant-layout-topaside .ant-layout-logo {
  width: 120px;
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}

.ant-layout-topaside .ant-layout-subheader {
  height: 48px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
}

.ant-layout-topaside .ant-layout-breadcrumb {
  margin: 7px 0 -17px 24px;
}

.ant-layout-topaside .ant-layout-container {
  background: #fff;
  margin: 24px 0 0;
  position: relative;
  padding: 24px 0;
  overflow: hidden;
}

.ant-layout-topaside .ant-layout-sider {
  width: 224px;
  float: left;
}

.ant-layout-topaside .ant-layout-content {
  border-left: 1px solid #e9e9e9;
  padding: 0 24px;
  overflow: auto;
  position: relative;
  left: -1px;
}

.ant-layout-topaside .ant-layout-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
````
