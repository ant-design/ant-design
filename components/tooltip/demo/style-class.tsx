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
  container: { borderRadius: 12, boxShadow: 'inset 0 0 8px #ccc' },
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
      <Tooltip title="Object text" classNames={classNames} styles={styles} arrow={false}>
        <Button>Object Style</Button>
      </Tooltip>
      <Tooltip title="Function text" classNames={classNames} styles={stylesFn} arrow={false}>
        <Button type="primary">Function Style</Button>
      </Tooltip>
    </Flex>
  );
};

export default App;
