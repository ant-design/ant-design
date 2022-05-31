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

```tsx
import { Slider, Switch, Typography } from 'antd';
import React, { useState } from 'react';

const { Text, Paragraph } = Typography;

const App: React.FC = () => {
  const [rows, setRows] = useState(1);
  const [longText, setLongText] = useState(true);
  const [copyable, setCopyable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [expandable, setExpandable] = useState(false);

  return (
    <>
      <Switch checked={longText} checkedChildren="Long Text" onChange={setLongText} />
      <Switch checked={copyable} onChange={setCopyable} />
      <Switch checked={editable} onChange={setEditable} />
      <Switch checked={expandable} onChange={setExpandable} />
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

      <Text style={{ width: 100 }} ellipsis copyable>
        Ant Design is a design language for background applications, is refined by Ant UED Team.
      </Text>

      <p>
        [Before]<Text ellipsis>not ellipsis</Text>[After]
      </p>
    </>
  );
};

export default App;
```
