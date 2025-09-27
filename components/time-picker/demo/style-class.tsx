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

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
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
          root: { border: '1px solid #722ed1', borderRadius: 8 },
        },
      };
    }
    return {};
  };

  return (
    <Flex vertical gap="middle">
      <TimePicker placeholder="Object" classNames={classNames} styles={stylesObject} />
      <TimePicker size="large" placeholder="Function" classNames={classNames} styles={stylesFn} />
    </Flex>
  );
};

export default App;
