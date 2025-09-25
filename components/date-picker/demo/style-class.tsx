import React from 'react';
import { DatePicker, Flex, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `2px dashed ${token.colorPrimary}`,
  },
}));

const stylesObject: DatePickerProps['styles'] = {
  input: { fontStyle: 'italic' },
  suffix: { opacity: 0.85 },
};

const stylesFn: DatePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { borderColor: '#ffe58f' },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <DatePicker classNames={classNames} styles={stylesObject} placeholder="Object" />
      </Flex>
      <Flex gap="small">
        <DatePicker size="large" classNames={classNames} styles={stylesFn} placeholder="Function" />
      </Flex>
    </Space>
  );
};

export default App;
