import React from 'react';
import { Flex, Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    padding: 8,
    borderRadius: 4,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const styles: TimelineProps['styles'] = {
    itemIcon: {
      borderColor: '#1890ff',
    },
  };

  const stylesFn: TimelineProps['styles'] = (info) => {
    if (info.props.orientation === 'vertical') {
      return {
        root: {
          padding: '10px 6px',
          border: '1px solid #A294F9',
        },
        itemIcon: {
          borderColor: '#A294F9',
        },
      };
    }
    return {};
  };

  const sharedProps: TimelineProps = {
    classNames,
    items: [
      {
        title: '2015-09-01',
        content: 'Create a services site',
      },
      {
        title: '2015-09-01 09:12:11',
        content: 'Solve initial network problems',
      },
      {
        content: 'Technical testing',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Timeline {...sharedProps} orientation="horizontal" styles={styles} />
      <Timeline {...sharedProps} orientation="vertical" styles={stylesFn} />
    </Flex>
  );
};

export default App;
