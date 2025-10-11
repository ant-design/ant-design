import React from 'react';
import { MehOutlined } from '@ant-design/icons';
import { Flex, Select } from 'antd';
import type { SelectProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    borderRadius: 8,
    width: 300,
  },
}));

const options: SelectProps['options'] = [
  { value: 'GuangZhou', label: 'GuangZhou' },
  { value: 'ShenZhen', label: 'ShenZhen' },
];

const stylesObject: SelectProps['styles'] = {
  prefix: {
    color: '#1890ff',
  },
  suffix: {
    color: '#1890ff',
  },
};

const stylesFn: SelectProps['styles'] = (info) => {
  const { props } = info;
  if (props.variant === 'filled') {
    return {
      prefix: {
        color: '#722ed1',
      },
      suffix: {
        color: '#722ed1',
      },
      popup: {
        root: {
          border: '1px solid #722ed1',
        },
      },
    } satisfies SelectProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const sharedProps: SelectProps = {
    options,
    classNames,
    prefix: <MehOutlined />,
  };
  return (
    <Flex vertical gap="middle">
      <Select {...sharedProps} styles={stylesObject} placeholder="Object" />
      <Select {...sharedProps} styles={stylesFn} placeholder="Function" variant="filled" />
    </Flex>
  );
};

export default App;
