import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const showLoading = () => {
    setOpen(true);
    setIsLoading(true);

    // Better do the clean up in React.useEffect
    timerRef.current = setTimeout(() => {
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
        footer={<ReloadOutlined onClick={() => setIsLoading(true)} />}
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
