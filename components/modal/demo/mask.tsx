import React, { createContext } from 'react';
import { Button, Modal, Space } from 'antd';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const config = {
  title: 'Title',
  content: 'Content of the modal',
};

const App: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          onClick={async () => {
            modal.confirm({ ...config });
          }}
        >
          default blur
        </Button>
        <Button
          onClick={() => {
            modal.confirm({ ...config, mask: true });
          }}
        >
          Clear mask
        </Button>
        <Button
          onClick={() => {
            modal.confirm({ ...config, mask: false });
          }}
        >
          No mask
        </Button>
      </Space>
      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default App;
