---
order: 5
title:
  zh-CN: 控制关闭状态
  en-US: Controlled
---

## zh-CN

通过 `visible` 属性控制关闭状态。

## en-US

By using the `visible` prop, you can control the close state of Tag.

```jsx
import { Tag, Button } from '@allenai/varnish';

class Demo extends React.Component {
  state = {
    visible: true,
  };

  render() {
    return (
      <>
        <Tag
          closable
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          Movies
        </Tag>
        <br />
        <Button size="small" onClick={() => this.setState({ visible: !this.state.visible })}>
          Toggle
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
