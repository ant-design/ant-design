import React, { useMemo, useState } from 'react';
import { Button, Divider, Segmented, Tooltip } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 70;

const App: React.FC = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { arrowPointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  return (
    <div className="demo">
      <Segmented
        options={['Show', 'Hide', 'Center']}
        onChange={(val) => {
          setShowArrow(val !== 'Hide');
          setArrowAtCenter(val === 'Center');
        }}
      />
      <Divider orientation="center">Content</Divider>
      <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
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
      <div style={{ width: buttonWidth, float: 'left' }}>
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
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
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
      <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
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
  );
};

export default App;
