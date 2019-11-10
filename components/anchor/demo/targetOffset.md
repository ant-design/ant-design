---
order: 5
title:
  zh-CN: 设置锚点滚动偏移量
  en-US: Set Anchor scroll offset
---

## zh-CN

锚点目标滚动到屏幕正中间。

## en-US

Anchor target scroll to screen center.

```jsx
import { Anchor } from 'antd';

const { Link } = Anchor;

class AnchorExample extends React.Component {
  state = {
    targetOffset: undefined,
  };

  componentDidMount() {
    this.setState({
      targetOffset: window.innerHeight / 2,
    });
  }

  render() {
    return (
      <Anchor targetOffset={this.state.targetOffset}>
        <Link href="#components-anchor-demo-basic" title="Basic demo" />
        <Link href="#components-anchor-demo-static" title="Static demo" />
        <Link href="#API" title="API">
          <Link href="#Anchor-Props" title="Anchor Props" />
          <Link href="#Link-Props" title="Link Props" />
        </Link>
      </Anchor>
    );
  }
}

ReactDOM.render(<AnchorExample />, mountNode);
```
