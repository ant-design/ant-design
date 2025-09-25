import React from 'react';
import { Flex, Mentions } from 'antd';
import type { MentionsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: 8,
    width: 300,
  },
}));

const options: MentionsProps['options'] = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'Meet-student',
    label: 'Meet-student',
  },
];

const stylesObject: MentionsProps['styles'] = {
  textarea: {
    fontSize: 14,
  },
};

const stylesFunction: MentionsProps['styles'] = (info) => {
  if (info.props.variant === 'filled') {
    return {
      root: {
        border: '1px solid #722ed1',
      },
      popup: {
        border: '1px solid #722ed1',
      },
    };
  }
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedProps: MentionsProps = {
    options,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Mentions {...sharedProps} placeholder="Object" styles={stylesObject} />
      <Mentions {...sharedProps} variant="filled" placeholder="Function" styles={stylesFunction} />
    </Flex>
  );
};

export default App;
