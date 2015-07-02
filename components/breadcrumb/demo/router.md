# 路由

- order: 2

和 `react-router@0.13.x` 进行结合使用。

---

````jsx
var Router = antd.Router;
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Breadcrumb = antd.Breadcrumb;

var About = React.createClass({
  render() {
    return <div></div>;
  }
});

var App = React.createClass({
  render() {
    return (<div>
      <div className="demo-nav">
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </div>
      <Breadcrumb />
      <RouteHandler />
    </div>);
  }
});

var routes = (
  <Route name="首页" path="/" handler={App} ignoreScrollBehavior>
    <Route name="关于" path="about" handler={About} />
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
  width: 40px;
  text-align: center;
  display: inline-block;
}
</style>
