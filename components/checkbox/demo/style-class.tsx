import React from 'react';
import { Checkbox, Flex } from 'antd';
import type { CheckboxProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    borderRadius: token.borderRadius,
    borderWidth: 1,
    width: 300,
  },
}));

const styles: CheckboxProps['styles'] = {
  root: {
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
};

const stylesFn: CheckboxProps['styles'] = (info) => {
  if (info.props.checked) {
    return {
      root: { padding: 8, borderRadius: 4, borderColor: '#1890ff' },
      label: { fontWeight: 'bold', color: '#333' },
    } satisfies CheckboxProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Checkbox classNames={classNames} styles={styles}>
        Object
      </Checkbox>
      <Checkbox checked classNames={classNames} styles={stylesFn}>
        Function
      </Checkbox>
    </Flex>
  );
};

export default App;
