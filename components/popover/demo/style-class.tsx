import React from 'react';
import { Button, Flex, Popover } from 'antd';
import type { PopoverProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  container: {
    padding: 10,
  },
}));
const styles: PopoverProps['styles'] = {
  container: { padding: 8 },
};

const stylesFn: PopoverProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
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
      <Popover content="Object text" classNames={classNames} styles={styles}>
        <Button>Object Popover.</Button>
      </Popover>
      <Popover content="Function text" classNames={classNames} styles={stylesFn} arrow={false}>
        <Button type="primary">Function Popover.</Button>
      </Popover>
    </Flex>
  );
};

export default App;
