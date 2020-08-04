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
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    str: 'This is an editable text.',
    customIconStr: 'Custom Edit icon and replace tooltip text.',
    hideTooltipStr: 'Hide Edit tooltip.',
    lengthLimitedStr: 'This is an editable text with limited length.',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  onCustomIconStrChange = customIconStr => {
    this.setState({ customIconStr });
  };

  onHideTooltipStrChange = hideTooltipStr => {
    this.setState({ hideTooltipStr });
  };

  onLengthLimitedStrChange = lengthLimitedStr => {
    this.setState({ lengthLimitedStr });
  };

  render() {
    const { lengthLimitedStr } = this.state;
    return (
      <>
        <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
        <Paragraph
          editable={{
            icon: <HighlightOutlined />,
            tooltip: ['click to edit text'],
            onChange: this.onCustomIconStrChange,
          }}
        >
          {this.state.customIconStr}
        </Text>
        <br />
        <Text editable={{ tooltip: false, onChange: this.onHideTooltipStrChange }}>
          {this.state.hideTooltipStr}
        </Text>
        <br />
        <Text
          editable={{
            onChange: this.onLengthLimitedStrChange,
            maxLength: 50,
            autoSize: { maxRows: 5, minRows: 3 },
          }}
        >
          {this.state.lengthLimitedStr}
        </Text>
        <br />
        <Text copyable>This is a copyable text.</Text>
        <br />
        <Text copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Text>
        <br />
        <Text
          copyable={{
            icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
            tooltips: ['click here', 'you clicked!!'],
          }}
        >
          Custom Copy icon and replace tooltips text.
        </Text>
        <br />
        <Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
