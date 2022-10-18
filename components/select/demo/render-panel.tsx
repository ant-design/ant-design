import React from 'react';
import { Select, Switch, Space } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalSelect } = Select;

const App: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Switch checked={open} onChange={() => setOpen(!open)} />
      <InternalSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        open={open}
        options={[
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
          { label: 'Disabled', value: 'disabled' },
          { label: 'Bamboo', value: 'bamboo' },
        ]}
      />
    </Space>
  );
};

export default App;
