import React from 'react';
import { Checkbox, Flex } from 'antd';
import type { CheckboxProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius};
    width: 300px;
  `,
  fnRoot: css`
    border-radius: ${token.borderRadius};
    width: 300px;
    & .ant-checkbox-checked .ant-checkbox-inner {
      border-color: lab(7.78201% -0.0000149012 0);
      background-color: lab(7.78201% -0.0000149012 0);
    }
    &:hover .ant-checkbox-inner {
      border-color: #d9d9d9;
    }
  `,
}));

const styles: CheckboxProps['styles'] = {
  root: {
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
};

const stylesFn: CheckboxProps['styles'] = (info) => {
  if (info.props.checked) {
    return {
      root: { padding: 8, borderRadius: 4 },
      label: { fontWeight: 'bold', color: '#333' },
    } satisfies CheckboxProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Checkbox classNames={classNames} styles={styles}>
        Object
      </Checkbox>
      <Checkbox
        checked
        classNames={{
          root: classNames.fnRoot,
        }}
        styles={stylesFn}
      >
        Function
      </Checkbox>
    </Flex>
  );
};

export default App;
