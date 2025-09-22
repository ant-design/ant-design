import React from 'react';
import { ColorPicker, Flex, Space } from 'antd';
import type { ColorPickerProps } from 'antd';

const classNamesObject: ColorPickerProps['classNames'] = {
  root: 'demo-colorpicker-root',
  popup: {
    root: 'demo-colorpicker-popup',
  },
};

const classNamesFn: ColorPickerProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-colorpicker-root--disabled' };
  }
  return { root: 'demo-colorpicker-root--enabled' };
};

const stylesObject: ColorPickerProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  popup: {
    root: { borderRadius: 8 },
  },
};

const stylesFn: ColorPickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <ColorPicker defaultValue="#1677ff" styles={stylesObject} classNames={classNamesObject} />
    </Flex>
    <Flex gap="small">
      <ColorPicker
        defaultValue="#722ed1"
        size="large"
        styles={stylesFn}
        classNames={classNamesFn}
      />
    </Flex>
  </Space>
);

export default App;
