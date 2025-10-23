import React from 'react';
import { Flex, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    width: 150,
  },
}));

const stylesObject: TimePickerProps['styles'] = {
  root: {
    borderColor: '#d9d9d9',
  },
};

const stylesFn: TimePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: {
        borderColor: '#722ed1',
      },
      suffix: {
        color: '#722ed1',
      },
      popup: {
        container: { border: '1px solid #722ed1', borderRadius: 8 },
      },
    } satisfies TimePickerProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <TimePicker classNames={classNames} styles={stylesObject} placeholder="Object" />
      <TimePicker classNames={classNames} styles={stylesFn} placeholder="Function" size="large" />
    </Flex>
  );
};

export default App;
