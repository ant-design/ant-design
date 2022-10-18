import React, { useState } from 'react';
import { Slider, Switch, Typography } from 'antd';

const { Text, Paragraph } = Typography;

const App: React.FC = () => {
  const [rows, setRows] = useState(1);
  const [longText, setLongText] = useState(true);
  const [copyable, setCopyable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [expandable, setExpandable] = useState(false);
  const [display, setDisplay] = useState('none');

  React.useEffect(() => {
    setTimeout(() => {
      setDisplay('block');
    }, 100);
  }, []);

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

      <Text style={{ maxWidth: 400, fontSize: 24 }} copyable ellipsis>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text style={{ maxWidth: 400, fontSize: 12 }} copyable ellipsis>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text style={{ width: 400, fontSize: 24 }} copyable ellipsis>
        In the process of internal desktop applications development, many different design specs and
        implementations would be involved, which might cause designers and developers difficulties
        and duplication and reduce the efficiency of development.
      </Text>

      <br />

      <Text style={{ width: 100 }} ellipsis copyable>
        Ant Design is a design language for background applications, is refined by Ant UED Team.
      </Text>

      <p>
        [Before]<Text ellipsis>not ellipsis</Text>[After]
      </p>

      <div style={{ display }}>
        <Text style={{ width: 100 }} ellipsis={{ tooltip: 'I am ellipsis now!' }}>
          默认display none 样式的超长文字， 悬停tooltip失效了
        </Text>
      </div>
    </>
  );
};

export default App;
