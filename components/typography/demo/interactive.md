---
order: 3
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供可编辑和可复制等额外的交互能力。

## en-US

Provide additional interactive capacity of editable and copyable.

```jsx
import { Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    str: 'This is an editable text.',
    lengthLimitedStr: 'This is an editable text with limited length.',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  onLengthLimitedStrChange = lengthLimitedStr => {
    this.setState({ lengthLimitedStr });
  };

  render() {
    return (
      <>
        <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
        <Paragraph
          editable={{
            onChange: this.onLengthLimitedStrChange,
            maxLength: 50,
            autoSize: { maxRows: 5, minRows: 3 },
          }}
        >
          {this.state.lengthLimitedStr}
        </Paragraph>
        <Paragraph copyable>This is a copyable text.</Paragraph>
        <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
        <Paragraph copyable={{ icon: <SmileOutlined /> }}>Custom icon.</Paragraph>
        <Paragraph copyable={{ tooltips: ['click here', 'you clicked!!'] }}>
          Replace tooltips text.
        </Paragraph>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
