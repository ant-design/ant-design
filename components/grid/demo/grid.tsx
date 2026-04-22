/**
 * Grid Mode Demo
 * CSS Grid Layout - Use grid prop to enable CSS Grid layout
 */
import React from 'react';
import type { CSSProperties } from 'react';
import { Col, Divider, Row } from 'antd';

const cssObj: CSSProperties = {
  background: '#1677ff',
  color: '#fff',
  minHeight: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const App: React.FC = () => (
  <>
    {/* Basic Grid with span */}
    <Divider titlePlacement="start">Basic Grid (span maps to grid-column)</Divider>
    <Row grid={{ gridTemplateColumns: 'repeat(4, 1fr)' }} gutter={[16, 16]}>
      {[1, 1, 1, 1, 2, 1, 1].map((span, idx) => (
        <Col key={`span-${idx}`} span={span} style={cssObj}>
          col-{span}
        </Col>
      ))}
    </Row>

    {/* Grid Template Areas */}
    <Divider titlePlacement="start">Grid Template Areas Layout</Divider>
    <Row
      grid={{
        gridTemplateColumns: '100px 1fr 50px 1fr',
        gridTemplateAreas: '"sidebar header header header" "sidebar main main content"',
      }}
      gutter={[16, 16]}
    >
      {[
        { gridArea: 'header', children: 'Header' },
        { gridArea: 'sidebar', children: 'Sidebar' },
        { gridArea: 'main', children: 'Main' },
        { gridArea: 'content', children: 'Content' },
      ].map((item) => (
        <Col key={item.gridArea} gridItemConfig={{ gridArea: item.gridArea }} style={cssObj}>
          {item.children}
        </Col>
      ))}
    </Row>
  </>
);

export default App;
