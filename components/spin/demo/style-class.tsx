import React from 'react';
import { Flex, Spin } from 'antd';
import type { SpinProps } from 'antd';

// 1) classNames as object
const classNamesObject: SpinProps['classNames'] = {
  root: 'demo-spin-root',
  indicator: 'demo-spin-indicator',
};

// 2) classNames as function (based on props)
const classNamesFn: SpinProps['classNames'] = (info) => {
  const { size } = info.props;
  return size === 'small' ? { root: 'demo-spin-root--sm' } : { root: 'demo-spin-root--md' };
};

// 3) styles as object
const stylesObject: SpinProps['styles'] = {
  indicator: { color: '#1677ff' },
};

// 4) styles as function
const stylesFn: SpinProps['styles'] = (info) => {
  const { size } = info.props;
  if (size === 'small') {
    return { indicator: { color: '#fa541c' } };
  }
  return { indicator: { color: '#52c41a' } };
};

const App: React.FC = () => {
  return (
    <Flex align="center" gap="middle">
      {/* 1. classNames as object */}
      <Spin spinning percent={0} classNames={classNamesObject} />

      {/* 2. classNames as function */}
      <Spin spinning percent={0} size="small" classNames={classNamesFn} />

      {/* 3. styles as object */}
      <Spin spinning percent={0} styles={stylesObject} />

      {/* 4. styles as function */}
      <Spin spinning percent={0} size="small" styles={stylesFn} />
    </Flex>
  );
};

export default App;
