import * as React from 'react';
import { Button, Space } from 'antd';
import type { SpaceProps, SpaceSemanticType } from 'antd';

const classNamesObject: SpaceProps['classNames'] = {
  root: 'demo-space-root',
  item: 'demo-space-item',
  separator: 'demo-space-separator',
};

const classNamesFn: SpaceProps['classNames'] = (info): SpaceSemanticType['classNames'] => {
  if (info.props.orientation === 'vertical') {
    return {
      root: 'demo-space-root--vertical',
    };
  } else {
    return {
      root: 'demo-space-root--horizontal',
    };
  }
};

const stylesObject: SpaceProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 8, marginBottom: 10 },
  item: { backgroundColor: '#f0f0f0', padding: 4 },
  separator: { color: 'red', fontWeight: 'bold' },
};

const stylesFn: SpaceProps['styles'] = (info): SpaceSemanticType['styles'] => {
  if (info.props.size === 'large') {
    return {
      root: {
        backgroundColor: '#e6f7ff',
        borderColor: '#1890ff',
        padding: 8,
      },
    };
  } else {
    return {
      root: {
        backgroundColor: '#fff7e6',
        borderColor: '#fa8c16',
      },
    };
  }
};

const App: React.FC = () => {
  return (
    <div>
      <Space styles={stylesObject} classNames={classNamesObject} separator="•">
        <Button>Styled Button 1</Button>
        <Button>Styled Button 2</Button>
        <Button>Styled Button 3</Button>
      </Space>
      <Space size="large" styles={stylesFn} classNames={classNamesFn}>
        <Button>Large Space Button 1</Button>
        <Button>Large Space Button 2</Button>
        <Button>Large Space Button 3</Button>
      </Space>
    </div>
  );
};

export default App;
