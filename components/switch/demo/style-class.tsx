import React from 'react';
import { Flex, Switch } from 'antd';
import type { GetProp, SwitchProps } from 'antd';
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

const stylesFn: SwitchProps['styles'] = (info): GetProp<SwitchProps, 'styles', 'Return'> => {
  if (info.props.size === 'medium') {
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
    <Flex vertical gap="medium">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={classNames}
        styles={stylesObject}
      />
      <Switch classNames={classNames} size="medium" styles={stylesFn} />
    </Flex>
  );
};

export default App;
