import React from 'react';
import { Flex, Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import { createStyles } from 'antd-style';

const useHorizontalStyles = createStyles(({ css }) => ({
  root: css`
    width: 300px;
  `,
}));

const useVerticalStyles = createStyles(({ css, prefixCls, cssVar }) => ({
  root: css`
    width: 100px;
    &:hover {
      .${prefixCls}-slider-handle:after {
        box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
      }
    }
  `,
  handle: css`
    &.${prefixCls}-slider-handle:hover::after,
      &.${prefixCls}-slider-handle:active::after,
      &.${prefixCls}-slider-handle:focus::after,
      &.${prefixCls}-slider-handle::after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
}));

const stylesObject: SliderSingleProps['styles'] = {
  track: { backgroundImage: 'linear-gradient(180deg, #91caff, #1677ff)' },
  handle: { borderColor: '#1677ff', boxShadow: '0 2px 8px #1677ff' },
};

const stylesFn: SliderSingleProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return {
      root: { height: 300 },
      track: { backgroundImage: 'linear-gradient(180deg, #722cc0, #722ed1)' },
      handle: { borderColor: '#722ed1', boxShadow: '0 2px 8px #722ed1' },
    };
  }
  return {};
};

const sharedProps: SliderSingleProps = {
  defaultValue: 30,
};

const App: React.FC = () => {
  const { styles: horizontalClassNames } = useHorizontalStyles();
  const { styles: verticalClassNames } = useVerticalStyles();
  return (
    <Flex vertical gap="medium">
      <Slider
        {...sharedProps}
        orientation="horizontal"
        classNames={horizontalClassNames}
        styles={stylesObject}
      />
      <Slider
        {...sharedProps}
        classNames={verticalClassNames}
        orientation="vertical"
        reverse
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
