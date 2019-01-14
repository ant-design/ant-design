---
order: 3
title:
  zh-CN: 省略号
  en-US: ellipsis
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Text, Slider } from 'antd';

const { Paragraph } = Text;

class Demo extends React.Component {
  state = {
    lines: 1,
  };

  onChange = (lines) => {
    this.setState({ lines });
  };

  render() {
    const { lines } = this.state;
    return (
      <div>
        <Slider value={lines} min={1} max={10} onChange={this.onChange} />
        <Paragraph lines={lines}>
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />
  , mountNode);
```
