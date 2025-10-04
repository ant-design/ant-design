import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const hoverContent = <div>This is hover content.</div>;

const clickContent = <div>This is click content.</div>;

const App: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hide = () => {
    setClicked(false);
    setHovered(false);
  };

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
    setClicked(false);
  };

  const handleClickChange = (open: boolean) => {
    setHovered(false);
    setClicked(open);
  };

  return (
    <Popover
      style={{ width: 500 }}
      content={hoverContent}
      title="Hover title"
      trigger="hover"
      open={hovered}
      onOpenChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title="Click title"
        trigger="click"
        open={clicked}
        onOpenChange={handleClickChange}
      >
        <Button>Hover and click</Button>
      </Popover>
    </Popover>
  );
};

export default App;
