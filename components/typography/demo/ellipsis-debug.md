---
order: 99
title:
  zh-CN: 省略号 Debug
  en-US: Ellipsis Debug
debug: true
only: true
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Typography, Slider } from 'antd';

const { Text, Paragraph } = Typography;

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
          This is a nest sample <Text code strong delete>Test</Text> case.
          Bnt Design, a design language for background applications, is refined by Ant UED Team.
          Cnt Design, a design language for background applications, is refined by Ant UED Team.
          Dnt Design, a design language for background applications, is refined by Ant UED Team.
          Ent Design, a design language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />
  , mountNode);
```
