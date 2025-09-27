import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import type { TagProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    padding: '2px 6px',
    borderRadius: 4,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const styles: TagProps['styles'] = {
    root: {
      backgroundColor: '#e6f7ff',
    },
    icon: {
      color: '#52c41a',
    },
  };

  const stylesFn: TagProps['styles'] = (info) => {
    if (info.props.variant === 'filled') {
      return {
        root: {
          backgroundColor: '#F5EFFF',
        },
        icon: {
          color: '#8F87F1',
        },
        content: {
          color: '#8F87F1',
        },
      };
    }
  };
  return (
    <Flex gap="middle">
      <Tag classNames={classNames} styles={styles} icon={<CheckCircleOutlined />}>
        Object
      </Tag>
      <Tag
        variant="filled"
        classNames={classNames}
        styles={stylesFn}
        icon={<CloseCircleOutlined />}
      >
        Function
      </Tag>
    </Flex>
  );
};

export default App;
