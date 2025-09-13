import React from 'react';
import { Anchor } from 'antd';
import type { AnchorProps } from 'antd';

const classNamesObject: AnchorProps['classNames'] = {
  root: 'demo-anchor-root',
  item: 'demo-anchor-item',
  title: 'demo-anchor-title',
  indicator: 'demo-anchor-indicator',
};

const classNamesFn: AnchorProps['classNames'] = (info) => {
  if (info.props.direction === 'horizontal') {
    return { root: 'demo-anchor-root--horizontal' };
  }
  return { root: 'demo-anchor-root--vertical' };
};

const stylesObject: AnchorProps['styles'] = {
  root: { padding: 8 },
  item: { marginInlineEnd: 8 },
  title: { fontStyle: 'italic' },
  indicator: { backgroundColor: '#1677ff' },
};

const stylesFn: AnchorProps['styles'] = (info) => {
  if (info.props.direction === 'horizontal') {
    return { root: { backgroundColor: '#fafafa' } };
  }
  return { root: { backgroundColor: '#fffbe6' } };
};

const items: NonNullable<AnchorProps['items']> = [
  { key: '1', href: '#1', title: 'Section 1' },
  { key: '2', href: '#2', title: 'Section 2' },
  { key: '3', href: '#3', title: 'Section 3' },
];

const App: React.FC = () => (
  <div>
    <Anchor items={items} classNames={classNamesObject} />
    <br />
    <Anchor items={items} direction="horizontal" classNames={classNamesFn} />
    <br />
    <Anchor items={items} styles={stylesObject} />
    <br />
    <Anchor items={items} direction="horizontal" styles={stylesFn} />
  </div>
);

export default App;
