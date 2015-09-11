# Router默认进出场

- order: 4

router组合的进场与出场动画。

---

````jsx
var ReactRouter = require('react-router');
var history = require('react-router/lib/HashHistory').history;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var EnterAnimation = antd.EnterAnimation;
var Menu = antd.Menu;

var App = React.createClass({
    getInitialState: function () {
      return {};
    },
    clickPage() {
      this.setState({
        enter: {delay:0.3},
        leave: {delay:0}
      });
    },
    render() {
      var key = this.props.location.pathname;
      return (
        <div>
          <Menu style={{marginBottom:20}} mode="horizontal">
            <Menu.Item key='page1'><Link to="/page1" onClick={this.clickPage}>Page 1</Link></Menu.Item>
            <Menu.Item key='page2'><Link to="/page2" onClick={this.clickPage}>Page 2</Link></Menu.Item>
          </Menu>
          <EnterAnimation className='demo-router-wap' enter={this.state.enter} leave={this.state.leave}>
            {React.cloneElement(this.props.children ||<div key='home' className='demo-router-child'><h1>Home</h1><div>这是首页</div></div>, {key: key})}
          </EnterAnimation>
        </div>
      );
    }
});
var Page1 = React.createClass({
  render() {
    return (
      <div className="demo-router-child">
        <h1>Page 1</h1>
        <p><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p><Link to="/page2">A link to page 2 should be active</Link>改变样式</p>
      </div>
    );
  }
});
var Page2 = React.createClass({
  render() {
    return (
      <div className="demo-router-child">
        <h1>Page 2</h1>
        <p><Link to="/page1">a link to page 1 </Link>我是页面2.</p>
        <p><Link to="/page1">a link to page 1 </Link>我是页面2.</p>
        <p><Link to="/page1">a link to page 1 </Link>我是页面2.</p>
        <p><Link to="/page1">a link to page 1 </Link>我是页面2.</p>
      </div>
    );
  }
});
React.render((
  <Router history={history}>
    <Route path="/" component={App} ignoreScrollBehavior>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
), document.getElementById('components-enter-animation-demo-router'));
````

<style>
#components-enter-animation-demo-router {
  text-align: center;
}
.demo-router-wap{
  position: relative;
  transition: height .5s;
  width: 300px;
  margin: auto;
}
.demo-router-child{
  text-align:left;
}
</style>
