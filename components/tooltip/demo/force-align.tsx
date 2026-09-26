import React from 'react';
import type { TooltipRef } from 'antd';
import { Button, Tooltip } from 'antd';

const App: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const tooltipRef = React.useRef<TooltipRef>(null);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  React.useLayoutEffect(() => {
    if (loaded) {
      tooltipRef.current?.forceAlign();
    }
  }, [loaded]);

  return (
    <div style={{ minHeight: 160, paddingTop: 16 }}>
      {loaded && <div style={{ height: 80, marginBottom: 16 }}>Async content loaded.</div>}
      <Tooltip ref={tooltipRef} title="Tooltip stays aligned" open placement="top">
        <Button>Trigger</Button>
      </Tooltip>
    </div>
  );
};

export default App;
