---
order: 2
iframe: true
title:
  zh-CN: 路由
  en-US: React Router Integration
---

## zh-CN

和 `react-router@2.x` 进行结合使用。

## en-US

Used together with `react-router@2.x`.

````jsx
import { Router, Route, Link, hashHistory } from 'react-router';
import { Breadcrumb } from 'antd';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);

const Home = (props) => (
  <div>
    <div className="demo-nav">
      <Link to="/">Home</Link>
      <Link to="/apps">Application List</Link>
    </div>
    {props.children || 'Home'}
    <div
      style={{
        marginBottom: 15,
        marginTop: 15,
        paddingBottom: 15,
        borderBottom: '1px dashed #ccc',
      }}
    >
      Click the navigation above to switch:
    </div>
    <Breadcrumb {...props} />
  </div>
);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route name="home" breadcrumbName="Home" path="/" component={Home}>
      <Route name="apps" breadcrumbName="Application List" path="apps" component={Apps}>
        <Route name="app" breadcrumbName="Application:id" path=":id">
          <Route name="detail" breadcrumbName="Detail" path="detail" />
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
