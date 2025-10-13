import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    borderRadius: token.borderRadius,
    borderWidth: 1,
    width: 300,
  },
}));

const styles: RadioProps['styles'] = {
  root: {
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
};

const stylesFn: RadioProps['styles'] = (info) => {
  if (info.props.checked) {
    return {
      root: { padding: 8, borderRadius: 4, borderColor: '#1890ff' },
      label: { fontWeight: 'bold', color: '#333' },
    } satisfies RadioProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Radio classNames={classNames} styles={styles}>
        Object
      </Radio>
      <Radio classNames={classNames} styles={stylesFn} checked>
        Function
      </Radio>
    </Flex>
  );
};

export default App;
