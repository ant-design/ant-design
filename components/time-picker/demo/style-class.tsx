import React from 'react';
import { Flex, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px dashed ${token.colorPrimary}`,
    width: 300,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const stylesObject: TimePickerProps['styles'] = {
    root: {
      border: '2px solid #d9d9d9',
    },
  };

  const stylesFn: TimePickerProps['styles'] = (info) => {
    if (info.props.size === 'large') {
      return {
        root: {
          border: '2px solid #faad14',
        },
        suffix: {
          color: '#faad14',
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
