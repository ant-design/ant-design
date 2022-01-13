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
import { CheckOutlined, HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Paragraph } = Typography;

const Demo = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState('Custom Edit icon and replace tooltip text.');
  const [clickTriggerStr, setClickTriggerStr] = useState(
    'Text or icon as trigger - click to start editing.',
  );
  const [chooseTrigger, setChooseTrigger] = useState('icon');
  const [customEnterIconStr, setCustomEnterIconStr] = useState(
    'Editable text with a custom enter icon in edit field.',
  );
  const [noEnterIconStr, setNoEnterIconStr] = useState(
    'Editable text with no enter icon in edit field.',
  );
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );

  const radioToState = input => {
    switch (input) {
      case 'text':
        return ['text'];
      case 'both':
        return ['icon', 'text'];
      case 'icon':
      default:
        return ['icon'];
    }
  };

  const stateToRadio = () => {
    if (chooseTrigger.indexOf('text') !== -1) {
      return chooseTrigger.indexOf('icon') !== -1 ? 'both' : 'text';
    }
    return 'icon';
  };

  return (
    <>
      <Paragraph copyable={{ text: 'Hello, Ant Design!', tooltips: ['abc', ''] }}>
        Replace copy text.
      </Paragraph>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
