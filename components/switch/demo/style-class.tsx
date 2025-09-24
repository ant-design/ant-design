import React from 'react';
import { Switch, Space, Flex } from 'antd';
import type { SwitchProps } from 'antd';

const classNamesFn: SwitchProps['classNames'] = (info) => {
  if (info.props.unCheckedChildren) {
    return {
      root: 'demo-switch-root--unCheckedChildren',
      content: 'demo-switch-content--unCheckedChildren',
    };
  }
  return { root: 'demo-switch-root--default', content: 'demo-switch-content--default' };
};

const stylesObject: SwitchProps['styles'] = {
  root: { background: 'red' },
};

const App: React.FC = () => {
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Switch checkedChildren="1" unCheckedChildren="0" classNames={classNamesFn} />
      </Flex>
      <Flex gap="small">
        <Switch styles={stylesObject} />
      </Flex>
    </Space>
  );
};

export default App;
