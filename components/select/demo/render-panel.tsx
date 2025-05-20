import React from 'react';
import { Flex, Select, Switch } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalSelect } = Select;

const App: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Flex vertical gap="small" align="start">
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
        virtual={false}
      />
    </Flex>
  );
};

export default App;
