import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const showModal = () => {
    setOpen(true);
    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  React.useEffect(() => clearTimer, []);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={
          <>
            Loading Modal
            {isLoading && <LoadingOutlined style={{ marginInlineStart: 12 }} />}
          </>
        }
        loading={isLoading}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Button type="primary" style={{ margin: '16px 0' }} onClick={() => setIsLoading(true)}>
          set Loading true
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default App;
