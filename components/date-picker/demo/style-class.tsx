import React from 'react';
import { DatePicker, Flex, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const classNamesObject: DatePickerProps['classNames'] = {
  root: 'demo-datepicker-root',
  input: 'demo-datepicker-input',
  suffix: 'demo-datepicker-suffix',
};

const classNamesFn: DatePickerProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-datepicker-root--disabled' };
  }
  return { root: 'demo-datepicker-root--enabled' };
};

const stylesObject: DatePickerProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  input: { fontStyle: 'italic' },
  suffix: { opacity: 0.85 },
};

const stylesFn: DatePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <DatePicker classNames={classNamesObject} placeholder="classNames Object" />
      <DatePicker disabled classNames={classNamesFn} placeholder="classNames Function" />
    </Flex>
    <Flex gap="small">
      <DatePicker styles={stylesObject} placeholder="styles Object" />
      <DatePicker size="large" styles={stylesFn} placeholder="styles Function" />
    </Flex>
  </Space>
);

export default App;
