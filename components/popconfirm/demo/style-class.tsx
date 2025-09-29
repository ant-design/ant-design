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
  container: { padding: 8 },
};

const stylesFn: PopconfirmProps['styles'] = (info) => {
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
      <Popconfirm title="Object text" classNames={classNames} styles={styles}>
        <Button>Object Popconfirm.</Button>
      </Popconfirm>
      <Popconfirm
        title="Function text"
        classNames={classNames}
        styles={stylesFn}
        arrow={false}
        okButtonProps={{
          styles: {
            root: {
              backgroundColor: 'rgba(53, 71, 125, 0.6)',
              color: '#fff',
            },
          },
        }}
        cancelButtonProps={{
          styles: {
            root: {
              borderColor: 'rgba(53, 71, 125, 0.6)',
              color: 'rgba(53, 71, 125, 0.8)',
            },
          },
        }}
      >
        <Button type="primary">Function Popconfirm.</Button>
      </Popconfirm>
    </Flex>
  );
};

export default App;
