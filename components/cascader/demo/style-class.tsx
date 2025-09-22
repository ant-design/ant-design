import React from 'react';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'Meet-student',
    label: 'Meet-student',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const classNamesObject: CascaderProps['classNames'] = {
  root: 'custom-cascader-root',
  prefix: 'custom-cascader-prefix',
  suffix: 'custom-cascader-suffix',
  popup: {
    root: 'custom-cascader-popup',
    list: 'custom-cascader-list',
    listItem: 'custom-cascader-list-item',
  },
};

const stylesObject: CascaderProps['styles'] = {
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

const classNamesFn: CascaderProps['classNames'] = (info) => {
  const { props } = info;
  return {
    root: props.disabled ? 'disabled-cascader' : 'enabled-cascader',
    prefix: 'dynamic-prefix',
    suffix: 'dynamic-suffix',
  };
};

const stylesFn: CascaderProps['styles'] = (info) => {
  const { props } = info;
  return {
    root: {
      backgroundColor: props.disabled ? '#f5f5f5' : '#ffffff',
      opacity: props.disabled ? 0.6 : 1,
    },
    prefix: {
      color: props.disabled ? '#d9d9d9' : '#52c41a',
    },
    suffix: {
      color: props.disabled ? '#d9d9d9' : '#52c41a',
    },
  };
};

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Please select"
      classNames={classNamesObject}
      styles={stylesObject}
      prefix="🏠"
    />

    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Function-based styles"
      classNames={classNamesFn}
      styles={stylesFn}
      prefix="✅"
    />
  </div>
);

export default App;
