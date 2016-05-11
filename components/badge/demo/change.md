---
order: 4
title: 动态
---

展示动态变化的效果。

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
          <a href="#" className="head-example"></a>
        </Badge>
        <Badge dot={this.state.show}>
          <a href="#" className="head-example"></a>
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
