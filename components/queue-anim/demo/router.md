---
order: 7
iframe: true
title: Router 默认进出场
---

router 组合的进场与出场动画。

````jsx
const ReactRouter = require('react-router');
let { Router, Route, Link, hashHistory } = ReactRouter;
import { QueueAnim, Menu } from 'antd';

function App(props) {
  const key = props.location.pathname;
  const keys = key.replace('/', '') ? [key.replace('/', '')] : ['home'];
  return (
    <div>
      <Menu style={{ marginBottom: 10 }} mode="horizontal" selectedKeys={keys}>
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="page1">
          <Link to="/page1">Page 1</Link>
        </Menu.Item>
        <Menu.Item key="page2">
          <Link to="/page2">Page 2</Link>
        </Menu.Item>
      </Menu>
      <QueueAnim type={['right', 'left']} className="demo-router-wrap">
        {React.cloneElement(props.children || <Home />, { key })}
      </QueueAnim>
    </div>
  );
}

function Home() {
  return (
    <div className="demo-router-child">
      <QueueAnim className="demo-content">
        <div className="demo-kp" key="a">
          <QueueAnim component="ul">
            <li key="0"></li>
            <li key="1"></li>
            <li key="2"></li>
          </QueueAnim>
        </div>
        <div className="demo-kp" key="b">
          <QueueAnim component="ul">
            <li key="0"></li>
            <li key="1"></li>
            <li key="2"></li>
          </QueueAnim>
        </div>
        <div className="demo-kp" key="c">
          <QueueAnim component="ul">
            <li key="0"></li>
            <li key="1"></li>
            <li key="2"></li>
          </QueueAnim>
        </div>
      </QueueAnim>
    </div>
  );
}

function Page1() {
  return (
    <div className="demo-router-child">
      <QueueAnim className="demo-content">
        <div className="demo-kp" key="b">
          <QueueAnim component="ul">
            <li key="0"></li>
            <li key="1"></li>
            <li key="2"></li>
          </QueueAnim>
        </div>
        <div className="demo-listBox">
          <QueueAnim className="demo-list" delay={200}>
            <div className="title" key="title3"></div>
            <QueueAnim component="ul" animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }} key="ul">
              <li key="0"></li>
              <li key="1"></li>
              <li key="2"></li>
            </QueueAnim>
          </QueueAnim>
        </div>
      </QueueAnim>
    </div>
  );
}

function Page2() {
  return (
    <div className="demo-router-child">
      <div className="demo-content">
        <div className="demo-listBox">
          <QueueAnim className="demo-list">
            <div className="title" key="title3"></div>
            <QueueAnim component="ul" animConfig={{ opacity: [1, 0], translateY: [0, 30], scale: [1, 0.9] }} key="li">
              <li key="0"></li>
              <li key="1"></li>
              <li key="2"></li>
              <li key="3"></li>
              <li key="4"></li>
              <li key="5"></li>
            </QueueAnim>
          </QueueAnim>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} ignoreScrollBehavior>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
), mountNode);
````

````css
#components-queue-anim-demo-router iframe {
  height: 260px;
}
#components-queue-anim-demo-router .demo-router-wrap {
  position: relative;
  width: 100%;
  margin: auto;
  height:200px;
  overflow: hidden;
}
#components-queue-anim-demo-router .queue-anim-leaving {
  position: absolute;
  width:100%;
}
````
