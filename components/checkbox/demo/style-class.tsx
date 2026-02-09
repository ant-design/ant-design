import React from 'react';
import { Checkbox, Flex } from 'antd';
import type { CheckboxProps, CheckboxSemanticAllType } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius}px;
    background-color: ${token.colorBgContainer};
  `,
  icon: css`
    border-color: ${token.colorWarning};
  `,
  label: css`
    color: ${token.colorTextDisabled};
    font-weight: bold;
  `,

  iconChecked: css`
    background-color: ${token.colorWarning};
  `,
  labelChecked: css`
    color: ${token.colorWarning};
  `,
}));

// Object style
const styles: CheckboxProps['styles'] = {
  icon: {
    borderRadius: 6,
  },
  label: {
    color: 'blue',
  },
};

const App: React.FC = () => {
  const { styles: classNamesStyles } = useStyles();

  // Function classNames - dynamically adjust based on checked state
  const classNamesFn: CheckboxProps['classNames'] = (
    info,
  ): CheckboxSemanticAllType['classNames'] => {
    if (info.props.checked) {
      return {
        root: clsx(classNamesStyles.root),
        icon: clsx(classNamesStyles.icon, classNamesStyles.iconChecked),
        label: clsx(classNamesStyles.label, classNamesStyles.labelChecked),
      };
    }
    return {
      root: classNamesStyles.root,
      icon: classNamesStyles.icon,
      label: classNamesStyles.label,
    };
  };

  return (
    <Flex vertical gap="middle">
      <Checkbox styles={styles}>Object styles</Checkbox>
      <Checkbox classNames={classNamesFn} defaultChecked>
        Function styles
      </Checkbox>
    </Flex>
  );
};

export default App;
