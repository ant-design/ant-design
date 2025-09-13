import React from 'react';
import { Switch, Space, Flex } from 'antd';
import type { SwitchProps } from 'antd';

const classNamesObject: SwitchProps['classNames'] = {
  root: 'demo-switch-root',
  content: 'demo-switch-content',
};

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

const stylesFn: SwitchProps['styles'] = (info) => {
  if (info.props.checkedChildren) {
    return { root: { background: 'green' }, content: { color: 'black' } };
  }
  return { root: { opacity: '0.8' } };
};

const App: React.FC = () => {
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Switch checkedChildren="开启" classNames={classNamesObject} />
        <Switch checkedChildren="1" unCheckedChildren="0" classNames={classNamesFn} />
      </Flex>
      <Flex gap="small">
        <Switch styles={stylesObject} />
        <Switch checkedChildren="1" unCheckedChildren="0" styles={stylesFn} />
      </Flex>
    </Space>
  );
};

export default App;
