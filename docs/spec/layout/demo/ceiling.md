# 吊顶规范

- order: 3

吊顶一般用于跨系统/应用场景，可以放置统一的登录/帮助信息。

吊顶背景深色，高度 `30px`，和浅色调的主导航配合使用。

---

````jsx
import { Menu, Breadcrumb } from 'antd';

ReactDOM.render(
  <BrowserDemo>
    <div className="ant-layout-ceiling-demo">
      <div className="ant-layout-ceiling">
        <div className="ant-layout-wrapper">
          <ul className="right">
            <li>xxx@example.com</li>
            <li>|</li>
            <li>帮助中心</li>
            <li>|</li>
            <li>客服/投诉电话：400-826-7710</li>
          </ul>
        </div>
      </div>
      <div className="ant-layout-header">
        <div className="ant-layout-wrapper">
          <div className="ant-layout-logo"></div>
        </div>
      </div>
    </div>
  </BrowserDemo>
, document.getElementById('spec-layout-demo-ceiling'));
````

````css
.ant-layout-ceiling-demo {
  height: 100%;
}

.ant-layout-ceiling {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  background-color: #242736;
  color: #ddd;
}

.ant-layout-ceiling .right {
  float: right;
}

.ant-layout-ceiling ul li {
  display: inline-block;
  margin: 0 4px;
}

.ant-layout-ceiling-demo .ant-layout-wrapper {
  padding: 0 50px;
}

.ant-layout-ceiling-demo .ant-layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #d9d9d9;
}

.ant-layout-ceiling-demo .ant-layout-logo {
  width: 120px;
  height: 32px;
  background: #eee;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}
````
