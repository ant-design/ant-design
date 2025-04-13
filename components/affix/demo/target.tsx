import React from 'react';
import { Affix, Button } from 'antd';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: 100,
  overflow: 'auto',
  boxShadow: '0 0 0 1px #1677ff',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const style: React.CSSProperties = {
  width: '100%',
  height: 1000,
};

const App: React.FC = () => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <div style={containerStyle} ref={setContainer}>
      <div style={style}>
        <Affix target={() => container}>
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    </div>
  );
};

export default App;
