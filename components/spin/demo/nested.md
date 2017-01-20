---
order: 3
title:
  zh-CN: 卡片加载中
  en-US: Embedded mode
---

## zh-CN

可以直接把内容内嵌到 `Spin` 中，将现有容器变为加载状态。

## en-US

Embedding content into `Spin` will alter it into loading state.

````__react
import { Spin, Switch, Alert } from 'antd';

const Card = React.createClass({
  getInitialState() {
    return { loading: false };
  },
  toggle(value) {
    this.setState({ loading: value });
  },
  render() {
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    );
    return (
      <div>
        <Spin spinning={this.state.loading}>{container}</Spin>
        Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
      </div>
    );
  },
});

ReactDOM.render(<Card />, mountNode);
````
