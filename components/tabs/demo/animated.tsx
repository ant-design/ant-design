import React from 'react';
import { Tabs, Switch, Space } from 'antd';

const App: React.FC = () => {
  const [inkBar, setInkBar] = React.useState(true);
  const [tabPane, setTabPane] = React.useState(true);

  return (
    <>
      <Space>
        <Switch
          checkedChildren="inkBar"
          unCheckedChildren="inkBar"
          checked={inkBar}
          onChange={() => setInkBar(!inkBar)}
        />
        <Switch
          checkedChildren="tabPane"
          unCheckedChildren="tabPane"
          checked={tabPane}
          onChange={() => setTabPane(!tabPane)}
        />
      </Space>

      <Tabs
        animated={{ inkBar, tabPane }}
        items={[
          {
            label: `Bamboo`,
            key: '1',
            children: `Hello Bamboo!`,
            style: {
              height: 200,
              boxShadow: '0 0 3px rgba(255, 0, 0, 0.5)',
            },
          },
          {
            label: `Little`,
            key: '2',
            children: `Hi Little!`,
            style: {
              height: 300,
              boxShadow: '0 0 3px rgba(0, 255, 0, 0.5)',
            },
          },
          {
            label: `Light`,
            key: '3',
            children: `Welcome Light!`,
            style: {
              height: 100,
              boxShadow: '0 0 3px rgba(0, 0, 255, 0.5)',
            },
          },
        ]}
      />
    </>
  );
};

export default App;
