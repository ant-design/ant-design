import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioProps, RadioSemanticAllType } from 'antd';
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
const styles: RadioProps['styles'] = {
  icon: {
    borderRadius: 6,
  },
  label: {
    color: 'blue',
  },
};

const App: React.FC = () => {
  const [value, setValue] = React.useState<'styles' | 'classNames'>('styles');
  const { styles: classNamesStyles } = useStyles();

  // Function classNames - dynamically adjust based on checked state
  const classNamesFn: RadioProps['classNames'] = (info): RadioSemanticAllType['classNames'] => {
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
      <Radio
        name="style-class"
        styles={styles}
        checked={value === 'styles'}
        onChange={() => setValue('styles')}
      >
        Object styles
      </Radio>
      <Radio
        name="style-class"
        classNames={classNamesFn}
        checked={value === 'classNames'}
        onChange={() => setValue('classNames')}
      >
        Function classNames
      </Radio>
    </Flex>
  );
};

export default App;
