import React from 'react';
import { Layout, Menu } from '../components';

const { Header, Content } = Layout;

const TestStyleIsolation: React.FC = () => {
  const headerItems = [
    { key: '1', label: 'Header Item 1' },
    { key: '2', label: 'Header Item 2' },
    { key: '3', label: 'Header Item 3' }
  ];

  const verticalItems = [
    { key: '1', label: 'Vertical Item 1' },
    { key: '2', label: 'Vertical Item 2' },
    { key: '3', label: 'Vertical Item 3' }
  ];

  return (
    <div>
      <h1>Layout-Menu Style Isolation Test</h1>
      
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <div style={{ color: 'white', marginRight: 20, fontSize: '16px' }}>Header Menu:</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={headerItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        
        <Content style={{ padding: '20px 48px', minHeight: 400 }}>
          <div style={{ marginBottom: '30px' }}>
            <h2>Standalone Vertical Menu</h2>
            <p>This menu should NOT inherit header line-height and should render with default styles.</p>
            <Menu
              mode="vertical"
              defaultSelectedKeys={['2']}
              items={verticalItems}
              style={{ width: 256 }}
            />
          </div>
          
          <div>
            <h2>Standalone Horizontal Menu</h2>
            <p>This horizontal menu should also NOT inherit header line-height.</p>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={headerItems}
              style={{ width: '100%' }}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default TestStyleIsolation;