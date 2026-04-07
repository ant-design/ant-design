## CSS Grid 布局

设置 `mode="grid"` 开启 CSS Grid 布局模式，使用现代 CSS Grid 替代传统的 Flex 布局。

- 使用 `gap` 属性设置间距，性能更优
- 支持所有 CSS Grid 特性

```tsx
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
      gridTemplateAreas="'header header header header' 'sidebar main main ads' 'sidebar2 footer footer footer2'"
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
      <Col gridArea="sidebar2" style={{ ...colStyle, background: '#52c41a' }}>
        S2
      </Col>
      <Col gridArea="footer" style={{ ...colStyle, background: '#eb2f96' }}>
        Footer (. = 留空)
      </Col>
      <Col gridArea="footer2" style={{ ...colStyle, background: '#1677ff' }}>
        F2
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
```

### 基础用法

- **自动映射**：`span` 属性自动转换为 `grid-column: span N`

### 模板区域布局

- **可视化布局**：`gridTemplateAreas` + `gridArea` 命名区域
- 使用 `.` 表示留空单元格

### 网格线定位

- 数字 N = 放置在第 N 条网格线
- `"N / M"` = 从第 N 条线到第 M 条线
- `"1 / -1"` = 从第 1 条线到最后一列

> 注意：`mode="flex"` 为传统 Flex 布局模式（默认）。Grid 模式下不支持 `justify` 和 `align` 属性。Col 在 Grid 模式下不支持 `push`、`pull`、`order` 等 Flex 排序属性。
