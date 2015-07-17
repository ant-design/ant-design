# 路由

- order: 2

和 `react-router@0.13.x` 进行结合使用。

---

````jsx
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Breadcrumb = require('antd/lib/breadcrumb');

var Apps = React.createClass({
  render() {
    return <ul className="app-list">
      <li><Link to="/apps/1">应用1</Link></li>
      <li><Link to="/apps/2">应用2</Link></li>
    </ul>;
  }
});

var App = React.createClass({
  render() {
    return (<div>
      <div className="demo-nav">
        <Link to="/">首页</Link>
        <Link to="/apps">应用列表</Link>
      </div>
      <RouteHandler />
      <div style={{
        marginBottom: 15,
        marginTop: 15,
        paddingBottom: 15,
        borderBottom: '1px dashed #ccc'
      }}>点击上面的导航切换页面，面包屑在下面：</div>
      <Breadcrumb Router={Router} />
    </div>);
  }
});

var routes = (
  <Route name="首页" path="/" handler={App} ignoreScrollBehavior>
    <Route name="应用列表" path="/apps" handler={Apps}>
      <Route name="应用:id" path="/apps/:id" handler={App} />
    </Route>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('components-breadcrumb-demo-router'));
});
````

<style>
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
</style>
