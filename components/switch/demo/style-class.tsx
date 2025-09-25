import React from 'react';
import { Flex, Switch } from 'antd';
import type { SwitchProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyle();

  const stylesObject: SwitchProps['styles'] = {
    root: { background: '#F5D2D2' },
  };
  const stylesFn: SwitchProps['styles'] = (info) => {
    if (info.props.size === 'default') {
      return {
        root: { backgroundColor: '#BDE3C3' },
      };
    }
    return {};
  };

  return (
    <Flex vertical gap="middle">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={classNames}
        styles={stylesObject}
      />
      <Switch classNames={classNames} styles={stylesFn} />
    </Flex>
  );
};

export default App;
