import React from 'react';
import { ColorPicker, Flex, Space } from 'antd';
import type { ColorPickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    borderRadius: token.borderRadius,
  },
}));

const stylesObject: ColorPickerProps['styles'] = {
  popup: {
    root: {
      border: '1px solid #fff',
    },
  },
};

const stylesFn: ColorPickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      popup: {
        root: {
          border: '1px solid #722ed1',
        },
      },
    } satisfies ColorPickerProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <ColorPicker defaultValue="#1677ff" styles={stylesObject} classNames={classNames} />
      </Flex>
      <Flex gap="small">
        <ColorPicker
          defaultValue="#722ed1"
          size="large"
          styles={stylesFn}
          arrow={false}
          classNames={classNames}
        />
      </Flex>
    </Space>
  );
};

export default App;
