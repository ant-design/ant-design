import React from 'react';
import { Flex, InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: 8,
    width: 200,
  },
}));

const stylesObject: InputNumberProps['styles'] = {
  input: {
    fontSize: 14,
  },
};

const stylesFn: InputNumberProps['styles'] = ({ props: { size } }) => {
  if (size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#722ed1' } };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  const sharedProps: InputNumberProps = {
    classNames,
  };
  return (
    <Flex vertical gap="middle">
      <InputNumber {...sharedProps} styles={stylesObject} placeholder="Object" />
      <InputNumber {...sharedProps} placeholder="Function" size="large" styles={stylesFn} />
    </Flex>
  );
};

export default App;
