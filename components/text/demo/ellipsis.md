---
order: 4
title:
  zh-CN: 省略号
  en-US: Ellipsis
only: true
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
    rows: 1,
  };

  onChange = (rows) => {
    this.setState({ rows });
  };

  render() {
    const { rows } = this.state;
    return (
      <div>
        <Slider value={rows} min={1} max={10} onChange={this.onChange} />
        <Paragraph rows={rows} copyable>
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
