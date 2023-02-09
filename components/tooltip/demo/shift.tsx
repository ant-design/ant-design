import { Button, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const holderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (holderRef.current) {
      holderRef.current.scrollTop = holderRef.current.clientHeight;
      holderRef.current.scrollLeft = holderRef.current.clientWidth;
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'scroll' }} ref={holderRef}>
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip title="Thanks for using antd. Have a nice day!" open>
          <Button>Scroll Me</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default App;
