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

const { Text, Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    rows: 1,
    songForDrinking: '--李白',
    hamlet: '--William Shakespeare',
  };

  onChange = rows => {
    this.setState({ rows });
  };

  render() {
    const { rows, songForDrinking, hamlet } = this.state;
    const poetry =
      '君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来';
    const article =
      'To be, or not to be, that is a question: Whether it is nobler in the mind to sufferThe slings and arrows of outrageous fortune';
    return (
      <div>
        <Slider value={rows} min={1} max={10} onChange={this.onChange} />
        <div>
          <Paragraph ellipsis={{ rows, suffix: songForDrinking }} title={poetry + songForDrinking}>
            <Text code strong>
              将进酒
            </Text>
            {poetry}
          </Paragraph>
          <Paragraph ellipsis={{ rows, expandable: true, suffix: hamlet }} title={article + hamlet}>
            <Text code strong>
              Hamlet
            </Text>
            {article}
          </Paragraph>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
