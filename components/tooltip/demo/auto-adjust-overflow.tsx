import { Button, Tooltip } from 'antd';
import React from 'react';

const wrapStyles: React.CSSProperties = {
  overflow: 'auto',
  position: 'relative',
  padding: '24px',
  border: '1px solid #e9e9e9',
};

const App: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    containerRef.current!.scrollLeft = containerRef.current!.clientWidth * 0.5;
  }, []);

  return (
    <div style={wrapStyles} ref={containerRef}>
      <div
        style={{
          width: '200%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 16,
        }}
      >
        <Tooltip
          placement="left"
          title="Prompt Text"
          getPopupContainer={(trigger) => trigger.parentElement!}
        >
          <Button>Adjust automatically / 自动调整</Button>
        </Tooltip>
        <Tooltip
          placement="left"
          title="Prompt Text"
          getPopupContainer={(trigger) => trigger.parentElement!}
          autoAdjustOverflow={false}
        >
          <Button>Ignore / 不处理</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default App;
