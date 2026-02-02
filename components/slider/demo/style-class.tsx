import React from 'react';
import { Flex, Slider } from 'antd';
import type { SliderSemanticAllType, SliderSingleProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    width: 300px;
  `,
}));

const classNamesFn = createStaticStyles(({ css, cssVar }) => ({
  root: css`
    width: 100px;
    &:hover .ant-slider-handle:after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
  handle: css`
    &.ant-slider-handle:hover::after,
    &.ant-slider-handle:active::after,
    &.ant-slider-handle:focus::after,
    &.ant-slider-handle::after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
}));

const stylesObject: SliderSingleProps['styles'] = {
  track: { backgroundImage: 'linear-gradient(180deg, #91caff, #1677ff)' },
  handle: { borderColor: '#1677ff', boxShadow: '0 2px 8px #1677ff' },
};

const stylesFn: SliderSingleProps['styles'] = (info): SliderSemanticAllType['styles'] => {
  if (info.props.orientation === 'vertical') {
    return {
      root: { height: 300 },
      track: { backgroundImage: 'linear-gradient(180deg, #722cc0, #722ed1)' },
      handle: { borderColor: '#722ed1', boxShadow: '0 2px 8px #722ed1' },
    };
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: SliderSingleProps = {
    defaultValue: 30,
  };
  return (
    <Flex vertical gap="middle">
      <Slider {...sharedProps} classNames={classNames} styles={stylesObject} />
      <Slider
        {...sharedProps}
        classNames={classNamesFn}
        orientation="vertical"
        reverse
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
