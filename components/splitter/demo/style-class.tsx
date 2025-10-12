import React from 'react';
import { Flex, Splitter, Typography } from 'antd';
import type { SplitterProps } from 'antd';
import { createStyles } from 'antd-style';

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => {
  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
        {props.text}
      </Typography.Title>
    </Flex>
  );
};

const useStyle = createStyles(({ css, cssVar }) => ({
  boxShadow: css`
    box-shadow: ${cssVar.boxShadowSecondary};
  `,
}));

const stylesObject: SplitterProps['styles'] = {
  root: { backgroundColor: '#fffbe6' },
};

const stylesFn: SplitterProps['styles'] = ({ props }) => {
  if (props.orientation === 'horizontal') {
    return {
      root: {
        borderWidth: 2,
        borderStyle: 'dashed',
        marginBottom: 10,
      },
    } satisfies SplitterProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const splitSharedProps: SplitterProps = {
    style: { height: 200 },
    classNames: { root: styles.boxShadow },
  };

  return (
    <Flex vertical gap="large">
      <Splitter {...splitSharedProps} styles={stylesObject}>
        <Splitter.Panel>
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
      <Splitter {...splitSharedProps} styles={stylesFn}>
        <Splitter.Panel>
          <Desc text="First" />
        </Splitter.Panel>
        <Splitter.Panel>
          <Desc text="Second" />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export default App;
