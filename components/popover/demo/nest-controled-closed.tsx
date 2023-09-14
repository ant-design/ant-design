import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const App: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <>
      <Popover
        onOpenChange={(open) => {
          setOpen1(open);
        }}
        open={open1}
        trigger="click"
        content={
          <Popover
            onOpenChange={(open) => {
              setOpen2(open);
            }}
            open={open2}
            trigger="click"
            content={<div>content ware not close on click away</div>}
          >
            <Button>controlled 2</Button>
          </Popover>
        }
      >
        <Button>controlled 1</Button>
      </Popover>
      <Popover
        trigger="click"
        content={
          <Popover trigger="click" content={<div>expected behavior</div>}>
            <Button>uncontrolled 2</Button>
          </Popover>
        }
      >
        <Button>uncontrolled 1</Button>
      </Popover>
    </>
  );
};

export default App;
