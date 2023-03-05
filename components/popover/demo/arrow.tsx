import React, { useMemo, useState } from 'react';
import { Button, Divider, Popover, Segmented } from 'antd';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

const App: React.FC = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
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
        <Popover placement="topLeft" title={text} content={content} arrow={mergedArrow}>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" title={text} content={content} arrow={mergedArrow}>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" title={text} content={content} arrow={mergedArrow}>
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Popover placement="leftTop" title={text} content={content} arrow={mergedArrow}>
          <Button>LT</Button>
        </Popover>
        <Popover placement="left" title={text} content={content} arrow={mergedArrow}>
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" title={text} content={content} arrow={mergedArrow}>
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Popover placement="rightTop" title={text} content={content} arrow={mergedArrow}>
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" title={text} content={content} arrow={mergedArrow}>
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" title={text} content={content} arrow={mergedArrow}>
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" title={text} content={content} arrow={mergedArrow}>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" title={text} content={content} arrow={mergedArrow}>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" title={text} content={content} arrow={mergedArrow}>
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
  );
};

export default App;
