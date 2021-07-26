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
import React, { useState } from 'react';
import { Checkbox, Radio, Typography } from 'antd';
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Paragraph } = Typography;

const Demo: React.FC = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState('Custom Edit icon and replace tooltip text.');
  const [clickTriggerStr, setClickTriggerStr] = useState(
    'Click as trigger - click to start editing.',
  );
  const [chooseTrigger, setChooseTrigger] = useState('icon');
  const [alwaysShowIcon, setAlwaysShowIcon] = useState(false);
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );

  return (
    <>
      <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined />,
          tooltip: 'click to edit text',
          onChange: setCustomIconStr,
        }}
      >
        {customIconStr}
      </Paragraph>
      Trigger edit with:{' '}
      <Radio.Group onChange={e => setChooseTrigger(e.target.value)} value={chooseTrigger}>
        <Radio value="icon">icon</Radio>
        <Radio value="value">value</Radio>
        <Radio value="both">both</Radio>
      </Radio.Group>
      <Checkbox checked={alwaysShowIcon} onChange={e => setAlwaysShowIcon(e.target.checked)}>
        always show edit icon
      </Checkbox>
      <Paragraph
        editable={{
          tooltip: 'click to edit text',
          onChange: setClickTriggerStr,
          editTrigger: chooseTrigger,
          alwaysShowEditIcon: alwaysShowIcon,
        }}
      >
        {clickTriggerStr}
      </Paragraph>
      <Paragraph editable={{ tooltip: false, onChange: setHideTooltipStr }}>
        {hideTooltipStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setLengthLimitedStr,
          maxLength: 50,
          autoSize: { maxRows: 5, minRows: 3 },
        }}
      >
        {lengthLimitedStr}
      </Paragraph>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
      <Paragraph
        copyable={{
          icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
          tooltips: ['click here', 'you clicked!!'],
        }}
      >
        Custom Copy icon and replace tooltips text.
      </Paragraph>
      <Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
