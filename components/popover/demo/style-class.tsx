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
  container: {
    background: '#eee',
    boxShadow: 'inset 5px 5px 3px #fff, inset -5px -5px 3px #ddd, 0 0 3px rgba(0,0,0,0.2)',
  },
  content: {
    color: '#262626',
  },
};

const stylesFn: PopoverProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        borderRadius: 4,
      },
      content: {
        color: '#fff',
      },
    } satisfies PopoverProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex gap="middle">
      <Popover content="Object text" classNames={classNames} styles={styles} arrow={false}>
        <Button>Object Style</Button>
      </Popover>
      <Popover content="Function text" classNames={classNames} styles={stylesFn} arrow={false}>
        <Button type="primary">Function Style</Button>
      </Popover>
    </Flex>
  );
};

export default App;
