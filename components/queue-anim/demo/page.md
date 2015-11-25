# 一个复杂些的例子

- order: 6

模拟一个完整的页面。

---

````jsx
import { QueueAnim, Button } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      show: true
    };
  },
  onClick() {
    this.setState({
      show: !this.state.show
    });
  },
  render() {
    return (
      <div>
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </p>
        <QueueAnim type={['right', 'left']}>
        {this.state.show ? [
          <div className="demo-header" key="header">
            <div className="logo">
              <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
              <span>logo</span>
            </div>
            <QueueAnim component="ul">
              <li key="0"></li>
              <li key="1"></li>
              <li key="2"></li>
              <li key="3"></li>
              <li key="4"></li>
            </QueueAnim>
          </div>,
          <QueueAnim className="demo-content" key="content" delay={300}>
            <div className="demo-title" key="title">我是标题</div>
            <div className="demo-kp" key="b">
              <QueueAnim component="ul">
                <li key="0"></li>
                <li key="1"></li>
                <li key="2"></li>
              </QueueAnim>
            </div>
            <div className="demo-title" key="title2">我是标题</div>
            <div className="demo-listBox">
              <QueueAnim className="demo-list" delay={500}>
                <div className="title" key="title3"></div>
                <QueueAnim component="ul" type="bottom" key="li">
                  <li key="0"></li>
                  <li key="1"></li>
                  <li key="2"></li>
                  <li key="3"></li>
                  <li key="4"></li>
                </QueueAnim>
              </QueueAnim>
            </div>
          </QueueAnim>,
          <QueueAnim delay={1000} type="bottom" key="footerBox">
            <div className="demo-footer" key="footer"></div>
          </QueueAnim>
        ] : null}
        </QueueAnim>
      </div>
    );
  }
});

ReactDOM.render(<Test />, document.getElementById('components-queue-anim-demo-page'));
````
