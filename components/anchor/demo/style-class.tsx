import React from 'react';
import { Anchor, Col, Row } from 'antd';
import type { AnchorProps } from 'antd';

const classNamesObject: AnchorProps['classNames'] = {
  root: 'demo-anchor-root',
  item: 'demo-anchor-item',
  title: 'demo-anchor-title',
  indicator: 'demo-anchor-indicator',
};

const stylesFn: AnchorProps['styles'] = (info) => {
  if (info.props.direction === 'vertical') {
    return {
      root: {
        backgroundColor: 'rgba(255,251,230,0.5)',
        height: '100vh',
      },
    } satisfies AnchorProps['styles'];
  }
  return {};
};

const items: NonNullable<AnchorProps['items']> = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'Part 1',
  },
  {
    key: 'part-2',
    href: '#part-2',
    title: 'Part 2',
  },
  {
    key: 'part-3',
    href: '#part-3',
    title: 'Part 3',
  },
];

const App: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.08)' }} />
        <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.08)' }} />
        <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.08)' }} />
      </Col>
      <Col span={8}>
        <Anchor replace items={items} styles={stylesFn} classNames={classNamesObject} />
      </Col>
    </Row>
  );
};

export default App;
