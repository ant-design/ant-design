# Router 默认进出场

- order: 7

router 组合的进场与出场动画。

---

````jsx
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var QueueAnim = antd.QueueAnim;
var Menu = antd.Menu;

var App = React.createClass({
  render() {
    var key = this.props.location.pathname;
    var keys = key.replace('/','') ? [ key.replace('/','') ] : [ 'home' ];
    return (
      <div>
        <Menu style={{marginBottom: 10}} mode="horizontal" selectedKeys={keys}>
          <Menu.Item key='home'>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key='page1'>
            <Link to="/page1">Page 1</Link>
          </Menu.Item>
          <Menu.Item key='page2'>
            <Link to="/page2">Page 2</Link>
          </Menu.Item>
        </Menu>
        <QueueAnim type={['right','left']} className='demo-router-wap'>
          {React.cloneElement(this.props.children||<Home/>, {key: key})}
        </QueueAnim>
      </div>
    );
  }
});
var Home = React.createClass({
  render() {
    return (
      <div className='demo-router-child'>
        <QueueAnim className="demo-content">
          <div className="demo-kp" key='a'>
            <QueueAnim component='ul'>
              <li key='t_li0'></li>
              <li key='t_li1'></li>
              <li key='t_li2'></li>
            </QueueAnim>
          </div>
          <div className="demo-kp" key='b'>
            <QueueAnim component='ul'>
              <li key='t_li0'></li>
              <li key='t_li1'></li>
              <li key='t_li2'></li>
            </QueueAnim>
          </div>
          <div className="demo-kp" key='c'>
            <QueueAnim component='ul'>
              <li key='t_li0'></li>
              <li key='t_li1'></li>
              <li key='t_li2'></li>
            </QueueAnim>
          </div>
        </QueueAnim>
      </div>
    );
  }
})
var Page1 = React.createClass({
  render() {
    return (
      <div className='demo-router-child'>
        <QueueAnim className="demo-content">
          <div className="demo-kp" key='b'>
            <QueueAnim component='ul'>
              <li key='t_li0'></li>
              <li key='t_li1'></li>
              <li key='t_li2'></li>
            </QueueAnim>
          </div>
          <div className="demo-listBox">
            <QueueAnim className="demo-list" delay={200}>
              <div className="title" key='title3'></div>
              <QueueAnim component='ul' type='bottom' key='ul'>
                <li key='tt_li0'></li>
                <li key='tt_li1'></li>
                <li key='tt_li2'></li>
              </QueueAnim>
            </QueueAnim>
          </div>
        </QueueAnim>
      </div>
    );
  }
});
var Page2 = React.createClass({
  render() {
    return (
      <div className='demo-router-child'>
        <div className="demo-content" >
          <div className="demo-listBox">
            <QueueAnim className="demo-list">
              <div className="title" key='title3'></div>
              <QueueAnim component='ul' type='bottom' key='li'>
                <li key='tt_li0'></li>
                <li key='tt_li1'></li>
                <li key='tt_li2'></li>
                <li key='tt_li3'></li>
                <li key='tt_li4'></li>
              </QueueAnim>
            </QueueAnim>
          </div>
        </div>
      </div>
    );
  }
});
React.render((
  <Router>
    <Route path="/" component={App} ignoreScrollBehavior>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
), document.getElementById('components-queue-anim-demo-router'));
````

<style>
#components-queue-anim-demo-router {
  text-align: center;
  overflow: hidden;
}
#components-queue-anim-demo-router .demo-router-wap{
  position: relative;
  width: 100%;
  margin: auto;
  height:200px;
  overflow: hidden;
}
#components-queue-anim-demo-router .queue-anim-leaving{
  position: absolute;
  width:100%;
}
</style>
