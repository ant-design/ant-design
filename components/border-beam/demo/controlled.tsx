import React, { useState } from 'react';
import { BorderBeam, Card, Flex, Switch } from 'antd';

const App: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const radius = 20;

  return (
    <Flex vertical gap={16}>
      <Flex gap={12} wrap>
        <Switch
          checked={paused}
          checkedChildren="Paused"
          unCheckedChildren="Running"
          onChange={setPaused}
        />
        <Switch
          checked={disabled}
          checkedChildren="Disabled"
          unCheckedChildren="Enabled"
          onChange={setDisabled}
        />
      </Flex>
      <BorderBeam
        borderWidth={2}
        paused={paused}
        disabled={disabled}
        pathRadius={radius}
        size={84}
        style={{ width: 360 }}
      >
        <Card title="Release monitor" style={{ borderRadius: radius }}>
          Track dependency changes, build status, and deployment health from a single place.
        </Card>
      </BorderBeam>
    </Flex>
  );
};

export default App;
