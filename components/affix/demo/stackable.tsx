import React from 'react';
import { Affix, Button, Space } from 'antd';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: 300,
  overflow: 'auto',
  boxShadow: '0 0 0 1px #1677ff',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const style: React.CSSProperties = {
  height: 600,
  padding: 8,
};

const App: React.FC = () => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <div style={containerStyle} ref={setContainer}>
      <div style={style}>
        <Space vertical size={100}>
          <Affix target={() => container} offsetTop={8} stackable>
            <Button type="primary">Affix top 1</Button>
          </Affix>
          <Affix target={() => container} offsetTop={8} stackable>
            <Button type="primary">Affix top 2</Button>
          </Affix>
          <Affix target={() => container} offsetBottom={8} stackable>
            <Button>Affix bottom 1</Button>
          </Affix>
          <Affix target={() => container} offsetBottom={8} stackable>
            <Button>Affix bottom 2</Button>
          </Affix>
        </Space>
      </div>
    </div>
  );
};

export default App;
