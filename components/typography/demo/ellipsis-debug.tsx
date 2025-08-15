import React, { useState } from 'react';
import { Button, Select, Slider, Switch, Typography } from 'antd';

const { Text, Paragraph } = Typography;
const { Option } = Select;

const templateStr =
  'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.';

const text = `this is a multiline
  text that has many
  lines and
    - render like this
    - and this

  and that`;

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
        {templateStr}
      </Text>

      <br />

      <Text style={{ maxWidth: 400, fontSize: 12 }} copyable ellipsis>
        {templateStr}
      </Text>

      <br />

      <Text style={{ width: 400, fontSize: 24 }} copyable ellipsis>
        {templateStr}
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
      <h4>Typography Ellipsis Tooltip Issue in Select</h4>
      <Select style={{ width: 568 }}>
        <Option value="A">
          <Paragraph
            style={{
              margin: 0,
            }}
            ellipsis={{
              tooltip: 'Short',
            }}
          >
            Short
          </Paragraph>
        </Option>
        <Option value="B">
          <Paragraph
            style={{
              margin: 0,
              width: 300,
            }}
            className="ant-select-selection-item-option"
            ellipsis={{
              tooltip: 'One Tooltip (This is a repeatedly used test statement)',
            }}
          >
            One (This is a repeatedly used test statement, This is a repeatedly used test statement,
            This is a repeatedly used test statement)
          </Paragraph>
        </Option>
        <Option value="C">
          <Paragraph
            style={{
              margin: 0,
            }}
            ellipsis={{
              tooltip: 'Two Tooltip (This is a repeatedly used test statement)',
            }}
          >
            Two (This is a repeatedly used test statement, This is a repeatedly used test statement,
            This is a repeatedly used test statement)
          </Paragraph>
        </Option>
      </Select>

      <Typography.Paragraph
        style={{ width: 300 }}
        ellipsis={{
          rows: 3,
          expandable: true,
          symbol: <Button>Open</Button>,
        }}
      >
        {templateStr.slice(0, 60)}
        <span style={{ fontSize: '5em' }}>ANTD</span>
        {templateStr.slice(60)}
      </Typography.Paragraph>

      <pre>
        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>{text}</Typography.Paragraph>
      </pre>

      <br />

      <Text style={{ width: 100, whiteSpace: 'nowrap' }} ellipsis copyable>
        {templateStr}
      </Text>
    </>
  );
};

export default App;
