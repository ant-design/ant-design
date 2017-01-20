---
order: 1
title:
  zh-CN: 不可用
  en-US: Disabled
---

## zh-CN

Switch 失效状态。

## en-US

Disabled state of `Switch`.

````__react
import { Switch, Button } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      disabled: true,
    };
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },
  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} />
        <br />
        <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
      </div>
    );
  },
});

ReactDOM.render(<Test />, mountNode);
````
