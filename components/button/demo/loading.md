---
order: 4
title:
  zh-CN: 加载中状态
  en-US: Loading
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

## en-US

A loading indicator can be added to a button by setting the `loading` property on the `Button`.

````__react
import { Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      iconLoading: false,
    };
  },
  enterLoading() {
    this.setState({ loading: true });
  },
  enterIconLoading() {
    this.setState({ iconLoading: true });
  },
  render() {
    return (
      <div>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          Click me!
        </Button>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
