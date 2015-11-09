# 顶部导航 + 侧边栏

- order: 1

顶级导航在头部，次级导航在侧边栏。

---

````jsx
import { Menu, Breadcrumb } from 'antd';

ReactDOM.render(
  <BrowserDemo>
    <div className="ant-layout-topaside">
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
          <aside className="ant-layout-sider">
          </aside>
          <div className="ant-layout-content">
            <div style={{ height: 240 }}></div>
          </div>
        </div>
      </div>
    </div>
  </BrowserDemo>
, document.getElementById('spec-layout-demo-top-aside'));
````

````css
.ant-layout-topaside {
  background: #f4f4f4;
  height: 100%;
}

.ant-layout-topaside .ant-layout-header {
  background: #373737;
  height: 64px;
}

.ant-layout-topaside .ant-layout-subheader {
  height: 48px;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;
}

.ant-layout-topaside .ant-layout-breadcrumb {
  margin-top: 7px;
  margin-bottom: -17px;
}

.ant-layout-topaside .ant-layout-main {
  padding: 0 50px;
}

.ant-layout-topaside .ant-layout-container {
  background: #fff;
  margin-top: 24px;
  position: relative;
}

.ant-layout-topaside .ant-layout-sider {
  width: 224px;
  height: 100%;
  position: absolute;
}

.ant-layout-topaside .ant-layout-content {
  border-left: 1px solid #e9e9e9;
  margin-left: 224px;
}
````
