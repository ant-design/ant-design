---
order: 8
title:
  zh-CN: 受控
  en-US: Controlled
---

## zh-CN

受控制的页码。

## en-US

Controlled page number.

````__react
import { Pagination } from 'antd';

const Container = React.createClass({
  getInitialState() {
    return {
      current: 3,
    };
  },
  onChange(page) {
    console.log(page);
    this.setState({
      current: page,
    });
  },
  render() {
    return <Pagination current={this.state.current} onChange={this.onChange} total={50} />;
  },
});

ReactDOM.render(<Container />, mountNode);
````
