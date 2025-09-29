import React from 'react';
import { Button, Flex, Tooltip, Space } from 'antd';
import type { TooltipProps } from 'antd';

const classNamesObject: TooltipProps['classNames'] = {
  root: 'demo-tooltip-root',
  container: 'demo-tooltip-body',
};

const classNamesFn: TooltipProps['classNames'] = (info) => {
  if (info.props.color === 'blue') {
    return { root: 'demo-tooltip-root--blue' };
  }
  return { root: 'demo-tooltip-root--default' };
};

const stylesObject: TooltipProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  container: { fontStyle: 'italic', backgroundColor: '#f0f0f0' },
};

const stylesFn: TooltipProps['styles'] = (info) => {
  if (info.props.placement?.startsWith('top')) {
    return {
      root: { backgroundColor: '#fff2e8', borderColor: '#ffbb96' },
      container: { color: '#d4380d' },
    };
  }
  return {
    root: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
    container: { color: '#389e0d' },
  };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small" vertical>
      <div>Static classNames & styles:</div>
      <Flex gap="small">
        <Tooltip title="This tooltip uses classNames object" classNames={classNamesObject} open>
          <Button>classNames Object</Button>
        </Tooltip>
        <Tooltip title="This tooltip uses styles object" styles={stylesObject} open>
          <Button>styles Object</Button>
        </Tooltip>
      </Flex>
    </Flex>
    <Flex gap="small" vertical>
      <div>Function-based classNames & styles:</div>
      <Flex gap="small">
        <Tooltip title="This tooltip has blue color" color="blue" classNames={classNamesFn} open>
          <Button>classNames Function</Button>
        </Tooltip>
        <Tooltip title="This tooltip uses top placement" placement="top" styles={stylesFn} open>
          <Button>styles Function</Button>
        </Tooltip>
      </Flex>
    </Flex>
  </Space>
);

export default App;
