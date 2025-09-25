import React from 'react';
import { Flex, InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
   backgroundColor: '#f21505'
  `,
}));

const stylesFn: InputNumberProps['styles'] = ({ props: { size } }) => {
  if (size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => {
  const { styles } = useStyle();
  const inputNumberSharedProps: InputNumberProps = {
    classNames: {
      root: styles.root,
    },
    placeholder: 'styles Function',
    style: {
      width: 120,
    },
  };
  return (
    <Flex vertical gap="middle">
      <InputNumber
        {...inputNumberSharedProps}
        size="large"
        styles={{
          root: {
            backgroundColor: '#1677FF',
          },
        }}
      />
      <InputNumber {...inputNumberSharedProps} size="middle" styles={stylesFn} />
    </Flex>
  );
};

export default App;
