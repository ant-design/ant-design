import React from 'react';
import { AutoComplete, Flex } from 'antd';
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
  return {};
};

const options: AutoCompleteProps['options'] = [
  {
    value: 'Burnaby',
  },
  {
    value: 'Seattle',
  },
  {
    value: 'Los Angeles',
  },
  {
    value: 'San Francisco',
  },
  {
    value: 'Meet student',
  },
];

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
    <Flex vertical gap="middle">
      <AutoComplete {...sharedProps} placeholder="object styles" styles={stylesObject} />
      <AutoComplete
        {...sharedProps}
        variant="filled"
        placeholder="function styles"
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
