import * as React from 'react';
import { Button, Space } from 'antd';
import type { SpaceProps } from 'antd';

const classNamesObject: SpaceProps['classNames'] = {
  root: 'demo-space-root',
  item: 'demo-space-item',
  separator: 'demo-space-separator',
};

const classNamesFn: SpaceProps['classNames'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return { root: 'demo-space-root--vertical' };
  }
  return { root: 'demo-space-root--horizontal' };
};

const stylesObject: SpaceProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', padding: 8 },
  item: { backgroundColor: '#f0f0f0', padding: 4 },
  separator: { color: 'red', fontWeight: 'bold' },
};

const stylesFn: SpaceProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#e6f7ff', borderColor: '#1890ff' } };
  }
  return { root: { backgroundColor: '#fff7e6', borderColor: '#fa8c16' } };
};

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h3>classNames Object</h3>
      <Space classNames={classNamesObject} separator="|">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Space>

      <h3>classNames Function</h3>
      <Space orientation="vertical" classNames={classNamesFn}>
        <Button>Vertical Button 1</Button>
        <Button>Vertical Button 2</Button>
        <Button>Vertical Button 3</Button>
      </Space>

      <h3>styles Object</h3>
      <Space styles={stylesObject} separator="•">
        <Button>Styled Button 1</Button>
        <Button>Styled Button 2</Button>
        <Button>Styled Button 3</Button>
      </Space>

      <h3>styles Function</h3>
      <Space size="large" styles={stylesFn}>
        <Button>Large Space Button 1</Button>
        <Button>Large Space Button 2</Button>
        <Button>Large Space Button 3</Button>
      </Space>
    </div>
  );
};

export default App;
