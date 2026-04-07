import React from 'react';
import { Col, Divider, Row } from 'antd';

const colStyle: React.CSSProperties = {
  background: '#1677ff',
  color: '#fff',
  padding: '24px 0',
  textAlign: 'center',
  fontSize: 16,
};

const App: React.FC = () => (
  <>
    <Divider>基础用法：span 自动映射为 grid-column</Divider>
    <Row mode="grid" gutter={[16, 24]} gridTemplateColumns="repeat(24, 1fr)">
      <Col span={6} style={colStyle}>
        col-6
      </Col>
      <Col span={6} style={colStyle}>
        col-6
      </Col>
      <Col span={6} style={colStyle}>
        col-6
      </Col>
      <Col span={6} style={colStyle}>
        col-6
      </Col>
    </Row>

    <Divider>模板区域布局（用 . 留空单元格）</Divider>
    <Row
      mode="grid"
      gutter={[16, 8]}
      gridTemplateAreas="'header header header ' 'sidebar main  ads' 'sidebar . footer '"
    >
      <Col gridArea="header" style={colStyle}>
        Header
      </Col>
      <Col gridArea="sidebar" style={{ ...colStyle, background: '#52c41a' }}>
        Sidebar
      </Col>
      <Col gridArea="main" style={{ ...colStyle, background: '#722ed1' }}>
        Main Content
      </Col>
      <Col gridArea="ads" style={{ ...colStyle, background: '#faad14' }}>
        Ads
      </Col>
      <Col gridArea="footer" style={{ ...colStyle, background: '#eb2f96' }}>
        Footer
      </Col>
    </Row>

    <Divider>网格线定位</Divider>
    <Row mode="grid" gutter={[16, 8]} gridTemplateColumns="repeat(4, 1fr)">
      <Col style={colStyle}>1 (默认)</Col>
      <Col gridColumn={2} style={{ ...colStyle, background: '#52c41a' }}>
        gridColumn=2
      </Col>
      <Col style={colStyle}>3</Col>
      <Col gridColumn={4} style={{ ...colStyle, background: '#722ed1' }}>
        gridColumn=4
      </Col>
      <Col gridRow={2} style={{ ...colStyle, background: '#faad14' }}>
        gridRow=2
      </Col>
      <Col style={colStyle}>位置 2</Col>
      <Col gridColumn="2 / 4" style={{ ...colStyle, background: '#eb2f96' }}>
        gridColumn="2 / 4"
      </Col>
    </Row>
  </>
);

export default App;
