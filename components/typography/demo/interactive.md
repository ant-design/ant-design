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

const { Text, Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    str: 'This is an editable text.',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  render() {
    return (
      <>
        <Text editable={{ onChange: this.onChange }}>{this.state.str}</Text>
        <br />
        <Text copyable>This is a copyable text.</Text>
        <br />
        <Text copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Text>
        <br />
        <Text copyable={{ icon: <SmileOutlined /> }}>Custom icon.</Text>
        <br />
        <Text copyable={{ tooltips: false }}>close tooltips text.</Text>
        <Paragraph copyable={{ tooltips: ['click here', 'you clicked!!'] }}>
          Replace tooltips text.
        </Paragraph>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
