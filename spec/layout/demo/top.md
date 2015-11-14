# 顶部导航

- order: 0

一二级导航都在顶部。

> `<BrowserDemo />` 做演示用，无须复制。

---

````jsx
import { Menu, Breadcrumb } from 'antd';

ReactDOM.render(
  <BrowserDemo>
    <div className="ant-layout-top">
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
          <div style={{ height: 240 }}></div>
        </div>
      </div>
    </div>
  </BrowserDemo>
, document.getElementById('spec-layout-demo-top'));
````

````css
.ant-layout-top {
  height: 100%;
}

.ant-layout-top .ant-layout-wrapper {
  padding: 0 50px;
}

.ant-layout-top .ant-layout-header {
  background: #404040;
  height: 64px;
}

.ant-layout-top .ant-layout-logo {
  width: 120px;
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}

.ant-layout-top .ant-layout-subheader {
  height: 48px;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
}

.ant-layout-top .ant-layout-breadcrumb {
  margin: 7px 0 -17px 24px;
}

.ant-layout-top .ant-layout-container {
  background: #fff;
  margin: 24px 0;
  position: relative;
  padding-top: 24px;
  overflow: hidden;
}
````
