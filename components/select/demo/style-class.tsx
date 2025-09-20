import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { MehOutlined } from '@ant-design/icons';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'GuangZhou',
    label: 'GuangZhou',
  },
  {
    value: 'ShenZhen',
    label: 'ShenZhen',
  },
];

const classNamesObject: SelectProps['classNames'] = {
  root: 'custom-select-root',
  prefix: 'custom-select-prefix',
  suffix: 'custom-select-suffix',
  popup: {
    root: 'custom-select-popup',
    list: 'custom-select-list',
    listItem: 'custom-select-list-item',
  },
};

const stylesObject: SelectProps['styles'] = {
  root: {
    border: '2px solid #1890ff',
    borderRadius: '8px',
  },
  prefix: {
    color: '#1890ff',
  },
  suffix: {
    color: '#1890ff',
  },
  popup: {
    root: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
    },
    list: {
      backgroundColor: '#f0f2f5',
    },
    listItem: {
      color: '#1890ff',
      fontWeight: 'bold',
    },
  },
};

const classNamesFn: SelectProps['classNames'] = (info) => {
  const { props } = info;
  return {
    root: props.disabled ? 'disabled-select' : 'enabled-select',
    prefix: 'dynamic-prefix',
    suffix: 'dynamic-suffix',
  };
};

const stylesFn: SelectProps['styles'] = (info) => {
  const { props } = info;
  return {
    root: {
      backgroundColor: props.disabled ? '#f5f5f5' : '#ffffff',
      opacity: props.disabled ? 0.6 : 1,
    },
    prefix: {
      color: props.disabled ? '#ff4d4f' : '#52c41a',
    },
    suffix: {
      color: props.disabled ? '#ff4d4f' : '#52c41a',
    },
    popup: {
      list: {
        backgroundColor: '#f0f2f5',
      },
      listItem: {
        color: '#52c41a',
        fontWeight: 'bold',
      },
    },
  };
};

const onChange: SelectProps<Option>['onChange'] = (value: Option) => {
  console.log(value);
};

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Select
      options={options}
      onChange={onChange}
      placeholder="Please select"
      classNames={classNamesObject}
      styles={stylesObject}
      prefix={<MehOutlined />}
    />

    <Select
      options={options}
      onChange={onChange}
      placeholder="Function-based styles"
      classNames={classNamesFn}
      styles={stylesFn}
      prefix={<MehOutlined />}
    />

    <Select
      options={options}
      onChange={onChange}
      placeholder="Disabled with custom styles"
      disabled
      classNames={classNamesFn}
      styles={stylesFn}
      prefix={<MehOutlined />}
    />
  </div>
);

export default App;
