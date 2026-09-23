/**
 * Grid Mode Demo
 * CSS Grid Layout - Use `grid` prop to enable CSS Grid semantic layout
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
    {/* 默认 24 列,span 直接复用既有 24 栅格心智 */}
    <Divider titlePlacement="start">Basic Grid (default 24 columns)</Divider>
    <Row grid gutter={[16, 16]}>
      <Col span={6} style={cssObj}>
        col-6
      </Col>
      <Col span={6} style={cssObj}>
        col-6
      </Col>
      <Col span={6} style={cssObj}>
        col-6
      </Col>
      <Col span={6} style={cssObj}>
        col-6
      </Col>
    </Row>

    {/* 自定义列数 */}
    <Divider titlePlacement="start">Custom columns</Divider>
    <Row grid columns={3} gutter={[16, 16]}>
      {[1, 1, 1, 2, 1].map((span, idx) => (
        <Col key={`col-${idx}`} span={span} style={cssObj}>
          span-{span}
        </Col>
      ))}
    </Row>

    {/* 响应式列数 */}
    <Divider titlePlacement="start">Responsive columns</Divider>
    <Row grid columns={{ xs: 1, sm: 2, md: 4 }} gutter={[16, 16]}>
      {[1, 1, 1, 1].map((_, idx) => (
        <Col key={`resp-${idx}`} span={1} style={cssObj}>
          col
        </Col>
      ))}
    </Row>

    {/* 模板区域 + area */}
    <Divider titlePlacement="start">Grid template areas</Divider>
    <Row
      grid
      columns="100px 1fr 50px 1fr"
      areas={[
        ['sidebar', 'header', 'header', 'header'],
        ['sidebar', 'main', 'main', 'content'],
      ]}
      gutter={[16, 16]}
    >
      <Col area="sidebar" style={cssObj}>
        Sidebar
      </Col>
      <Col area="header" style={cssObj}>
        Header
      </Col>
      <Col area="main" style={cssObj}>
        Main
      </Col>
      <Col area="content" style={cssObj}>
        Content
      </Col>
    </Row>

    {/* 跨行 + style 兜底进阶定位 */}
    <Divider titlePlacement="start">Row span & style escape hatch</Divider>
    <Row grid columns={4} gutter={[16, 16]}>
      <Col span={1} rowSpan={2} style={cssObj}>
        span-1 / rowSpan-2
      </Col>
      <Col span={3} style={cssObj}>
        span-3
      </Col>
      {/* 进阶定位(如 grid-line 区间)由 style 兜底,优先级最高 */}
      <Col span={3} style={{ ...cssObj, gridColumn: '2 / span 3' }}>
        style override (2 / span 3)
      </Col>
    </Row>
  </>
);

export default App;
