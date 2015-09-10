# Router数据控制

- order: 4

router的data-enter和data-leave控制进出场动画。

---

````jsx
var ReactRouter = require('react-router');
var history = require('react-router/lib/HashHistory').history;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var EnterAnimation = antd.EnterAnimation;

var App = React.createClass({
  getInitialState: function () {
      return {};
    },
    clickPage() {
      this.setState({
        enter: {interval: 0.05,type: 'bottom',ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)',delay:0.3,},
        leave: {upend: true,duration:0.2,ease: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',delay:0}//interval与type不重写将继承enter里的数据
      })
    },
    render() {
      var key = this.props.location.pathname;
      return (
        <div>
          <div style={{marginBottom:20}}>
            <Link to="/page1" onClick={this.clickPage} className="ant-btn ant-btn-primary">Page 1</Link>
            <Link to="/page2" onClick={this.clickPage} className="ant-btn ant-btn-primary" style={{marginLeft:10}}>Page 2</Link>
          </div>
          <EnterAnimation className='demo-router-wap' enter={this.state.enter} leave={this.state.leave}>
            {React.cloneElement(this.props.children ||<div key='home' className='demo-router-child'><h1>Home</h1><div>这是首页</div></div>, {key: key})}
          </EnterAnimation>
        </div>
      );
    }
});
var Page1 = React.createClass({
  render() {
    var enterData = {};
    return (
      <div className="demo-router-child">
        <h1 data-enter>Page 1</h1>
        <p data-enter><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p data-enter><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p data-enter><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p data-enter><Link to="/page2">A link to page 2 should be active</Link>依次进场</p>
        <p data-enter='{"type":"right"}' data-leave='{"type":"left"}'><Link to="/page2">A link to page 2 should be active</Link>改变样式</p>
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
), document.getElementById('components-enter-animation-demo-router-data'));
````

<style>
#components-enter-animation-demo-router-data {
  text-align: center;
  margin: 20px auto;
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
