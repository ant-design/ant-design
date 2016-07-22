---
order: 1
title:
  zh-CN: 不可用
  en-US: disabled
---

## zh-CN

Radio 不可用。

## en-US

Radio unavailable.

```jsx
import { Radio, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      disabled: true,
    };
  },
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  },
  render() {
    return (
      <div>
        <Radio defaultChecked={false} disabled={this.state.disabled}>不可用</Radio>
        <br />
        <Radio defaultChecked disabled={this.state.disabled}>不可用</Radio>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={this.toggleDisabled}>
            Toggle disabled
          </Button>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
```
