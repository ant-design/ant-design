---
order: 1
title: 进场和离场
---

同时支持进场和离场动画。

````jsx
import { QueueAnim, Button } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      show: true,
    };
  },
  onClick() {
    this.setState({
      show: !this.state.show,
    });
  },
  render() {
    const list = this.state.show ? [
      <div className="demo-kp" key="a">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>,
      <div className="demo-listBox" key="b">
        <div className="demo-list">
          <div className="title"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>,
    ] : null;
    return (
      <div>
        <p className="buttons">
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </p>
        <QueueAnim className="demo-content">
          {list}
        </QueueAnim>
      </div>
    );
  },
});

ReactDOM.render(<Test />, mountNode);
````
