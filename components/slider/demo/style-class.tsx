import React from 'react';
import { Flex, Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, cssVar }) => ({
  root: css`
    width: 300px;
  `,
  handle: css`
    &::after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
}));

const stylesObject: SliderSingleProps['styles'] = {
  track: { background: 'linear-gradient(180deg, #91caff, #1677ff)' },
  handle: { borderColor: '#1677ff', boxShadow: '0 2px 8px #1677ff' },
};

const stylesFn: SliderSingleProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return {
      root: { height: 300 },
      track: { background: 'linear-gradient(180deg, #722cc0, #722ed1)' },
      handle: { borderColor: '#722ed1', boxShadow: '0 2px 8px #722ed1' },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();
  const sharedProps: SliderSingleProps = {
    classNames: {
      root: styles.root,
    },
    defaultValue: 30,
  };
  return (
    <Flex vertical gap="middle">
      <Slider {...sharedProps} styles={stylesObject} />
      <Slider
        {...sharedProps}
        classNames={{
          root: styles.root,
          handle: styles.handle,
        }}
        orientation="vertical"
        reverse
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
