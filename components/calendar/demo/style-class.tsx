import React from 'react';
import { Calendar, Flex } from 'antd';
import type { CalendarProps, CalendarSemanticAllType } from 'antd';
import { createStyles } from 'antd-style';
import type { Dayjs } from 'dayjs';

const useStyles = createStyles(({ token }) => ({
  root: {
    padding: 10,
    backgroundColor: token.colorPrimaryBg,
  },
}));

const stylesObject: CalendarProps<Dayjs>['styles'] = {
  root: {
    borderRadius: 8,
    width: 600,
  },
};

const stylesFunction: CalendarProps<Dayjs>['styles'] = (
  info,
): CalendarSemanticAllType['styles'] => {
  if (info.props.fullscreen) {
    return {
      root: {
        border: '2px solid #BDE3C3',
        borderRadius: 10,
        backgroundColor: 'rgba(189,227,195, 0.3)',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Calendar fullscreen={false} classNames={classNames} styles={stylesObject} />
      <Calendar classNames={classNames} styles={stylesFunction} />
    </Flex>
  );
};

export default App;
