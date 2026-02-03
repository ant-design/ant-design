import React from 'react';
import { Flex, Switch } from 'antd';
import type { SwitchProps, SwitchSemanticType } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

const stylesObject: SwitchProps['styles'] = {
  root: {
    backgroundColor: '#F5D2D2',
  },
};

const stylesFn: SwitchProps['styles'] = (info): SwitchSemanticType['styles'] => {
  if (info.props.size === 'default') {
    return {
      root: {
        backgroundColor: '#BDE3C3',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  return (
    <Flex vertical gap="middle">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={classNames}
        styles={stylesObject}
      />
      <Switch classNames={classNames} size="default" styles={stylesFn} />
    </Flex>
  );
};

export default App;
