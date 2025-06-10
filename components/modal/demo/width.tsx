import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>

      {/* Responsive */}
      <Button type="primary" onClick={() => setOpenResponsive(true)}>
        Open Modal of responsive width
      </Button>
      <Modal
        title="Modal responsive width"
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </Flex>
  );
};

export default App;
