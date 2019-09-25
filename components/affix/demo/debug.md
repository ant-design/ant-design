---
order: 99
title:
  zh-CN: 调试
  en-US: Debug
debug: true
---

## zh-CN

DEBUG

## en-US

DEBUG

```jsx
import { Affix, Button } from 'antd';

class Demo extends React.Component {
  state = {
    top: 10,
  };

  render() {
    return (
      <div style={{ height: 10000 }}>
        <div>Top</div>
        <Affix offsetTop={this.state.top}>
          <div style={{ background: 'red' }}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  top: this.state.top + 10,
                });
              }}
            >
              Affix top
            </Button>
          </div>
        </Affix>
        <div>Bottom</div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
