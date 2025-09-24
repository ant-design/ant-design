import React from 'react';
import { AutoComplete, Flex, Space } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border-radius: 4px;
  `,
}));

const stylesObject: AutoCompleteProps['styles'] = {
  popup: {
    root: { borderWidth: 1, borderColor: '#1890ff' },
    list: { backgroundColor: '#f9f9f9' },
  },
};

const stylesFn: AutoCompleteProps['styles'] = ({ props }) => {
  if (props.variant === 'filled') {
    return {
      popup: {
        root: { borderWidth: 1, borderColor: '#ccc' },
        list: { backgroundColor: '#f0f0f0' },
      },
    };
  }
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const options = [mockVal('Burns Bay Road'), mockVal('Downing Street'), mockVal('Wall Street')];

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  const sharedProps: AutoCompleteProps = {
    options,
    classNames: {
      root: classNames.root,
    },
    style: { width: 200 },
  };

  return (
    <Space orientation="vertical" size={[8, 24]}>
      <Flex vertical gap="middle">
        <AutoComplete {...sharedProps} placeholder="object styles" styles={stylesObject} />
      </Flex>
      <Flex vertical gap="middle">
        <AutoComplete
          {...sharedProps}
          variant="filled"
          placeholder="function styles"
          styles={stylesFn}
        />
      </Flex>
    </Space>
  );
};

export default App;
