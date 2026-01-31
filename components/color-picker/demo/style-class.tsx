import React from 'react';
import { ColorPicker, Flex, Space } from 'antd';
import type { ColorPickerProps, ColorPickerSemanticType } from 'antd';
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

const stylesFn: ColorPickerProps['styles'] = (info): ColorPickerSemanticType['styles'] => {
  if (info.props.size === 'large') {
    return {
      popup: {
        root: {
          border: '1px solid #722ed1',
        },
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <ColorPicker
          defaultValue="#1677ff"
          arrow={false}
          styles={stylesObject}
          classNames={classNames}
        />
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
