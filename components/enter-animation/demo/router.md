# 表单动画进场

- order: 2

router组全合的进场与出场动画。

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
      return {
        enter: {
          type: 'margin-top:10px;opacity:0',
          interval: 0.1,
          delay: 0,
          callback: function (e) {
            console.log('我进场了', e.ReactElement.key)
          },
          ease: null
        },
        leave: null
      };
    },
    clickPage1() {
      this.setState({
        enter: {
          interval: 0.03,
          type: 'margin-top:10px;opacity:0',
          ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
          delay:0.3,
          callback: function (e) {
            console.log('你点了page1,进场用的是你自定的效果', e.direction);
          }
        },
        leave: {
          type: 'left',
          upend: true,
          interval:0.05,
          duration:0.2,
          ease: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
          delay:0.000001,
          callback: function (e) {
            console.log('你点了page1,出场用的是你自定的效果', e.direction);
            console.log('如果你在用了的参数，在出场没有设定，那么出场没设的将用回进场那设定的参数，如upend，从最后个开始')
          }
        }
      })
    },
    clickPage2() {
      this.setState({
        enter: {
          interval: 0.03,
          type: 'top',
          ease: null,
          delay:.3,
          callback: function (e) {
            console.log('你点了page2,leave为null,出场进场同效果', e.direction)
          }
        },
        leave: {
          delay:0.00001
        }
      })
    },
    render() {
      var key = this.props.location.pathname;
      var height = 200;
      switch (key) {
        case '/page1':
          height = 210;
          break;
        case '/page2':
          height = 190;
          break;
        default :
          height = 100;
      }
      return (
        <div>
          <div style={{marginBottom:20}}>
            <Link to="/page1" onClick={this.clickPage1} className="ant-btn ant-btn-primary" style={{marginLeft:10}}>Page 1</Link>
            <Link to="/page2" onClick={this.clickPage2} className="ant-btn ant-btn-primary" style={{marginLeft:10}}>Page 2</Link>
          </div>
          <EnterAnimation className='demo-router-wap' enter={this.state.enter} leave={this.state.leave}  ref='myChild' style={{height: height}}>
            {React.cloneElement(this.props.children ||<div key='home' className='demo-router-child'><h1>Home</h1><div>这是首页</div></div>, {key: key})}
          </EnterAnimation>
        </div>
      );
    }
});

var Page1 = React.createClass({
  render() {
    return (
      <div className="demo-router-child" ref='page1'>
        <h1 data-enter='{"type":"right"}'>Page 1</h1>
        <p data-enter='{"type":"top"}'>
          <Link to="/page2">A link to page 1 should be active</Link>
          我是页面1</p>
        <p data-enter='{"type":"top"}'>
          <Link to="/page2" data-enter='{"type":"bottom"}'>A link to page 1 should be active</Link>
          我是页面1</p>
        <p data-enter='{"type":"right"}'>
          <Link to="/page2">A link to page 1 should be active</Link>
          我是页面1</p>
        <p data-enter='{"type":"left"}'>
          <Link to="/page2">A link to page 1 should be active</Link>
          我是页面1</p>
        <p data-enter='{"duration":0.3}'>
          <Link to="/page2">A link to page 1 should be active</Link>
          我是页面1</p>
      </div>
    );
  }
});

var Page2 = React.createClass({
  render() {
    return (
      <div className="demo-router-child" ref='page2'>
        <h1>Page 2</h1>
        <p>
          <Link to="/page1">a link to page 2 </Link>
          我是页面2.</p>
        <p>
          <Link to="/page1">a link to page 2 </Link>
          我是页面2.</p>
        <p>
          <Link to="/page1">a link to page 2 </Link>
          我是页面2.</p>
        <p>
          <Link to="/page1">a link to page 2 </Link>
          我是页面2.</p>
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
  width: 600px;
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
.demo-router-wap{
  position: relative;
  transition: height .5s;
  width: 300px;
  margin: auto;
}
.demo-router-child{
  position: absolute;
}
.demo-router-child h1{
  margin:0;
  text-align:left;
}
</style>
