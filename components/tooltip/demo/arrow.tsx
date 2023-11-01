import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Segmented, Tooltip } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 80;

const App: React.FC = () => {
  const [arrow, setArrow] = useState('Show');

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        value={arrow}
        options={['Show', 'Hide', 'Center']}
        onChange={(val: string) => setArrow(val)}
        style={{ marginBottom: 24 }}
      />
      <div className="demo">
        <div style={{ marginInlineStart: buttonWidth, whiteSpace: 'nowrap' }}>
          <Tooltip placement="topLeft" title={text} arrow={mergedArrow}>
            <Button>TL</Button>
          </Tooltip>
          <Tooltip placement="top" title={text} arrow={mergedArrow}>
            <Button>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" title={text} arrow={mergedArrow}>
            <Button>TR</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, float: 'inline-start' }}>
          <Tooltip placement="leftTop" title={text} arrow={mergedArrow}>
            <Button>LT</Button>
          </Tooltip>
          <Tooltip placement="left" title={text} arrow={mergedArrow}>
            <Button>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title={text} arrow={mergedArrow}>
            <Button>LB</Button>
          </Tooltip>
        </div>
        <div style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}>
          <Tooltip placement="rightTop" title={text} arrow={mergedArrow}>
            <Button>RT</Button>
          </Tooltip>
          <Tooltip placement="right" title={text} arrow={mergedArrow}>
            <Button>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title={text} arrow={mergedArrow}>
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div style={{ marginInlineStart: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomLeft" title={text} arrow={mergedArrow}>
            <Button>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" title={text} arrow={mergedArrow}>
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <Button>BR</Button>
          </Tooltip>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
