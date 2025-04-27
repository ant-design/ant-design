import React, { ReactElement, ReactNode } from 'react';
import type { SubMenuProps } from 'antd';
import { Menu, ConfigProvider, Typography, Space, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const styles = {
  navigationPopup: {
    padding: 12,
    minWidth: 480,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
  },
  menuItem: {
    borderRadius: 6,
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
};

const cssStyles = `
  .menu-item-hover {
    transition: all 0.3s;
  }
  .menu-item-hover:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

const MenuItem = ({ title, description }: { title: string; description: string }) => (
  <div className="menu-item-hover" style={styles.menuItem}>
    <Space direction="vertical" size={4} style={{ padding: 16 }}>
      <Title level={5} style={{ margin: 0 }}>
        {title}
      </Title>
      <Paragraph type="secondary" style={{ margin: 0 }}>
        {description}
      </Paragraph>
    </Space>
  </div>
);

const menuItems = [
  {
    key: 'home',
    label: 'Home',
  },
  {
    key: 'features',
    label: 'Features',
    children: [
      {
        key: 'getting-started',
        label: (
          <MenuItem title="Getting Started" description="Quick start guide and learn the basics." />
        ),
      },
      {
        key: 'components',
        label: <MenuItem title="Components" description="Explore our component library." />,
      },
      {
        key: 'templates',
        label: <MenuItem title="Templates" description="Ready-to-use template designs." />,
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      {
        key: 'blog',
        label: <MenuItem title="Blog" description="Latest updates and articles." />,
      },
      {
        key: 'community',
        label: <MenuItem title="Community" description="Join our developer community." />,
      },
    ],
  },
];

const popupRender = (_: ReactElement, { item }: { item: SubMenuProps }) => (
  <div style={styles.navigationPopup}>
    <Row gutter={16}>
      {React.Children.map(item.children as ReactNode, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        return (
          <Col span={12} key={child.key}>
            {child}
          </Col>
        );
      })}
    </Row>
  </div>
);

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Menu: {
          popupBg: '#fff',
          horizontalItemSelectedColor: '#1677ff',
          horizontalItemHoverColor: '#1677ff',
        },
        Typography: {
          titleMarginBottom: 0,
          titleMarginTop: 0,
        },
      },
    }}
  >
    <style>{cssStyles}</style>
    <Menu mode="horizontal" items={menuItems} popupRender={popupRender} />
  </ConfigProvider>
);

export default App;
