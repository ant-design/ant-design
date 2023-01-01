import React, { createContext, useContext } from 'react';
import { Button, Modal, Space } from 'antd';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const App: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const reachableName = useContext<string | null>(ReachableContext);
  const unReachableName = useContext<string | null>(ReachableContext);

  const config = {
    title: 'Use Hook!',
    content: (
      <>
        Reachable: {reachableName}!
        <br />
        Unreachable: {unReachableName}!
      </>
    ),
  };

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          onClick={() => {
            modal.confirm(config);
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            modal.warning(config);
          }}
        >
          Warning
        </Button>
        <Button
          onClick={() => {
            modal.info(config);
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            modal.error(config);
          }}
        >
          Error
        </Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default App;
