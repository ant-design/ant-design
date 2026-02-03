import React from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps, StepsSemanticType } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: token.padding,
  },
}));

const stylesObject: StepsProps['styles'] = {
  itemIcon: { borderRadius: '30%' },
  itemContent: { fontStyle: 'italic' },
};

const stylesFn: StepsProps['styles'] = (info): StepsSemanticType['styles'] => {
  if (info.props.type === 'navigation') {
    return {
      root: {
        borderColor: '#1890ff',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const sharedProps: StepsProps = {
    items: [
      { title: 'Finished', content: 'This is a content.' },
      { title: 'In Progress', content: 'This is a content.' },
      { title: 'Waiting', content: 'This is a content.' },
    ],
    current: 1,
    classNames: { root: styles.root },
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} styles={stylesObject} />
      <Steps {...sharedProps} styles={stylesFn} type="navigation" />
    </Flex>
  );
};

export default App;
