---
order: 6
title:
  zh-CN: 节流按钮
  en-US: throttle Button
---

## zh-CN

添加 `interval` 属性即可让按钮处于节流状态。

## en-US

Add the 'interval' attribute to make the `Button` in `throttling` state.

```jsx
import { Button } from 'antd';

class App extends React.Component {
  previewInterval = () => {
      console.log("timeout 1000ms later")
  }

  render() {
    return (
      <>
        <Button
          interval={1000}
          type="primary"
          onClick={this.previewInterval}
        >
            Button
        </Button>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
