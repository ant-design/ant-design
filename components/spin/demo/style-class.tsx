import React from 'react';
import { Flex, Spin } from 'antd';
import type { SpinProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 8px;
  `,
}));

const stylesObject: SpinProps['styles'] = {
  indicator: {
    color: '#1677ff',
  },
};

const stylesFn: SpinProps['styles'] = ({ props: { size } }) => {
  if (size === 'small') {
    return {
      indicator: {
        color: 'rgba(200, 200, 200, 0.8)',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const sharedProps: SpinProps = {
    spinning: true,
    percent: 0,
    classNames: {
      root: styles.root,
    },
  };

  return (
    <Flex align="center" gap="middle">
      <Spin {...sharedProps} styles={stylesObject} />

      <Spin {...sharedProps} size="small" styles={stylesFn} />
    </Flex>
  );
};

export default App;
