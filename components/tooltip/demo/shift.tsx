import React from 'react';
import { Button, Tooltip } from 'antd';

const App: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <div>
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip title="Thanks for using antd. Have a nice day!" trigger="click" defaultOpen>
          <Button>Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default App;
