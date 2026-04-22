import React from 'react';
import { Button, Flex, TextTooltip } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Flex gap="middle" wrap>
      <TextTooltip title="Hover trigger" trigger="hover">
        <Button>Hover</Button>
      </TextTooltip>
      <TextTooltip title="Focus trigger" trigger="focus">
        <Button>Focus</Button>
      </TextTooltip>
      <TextTooltip title="Open by default" defaultOpen>
        <Button>Default open</Button>
      </TextTooltip>
      <TextTooltip title="Controlled open state" open={open} onOpenChange={setOpen}>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? 'Close controlled' : 'Open controlled'}
        </Button>
      </TextTooltip>
    </Flex>
  );
};

export default App;
