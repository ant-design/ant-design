import React, { useState } from 'react';
import { Col, Row, Segmented } from 'antd';

const boxStyle: React.CSSProperties = {
  minHeight: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1677ff',
  color: '#fff',
};

const App: React.FC = () => {
  const [preset, setPreset] = useState<string>('columns');

  return (
    <>
      <Segmented
        options={[
          { label: 'Columns', value: 'columns' },
          { label: 'Areas', value: 'areas' },
          { label: 'Row Span', value: 'row-span' },
        ]}
        value={preset}
        onChange={setPreset}
      />

      <div style={{ marginTop: 16 }}>
        {preset === 'columns' && (
          <Row grid columns={4} gutter={[16, 16]}>
            <Col span={1} style={boxStyle}>
              1
            </Col>
            <Col span={1} style={boxStyle}>
              1
            </Col>
            <Col span={2} style={boxStyle}>
              2
            </Col>
          </Row>
        )}

        {preset === 'areas' && (
          <Row
            grid
            columns="100px 1fr 50px 1fr"
            areas={[
              ['sidebar', 'header', 'header', 'header'],
              ['sidebar', 'main', 'main', 'content'],
            ]}
            gutter={[16, 16]}
          >
            <Col area="sidebar" style={{ ...boxStyle, minHeight: 120 }}>
              sidebar
            </Col>
            <Col area="header" style={boxStyle}>
              header
            </Col>
            <Col area="main" style={boxStyle}>
              main
            </Col>
            <Col area="content" style={boxStyle}>
              content
            </Col>
          </Row>
        )}

        {preset === 'row-span' && (
          <Row grid columns={4} gutter={[16, 16]}>
            <Col span={1} rowSpan={2} style={{ ...boxStyle, minHeight: 136 }}>
              span-1 rowSpan-2
            </Col>
            <Col span={3} style={boxStyle}>
              span-3
            </Col>
            <Col span={3} style={boxStyle}>
              span-3
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default App;
