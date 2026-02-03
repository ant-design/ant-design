import React from 'react';
import { AutoComplete, Flex } from 'antd';
import type { AutoCompleteProps, AutoCompleteSemanticType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border-radius: 4px;
  `,
}));

const stylesObject: AutoCompleteProps['styles'] = {
  popup: {
    root: { borderWidth: 1, borderColor: '#1890ff' },
    list: { backgroundColor: 'rgba(240,240,240, 0.85)' },
    listItem: { color: '#272727' },
  },
};

const stylesFn: AutoCompleteProps['styles'] = ({ props }): AutoCompleteSemanticType['styles'] => {
  if (props.variant === 'filled') {
    return {
      popup: {
        root: { borderWidth: 1, borderColor: '#ccc' },
        list: { backgroundColor: 'rgba(240,240,240, 0.85)' },
        listItem: { color: '#272727' },
      },
    };
  }
  return {};
};

const options: AutoCompleteProps['options'] = [
  { value: 'Burnaby' },
  { value: 'Seattle' },
  { value: 'Los Angeles' },
  { value: 'San Francisco' },
  { value: 'Meet student' },
];

const App: React.FC = () => {
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
