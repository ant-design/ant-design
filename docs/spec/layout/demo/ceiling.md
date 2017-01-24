---
order: 3
title:
  zh-CN: 吊顶规范
  en-US: Ceiling
---
## zh-CN

吊顶一般用于跨系统/应用场景，可以放置统一的登录/帮助信息。

吊顶背景深色，高度 `30px`，和浅色调的主导航配合使用。

## en-US

Generally, ceiling is used for cross system/applications, where you can put uniform login/help information on top of the page.

Background color of a ceiling is a dark color, height is `30px`, and a light color foreground for the mainnav should be used.

````__react
import { Menu, Breadcrumb } from 'antd';
import BrowserDemo from 'site/theme/template/BrowserDemo';

ReactDOM.render(
  <BrowserDemo>
    <div className="layout-ceiling-demo">
      <div className="layout-ceiling">
        <div className="layout-wrapper">
          <ul className="right">
            <li>xxx@example.com</li>
            <li>|</li>
            <li>Help Center</li>
            <li>|</li>
            <li>Custom Service/Complaint Center phone：400-826-7710</li>
          </ul>
        </div>
      </div>
      <div className="layout-header">
        <div className="layout-wrapper">
          <div className="layout-logo"></div>
        </div>
      </div>
    </div>
  </BrowserDemo>
, mountNode);
````

````css
.layout-ceiling-demo {
  height: 100%;
}

.layout-ceiling {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  background-color: #242736;
  color: #ddd;
}

.layout-ceiling .right {
  float: right;
}

.layout-ceiling ul li {
  display: inline-block;
  margin: 0 4px;
}

.layout-ceiling-demo .layout-wrapper {
  padding: 0 50px;
}

.layout-ceiling-demo .layout-header {
  background: #fff;
  height: 64px;
  border-bottom: 1px solid #e9e9e9;
}

.layout-ceiling-demo .layout-logo {
  width: 120px;
  height: 32px;
  background: #eee;
  border-radius: 4px;
  margin: 16px 24px 16px 0;
  float: left;
}
````
