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
import { Radio, Button } from '@allenai/varnish';

class App extends React.Component {
  state = {
    disabled: true,
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    return (
      <>
        <Radio defaultChecked={false} disabled={this.state.disabled}>
          Disabled
        </Radio>
        <Radio defaultChecked disabled={this.state.disabled}>
          Disabled
        </Radio>
        <br />
        <Button type="primary" onClick={this.toggleDisabled} style={{ marginTop: 16 }}>
          Toggle disabled
        </Button>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
