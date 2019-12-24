---
order: 100
title:
  zh-CN: 后缀
  en-US: suffix
---

## zh-CN

添加后缀的省略。

## en-US

add suffix ellipsis support.

```jsx
import { Typography, Slider } from 'antd';

const { Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    rows: 1,
  };

  onChange = rows => {
    this.setState({ rows });
  };

  render() {
    const { rows } = this.state;
    const article =
      'To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune';
    return (
      <div>
        <Slider value={rows} min={1} max={10} onChange={this.onChange} />
        <Paragraph
          ellipsis={{
            rows,
            expandable: true,
            suffix: '--William Shakespeare',
          }}
          title={`${article}--William Shakespeare`}
        >
          {article}
        </Paragraph>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
