import React from 'react';
import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';

const classNamesObject: ProgressProps['classNames'] = {
  root: 'demo-anchor-root',
  track: 'demo-anchor-item',
};

const stylesFn: ProgressProps['styles'] = (info) => {
  const percent = info?.props?.percent ?? 0;
  return {
    root: { backgroundColor: `rgba(255, 77, 79, ${percent / 100})` },
    track: { backgroundColor: `rgba(0, 0, 0, ${percent / 100})` },
  };
};

const App: React.FC = () => (
  <Flex vertical gap={16}>
    <Progress classNames={classNamesObject} styles={stylesFn} percent={10} />
    <Progress classNames={classNamesObject} styles={stylesFn} percent={20} />
    <Progress classNames={classNamesObject} styles={stylesFn} percent={40} />
    <Progress classNames={classNamesObject} styles={stylesFn} percent={60} />
    <Progress classNames={classNamesObject} styles={stylesFn} percent={80} />
    <Progress classNames={classNamesObject} styles={stylesFn} percent={99} />
  </Flex>
);

export default App;
