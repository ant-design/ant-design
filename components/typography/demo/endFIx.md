---
order: 100
title:
  zh-CN: 后缀
  en-US: endFix
---

## zh-CN

含有后缀的省略。

## en-US

have endFix ellipsis support.

```jsx
import { Typography, Slider, Switch } from 'antd';

const { Text, Paragraph, Title } = Typography;

class Demo extends React.Component {
  state = {
    rows: 1,
    songForDrinking: '--李白',
    Hamlet: '--William Shakespeare',
  };

  onChange = rows => {
    this.setState({ rows });
  };

  render() {
    const { rows, songForDrinking, Hamlet } = this.state;
    return (
      <div>
        <Slider value={rows} min={1} max={10} onChange={this.onChange} />
        <div>
          <Paragraph ellipsis={{ rows, expandable: true }} endFix={songForDrinking}>
            <Text code strong>
              将进酒
            </Text>
            君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。
          </Paragraph>
          <Paragraph ellipsis={{ rows, expandable: true }} endFix={Hamlet}>
            <Text code strong>
              Hamlet
            </Text>
            To be, or not to be, that is a question: Whether 'tis nobler in the mind to sufferThe slings
            and arrows of outrageous fortune.
          </Paragraph>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
