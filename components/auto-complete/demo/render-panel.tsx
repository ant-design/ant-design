import React from 'react';
import { AutoComplete, Flex, Switch } from 'antd';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalAutoComplete } = AutoComplete;

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Flex vertical align="start" gap="small">
      <Switch checked={open} onChange={() => setOpen(!open)} />
      <InternalAutoComplete
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
    </Flex>
  );
};

export default App;
