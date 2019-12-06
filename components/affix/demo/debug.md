---
order: 99
title:
  zh-CN: 调整浏览器大小，观察 Affix 容器是否发生变化。跟随变化为正常。#17678
  en-US:
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
