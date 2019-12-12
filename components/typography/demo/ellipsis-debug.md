---
order: 99
title:
  zh-CN: 省略号 Debug
  en-US: Ellipsis Debug
debug: true
---

## zh-CN

多行文本省略。

## en-US

Multiple line ellipsis support.

```jsx
import { Typography, Slider, Switch } from 'antd';
import { useState } from 'react';

const { Text, Paragraph } = Typography;

const Demo = () => {
  const [rows, setRows] = useState(1);
  const [longText, setLongText] = useState(true);
  const [copyable, setCopyable] = useState(false);
  const [editable, setDditable] = useState(false);
  const [expandable, setExpandable] = useState(false);

  return (
    <div>
      <Switch checked={longText} checkedChildren="Long Text" onChange={setLongText} />
      <Switch onChange={setCopyable} />
      <Switch onChange={setDditable} />
      <Switch onChange={setExpandable} />
      <Slider value={rows} min={1} max={10} onChange={setRows} />
      {longText ? (
        <Paragraph ellipsis={{ rows, expandable }} copyable={copyable} editable={editable}>
          Ant Design, a design language for background applications, is refined by Ant UED Team.
          This is a nest sample{' '}
          <Text code strong delete>
            Test
          </Text>{' '}
          case. Bnt Design, a design language for background applications, is refined by Ant UED
          Team. Cnt Design, a design language for background applications, is refined by Ant UED
          Team. Dnt Design, a design language for background applications, is refined by Ant UED
          Team. Ent Design, a design language for background applications, is refined by Ant UED
          Team.
        </Paragraph>
      ) : (
        <Paragraph ellipsis={{ rows, expandable }} copyable={copyable} editable={editable}>
          Hello World
        </Paragraph>
      )}
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
