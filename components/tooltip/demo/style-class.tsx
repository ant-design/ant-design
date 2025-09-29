import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  container: {
    padding: 10,
  },
}));
const styles: TooltipProps['styles'] = {
  container: { padding: 8 },
};

const stylesFn: TooltipProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        color: '#fff',
        borderRadius: 4,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex gap="middle">
      <Tooltip title="Object text" classNames={classNames} styles={styles}>
        <Button>Object Tooltip.</Button>
      </Tooltip>
      <Tooltip title="Function text" classNames={classNames} styles={stylesFn} arrow={false}>
        <Button type="primary">Function Tooltip.</Button>
      </Tooltip>
    </Flex>
  );
};

export default App;
