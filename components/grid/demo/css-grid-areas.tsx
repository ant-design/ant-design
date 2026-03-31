import React from 'react';
import { CSSGrid } from 'antd';

const itemStyle: React.CSSProperties = {
  background: '#1677ff',
  color: '#fff',
  padding: 24,
  textAlign: 'center',
};

const App: React.FC = () => (
  <CSSGrid
    templateAreas='"menu header header" "menu sidebar main" "menu footer footer"'
    templateRows="auto 1fr auto"
    templateColumns="100px 200px 1fr "
    gap="middle"
    style={{ minHeight: 300 }}
  >
    <div style={{ ...itemStyle, gridArea: 'menu' }}>Menu</div>
    <div style={{ ...itemStyle, gridArea: 'header' }}>Header</div>
    <div style={{ ...itemStyle, gridArea: 'sidebar' }}>Sidebar</div>
    <div style={{ ...itemStyle, gridArea: 'main' }}>Main Content</div>
    <div style={{ ...itemStyle, gridArea: 'footer' }}>Footer</div>
  </CSSGrid>
);

export default App;
