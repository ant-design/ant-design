import React from 'react';
import { Flex, Spin } from 'antd';
import type { SpinProps, SpinSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
  `,
}));

const stylesObject: SpinProps['styles'] = {
  indicator: {
    color: '#00d4ff',
  },
};

const stylesFn: SpinProps['styles'] = ({ props }): SpinSemanticAllType['styles'] => {
  if (props.size === 'small') {
    return {
      indicator: {
        color: '#722ed1',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: SpinProps = {
    spinning: true,
    percent: 0,
    classNames: { root: classNames.root },
  };

  return (
    <Flex align="center" gap="middle">
      <Spin {...sharedProps} styles={stylesObject} />
      <Spin {...sharedProps} styles={stylesFn} size="small" />
    </Flex>
  );
};

export default App;
