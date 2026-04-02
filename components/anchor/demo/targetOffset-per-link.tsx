import React from 'react';
import { Anchor, Col, Row } from 'antd';
const style: React.CSSProperties = {
  height: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  position: 'fixed',
  top: 0,
  insetInlineStart: 0,
  width: '75%',
  color: '#fff',
};
const App: React.FC = () => {
  const topRef = React.useRef<HTMLDivElement>(null);
  return (
    <Row>
      <Col span={18}>
        <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.2)' }} />
        <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.2)' }} />
        <div id="part-3" style={{ height: '100vh', background: 'rgba(0, 0, 255, 0.2)' }} />
        <div id="part-4" style={{ height: '100vh', background: 'rgba(0, 255, 229, 0.2)' }} />
      </Col>
      <Col span={6}>
        <Anchor
          targetOffset={20}
          items={[
            {
              key: 'part-1',
              href: '#part-1',
              title: 'Part 1',
            },
            {
              key: 'part-2',
              href: '#part-2',
              title: 'Part 2 (uses link targetOffset: 50)',
              targetOffset: 50,
            },
            {
              key: 'part-3',
              href: '#part-3',
              title: 'Part 3 (uses link targetOffset: 50)',
              targetOffset: 50,
            },
            {
              key: 'part-4',
              href: '#part-4',
              title: 'Part 4 (uses global targetOffset: 20)',
            },
          ]}
        />
      </Col>
      <div style={style} ref={topRef}>
        <div>Fixed Top Block</div>
      </div>
    </Row>
  );
};

export default App;
