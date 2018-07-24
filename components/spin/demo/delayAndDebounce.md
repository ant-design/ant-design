---
order: 5
title:
  zh-CN: 延迟
  en-US: delay
---

## zh-CN

延迟显示 loading 效果。当 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态。

## en-US

Specifies a delay for loading state. If `spinning` ends during delay, loading status won't appear.

````jsx
import { Spin, Alert, Switch } from 'antd';

class Card extends React.Component {
  state = { loading: false }

  toggle = (value) => {
    this.setState({ loading: value });
  }

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
        <Spin spinning={this.state.loading} delay={500}>{container}</Spin>
        <div style={{ marginTop: 16 }}>
          Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Card />, mountNode);
````
