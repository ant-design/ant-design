import React from 'react';
import { Calendar, Flex } from 'antd';
import type { CalendarProps } from 'antd';
import { createStyles } from 'antd-style';
import type { Dayjs } from 'dayjs';

const useStyles = createStyles(() => ({
  root: {
    padding: 10,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const stylesObject: CalendarProps<Dayjs>['styles'] = {
    root: {
      borderRadius: 8,
      width: 600,
      backgroundColor: '#d9d9d9',
    },
  };

  const stylesFunction: CalendarProps<Dayjs>['styles'] = (info) => {
    if (info.props.fullscreen) {
      return {
        root: {
          border: '2px solid #BDE3C3',
          borderRadius: 10,
        },
        header: {
          backgroundColor: '#fafafa',
        },
      };
    }
    return {};
  };

  return (
    <Flex vertical gap="middle">
      <Calendar fullscreen={false} classNames={classNames} styles={stylesObject} />
      <Calendar classNames={classNames} styles={stylesFunction} />
    </Flex>
  );
};

export default App;
