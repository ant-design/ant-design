import React from 'react';
import { Button, Flex, Splitter, Switch, Typography } from 'antd';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const App: React.FC = () => {
  const [sizes, setSizes] = React.useState<(number | string)[]>(['50%', '50%']);
  const [enabled, setEnabled] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedPanels, setCollapsedPanels] = React.useState<boolean[]>([false, false]);
  return (
    <Flex vertical gap="middle">
      <Splitter
        onResize={setSizes}
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel size={sizes[0]} resizable={enabled} collapsed={collapsed}>
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel size={sizes[1]}>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
      <Splitter
        onCollapse={(nextCollapsed) => setCollapsedPanels(nextCollapsed)}
        style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel
          collapsible
          defaultSize="50%"
          resizable={enabled}
          collapsed={collapsedPanels[0]}
        >
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel collapsible defaultSize="50%" collapsed={collapsedPanels[1]}>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
      <Flex gap="middle" justify="space-between">
        <Flex gap="middle">
          <Switch
            value={enabled}
            onChange={() => setEnabled(!enabled)}
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
          />
          <Switch
            value={collapsed}
            onChange={() => setCollapsed(!collapsed)}
            checkedChildren="Collapsed"
            unCheckedChildren="Expanded"
          />
        </Flex>
        <Button
          onClick={() => {
            setSizes(['50%', '50%']);
          }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default App;
