# 侧边导航

- order: 2

顶级导航在侧边栏。

---

````jsx
import { Menu, Breadcrumb } from 'antd';

ReactDOM.render(
  <BrowserDemo>
    <div className="ant-layout-aside">
      <aside className="ant-layout-sider">
      </aside>
      <div className="ant-layout-main">
        <div className="ant-layout-header"></div>
        <div className="ant-layout-container">
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-content">
            <div style={{ height: 290 }}></div>
          </div>
        </div>
      </div>
    </div>
  </BrowserDemo>
, document.getElementById('spec-layout-demo-aside'));
````

````css
.ant-layout-aside {
  background: #f4f4f4;
  height: 100%;
}

.ant-layout-aside .ant-layout-sider {
  width: 224px;
  height: 100%;
  position: absolute;
  background: #373737;
}

.ant-layout-aside .ant-layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
}

.ant-layout-aside .ant-layout-breadcrumb {
  margin-top: 7px;
  margin-bottom: -17px;
}

.ant-layout-aside .ant-layout-container {
  margin: 0 16px 16px 240px;
}

.ant-layout-aside .ant-layout-content {
  background: #fff;
  margin-top: 24px;
}
````
