import React from 'react';
import { Flex, Spin } from 'antd';
import type { SpinProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    padding: 8px;
  `,
}));

const stylesObject: SpinProps['styles'] = {
  indicator: {
    color: '#00d4ff',
  },
};

const stylesFn: SpinProps['styles'] = ({ props }) => {
  if (props.size === 'small') {
    return {
      indicator: {
        color: '#722ed1',
      },
    } satisfies SpinProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const sharedProps: SpinProps = {
    spinning: true,
    percent: 0,
    classNames: { root: styles.root },
  };

  return (
    <Flex align="center" gap="middle">
      <Spin {...sharedProps} styles={stylesObject} />
      <Spin {...sharedProps} styles={stylesFn} size="small" />
    </Flex>
  );
};

export default App;
