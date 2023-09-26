import React from 'react';
import type { TooltipProps } from 'antd';
import { Button, Tooltip, Typography } from 'antd';

const Block = React.forwardRef<HTMLDivElement, Partial<TooltipProps>>((props, ref) => (
  <div
    style={{
      overflow: 'auto',
      position: 'relative',
      padding: '24px',
      border: '1px solid #e9e9e9',
    }}
    ref={ref}
  >
    <div
      style={{
        width: '200%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 16,
      }}
    >
      <Tooltip {...props} placement="left" title="Prompt Text">
        <Button>Adjust automatically / 自动调整</Button>
      </Tooltip>
      <Tooltip {...props} placement="left" title="Prompt Text" autoAdjustOverflow={false}>
        <Button>Ignore / 不处理</Button>
      </Tooltip>
    </div>
  </div>
));

const App: React.FC = () => {
  const containerRef1 = React.useRef<HTMLDivElement>(null);
  const containerRef2 = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    containerRef1.current!.scrollLeft = containerRef1.current!.clientWidth * 0.5;
    containerRef2.current!.scrollLeft = containerRef2.current!.clientWidth * 0.5;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
      <Typography.Title level={5}>With `getPopupContainer`</Typography.Title>
      <Block ref={containerRef1} getPopupContainer={(trigger) => trigger.parentElement!} />

      <Typography.Title level={5}>Without `getPopupContainer`</Typography.Title>
      <Block ref={containerRef2} />
    </div>
  );
};

export default App;
