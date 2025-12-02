import React from 'react';
import { Button, Flex, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  container: {
    padding: 10,
  },
}));

const styles: PopconfirmProps['styles'] = {
  container: {
    backgroundColor: '#eee',
    boxShadow: 'inset 5px 5px 3px #fff, inset -5px -5px 3px #ddd, 0 0 3px rgba(0,0,0,0.2)',
  },
  title: {
    color: '#262626',
  },
  content: {
    color: '#262626',
  },
};

const stylesFn: PopconfirmProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        borderRadius: 4,
      },
      title: {
        color: '#fff',
      },
      content: {
        color: '#fff',
      },
    } satisfies PopconfirmProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex gap="middle">
      <Popconfirm
        title="Object text"
        description="Object description"
        classNames={classNames}
        styles={styles}
        arrow={false}
      >
        <Button>Object Style</Button>
      </Popconfirm>
      <Popconfirm
        title="Function text"
        description="Function description"
        classNames={classNames}
        styles={stylesFn}
        arrow={false}
        okButtonProps={{
          styles: { root: { backgroundColor: 'rgba(53, 71, 125, 0.6)', color: '#fff' } },
        }}
        cancelButtonProps={{
          styles: {
            root: {
              borderColor: 'rgba(53, 71, 125, 0.6)',
              backgroundColor: '#fff',
              color: 'rgba(53, 71, 125, 0.8)',
            },
          },
        }}
      >
        <Button type="primary">Function Style</Button>
      </Popconfirm>
    </Flex>
  );
};

export default App;
