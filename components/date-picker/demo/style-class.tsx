import React from 'react';
import { DatePicker, Flex, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const classNamesObject: DatePickerProps['classNames'] = {
  root: 'demo-datepicker-root',
  input: 'demo-datepicker-input',
  suffix: 'demo-datepicker-suffix',
  popup: {
    header: 'demo-datepicker-popup-header',
  },
};

const classNamesFn: DatePickerProps['classNames'] = (info) => {
  return {
    root:
      info.props.size === 'large' ? 'demo-datepicker-root--large' : 'demo-datepicker-root--small',
  };
};

const stylesObject: DatePickerProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  input: { fontStyle: 'italic' },
  suffix: { opacity: 0.85 },
  popup: {
    root: {
      border: '2px solid #fffbe6',
    },
  },
};

const stylesFn: DatePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
  }
  return {};
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <DatePicker classNames={classNamesObject} styles={stylesObject} placeholder="Object" />
    </Flex>
    <Flex gap="small">
      <DatePicker size="large" styles={stylesFn} classNames={classNamesFn} placeholder="Function" />
    </Flex>
  </Space>
);

export default App;
