# 路由

- order: 2

和 `react-router@1.x` 进行结合使用。

---

````jsx
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Breadcrumb = require('antd').Breadcrumb;

var Apps = React.createClass({
  render() {
    return <ul className="app-list">
      <li><Link to="/apps/1">应用1</Link></li>
      <li><Link to="/apps/2">应用2</Link></li>
    </ul>;
  }
});

var Home = React.createClass({
  render() {
    return (<div>
      <div className="demo-nav">
        <Link to="/">首页</Link>
        <Link to="/apps">应用列表</Link>
      </div>
      {this.props.children || 'Home'}
      <div style={{
        marginBottom: 15,
        marginTop: 15,
        paddingBottom: 15,
        borderBottom: '1px dashed #ccc'
      }}>点击上面的导航切换页面，面包屑在下面：</div>
      <Breadcrumb {...this.props} router={ReactRouter} />
    </div>);
  }
});

React.render((
  <Router>
    <Route name="home" breadcrumbName="首页" path="/" component={Home} ignoreScrollBehavior>
      <Route name="apps" breadcrumbName="应用列表" path="apps" component={Apps}>
        <Route name="app" breadcrumbName="应用:id" path=":id" />
      </Route>
    </Route>
  </Router>
), document.getElementById('components-breadcrumb-demo-router'));
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
