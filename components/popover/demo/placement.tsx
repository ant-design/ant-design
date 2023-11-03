import React from 'react';
import { Button, Popover, ConfigProvider } from 'antd';

const text = <span>Title</span>;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 80;

const App: React.FC = () => (
  <ConfigProvider
    button={{
      style: { width: buttonWidth, margin: 4 },
    }}
  >
    <div className="demo">
      <div style={{ marginInlineStart: buttonWidth + 4, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" title={text} content={content}>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" title={text} content={content}>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" title={text} content={content}>
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, float: 'inline-start' }}>
        <Popover placement="leftTop" title={text} content={content}>
          <Button>LT</Button>
        </Popover>
        <Popover placement="left" title={text} content={content}>
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" title={text} content={content}>
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, marginInlineStart: buttonWidth * 4 + 24 }}>
        <Popover placement="rightTop" title={text} content={content}>
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" title={text} content={content}>
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" title={text} content={content}>
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginInlineStart: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" title={text} content={content}>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" title={text} content={content}>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" title={text} content={content}>
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
  </ConfigProvider>
);

export default App;
