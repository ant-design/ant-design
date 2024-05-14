import React from 'react';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setIsLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={showLoading}>
        Open Modal
      </Button>
      <Modal
        title={<p>Loading Modal</p>}
        footer={
          <Button type="primary" onClick={() => setIsLoading(true)}>
            Reload
          </Button>
        }
        loading={isLoading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default App;
