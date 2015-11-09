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
      <div className="ant-layout-header"></div>
      <div className="ant-layout-subheader"></div>
      <div className="ant-layout-main">
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
  background: #f4f4f4;
  height: 100%;
}

.ant-layout-top .ant-layout-header {
  background: #373737;
  height: 64px;
}

.ant-layout-top .ant-layout-subheader {
  height: 48px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
}

.ant-layout-top .ant-layout-breadcrumb {
  margin-top: 7px;
  margin-bottom: -17px;
}

.ant-layout-top .ant-layout-main {
  padding: 0 50px;
}

.ant-layout-top .ant-layout-container {
  background: #fff;
  margin-top: 24px;
}
````
