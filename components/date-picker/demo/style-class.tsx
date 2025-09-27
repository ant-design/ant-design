import React from 'react';
import { DatePicker, Flex } from 'antd';
import type { DatePickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    width: 200,
  },
}));

const stylesObject: DatePickerProps['styles'] = {
  input: { fontStyle: 'italic' },
  suffix: { opacity: 0.85 },
};

const stylesFn: DatePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { borderColor: '#722ed1' },
      popup: {
        root: { border: '1px solid #722ed1', borderRadius: 8 },
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <DatePicker classNames={classNames} styles={stylesObject} placeholder="Object" />
      <DatePicker size="large" classNames={classNames} styles={stylesFn} placeholder="Function" />
    </Flex>
  );
};

export default App;
