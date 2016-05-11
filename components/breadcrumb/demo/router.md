---
order: 2
iframe: true
title: 路由
---

和 `react-router@2.x` 进行结合使用。

````jsx
const ReactRouter = require('react-router');
let { Router, Route, Link, hashHistory } = ReactRouter;
import { Breadcrumb } from 'antd';

function Apps() {
  return (
    <ul className="app-list">
      <li>
        <Link to="/apps/1">应用1</Link>：<Link to="/apps/1/detail">详情</Link>
      </li>
      <li>
        <Link to="/apps/2">应用2</Link>：<Link to="/apps/2/detail">详情</Link>
      </li>
    </ul>
  );
}

function Home(props) {
  return (
    <div>
      <div className="demo-nav">
        <Link to="/">首页</Link>
        <Link to="/apps">应用列表</Link>
      </div>
      {props.children || 'Home'}
      <div style={{
        marginBottom: 15,
        marginTop: 15,
        paddingBottom: 15,
        borderBottom: '1px dashed #ccc',
      }}>
        点击上面的导航切换页面，面包屑在下面：
      </div>
      <Breadcrumb {...props} />
    </div>
  );
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route name="home" breadcrumbName="首页" path="/" component={Home}>
      <Route name="apps" breadcrumbName="应用列表" path="apps" component={Apps}>
        <Route name="app" breadcrumbName="应用:id" path=":id">
          <Route name="detail" breadcrumbName="详情" path="detail" />
        </Route>
      </Route>
    </Route>
  </Router>
, mountNode);
````

````css
#components-breadcrumb-demo-router iframe {
  height: 180px;
}
.demo-nav {
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  background: #f8f8f8;
}
.demo-nav a {
  line-height: 30px;
  padding: 0 10px;
}
.app-list {
  margin-top: 15px;
}
````
