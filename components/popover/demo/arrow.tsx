import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Popover, Segmented } from 'antd';

const text = <span>Title</span>;

const buttonWidth = 80;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

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
        options={['Show', 'Hide', 'Center']}
        onChange={(val: string) => setArrow(val)}
        style={{ marginBottom: 24 }}
      />
      <div className="demo">
        <div style={{ marginInlineStart: buttonWidth + 4, whiteSpace: 'nowrap' }}>
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
        <div style={{ width: buttonWidth, float: 'inline-start' }}>
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
        <div style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}>
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
        <div style={{ marginInlineStart: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
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
    </ConfigProvider>
  );
};

export default App;
