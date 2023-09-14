import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const App: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <>
      <Popover
        onOpenChange={(open) => {
          console.log(1, open);
          setOpen1(open);
        }}
        open={open1}
        trigger={'click'}
        content={
          <Popover
            onOpenChange={(open) => {
              console.log(2, open);
              setOpen2(open);
            }}
            open={open2}
            trigger={'click'}
            content={<div>content won't close on click away</div>}
          >
            <Button>layer 2</Button>
          </Popover>
        }
      >
        <Button style={{ background: 'red', color: 'white' }}>layer 1</Button>
      </Popover>
      <Popover
        trigger={'click'}
        content={
          <Popover trigger={'click'} content={<div>expected behavior</div>}>
            <Button>layer 2</Button>
          </Popover>
        }
      >
        <Button style={{ background: 'green', color: 'white' }}>layer 1</Button>
      </Popover>
    </>
  );
};

export default App;
