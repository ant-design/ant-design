import React from 'react';
import { Button, Tooltip } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 78;
const gap = 8;

const btnProps = {
  style: {
    width: buttonWidth,
  },
};

const App: React.FC = () => (
  <div>
    <div style={{ display: 'flex', marginLeft: buttonWidth, whiteSpace: 'nowrap', columnGap: gap }}>
      <Tooltip placement="topLeft" title={text}>
        <Button {...btnProps}>TL</Button>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <Button {...btnProps}>Top</Button>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <Button {...btnProps}>TR</Button>
      </Tooltip>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: buttonWidth,
        float: 'left',
        rowGap: gap,
      }}
    >
      <Tooltip placement="leftTop" title={text}>
        <Button {...btnProps}>LT</Button>
      </Tooltip>
      <Tooltip placement="left" title={text}>
        <Button {...btnProps}>Left</Button>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <Button {...btnProps}>LB</Button>
      </Tooltip>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: buttonWidth,
        marginLeft: buttonWidth * 4 + 24,
        rowGap: gap,
      }}
    >
      <Tooltip placement="rightTop" title={text}>
        <Button {...btnProps}>RT</Button>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <Button {...btnProps}>Right</Button>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <Button {...btnProps}>RB</Button>
      </Tooltip>
    </div>
    <div
      style={{
        display: 'flex',
        marginLeft: buttonWidth,
        clear: 'both',
        whiteSpace: 'nowrap',
        columnGap: gap,
      }}
    >
      <Tooltip placement="bottomLeft" title={text}>
        <Button {...btnProps}>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <Button {...btnProps}>Bottom</Button>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <Button {...btnProps}>BR</Button>
      </Tooltip>
    </div>
  </div>
);

export default App;
