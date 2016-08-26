---
order: 4
title:
  zh-CN: 动态
  en-US: Dynamic
---

## zh-CN

展示动态变化的效果。

## en-US

The count will be animated as it changes.

````jsx
import { Badge, Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const Test = React.createClass({
  getInitialState() {
    return {
      count: 5,
      show: true,
    };
  },
  increase() {
    const count = this.state.count + 1;
    this.setState({ count });
  },
  decline() {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  },
  onClick() {
    this.setState({
      show: !this.state.show,
    });
  },
  render() {
    return (
      <div>
        <Badge count={this.state.count}>
          <a href="#" className="head-example" />
        </Badge>
        <Badge dot={this.state.show}>
          <a href="#" className="head-example" />
        </Badge>
        <div style={{ marginTop: 10 }}>
          <ButtonGroup>
            <Button type="ghost" onClick={this.decline}>
              <Icon type="minus" />
            </Button>
            <Button type="ghost" onClick={this.increase}>
              <Icon type="plus" />
            </Button>
          </ButtonGroup>
          <Button type="ghost" onClick={this.onClick} style={{ marginLeft: 8 }}>
            切换红点显隐
          </Button>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <Test />
, mountNode);
````
