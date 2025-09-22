import React from 'react';
import type { MenuProps } from 'antd';
import { Col, ConfigProvider, Flex, Menu, Row, Space, Typography } from 'antd';
import { createStyles } from 'antd-style';

const { Title, Paragraph } = Typography;

const useStyles = createStyles(({ token }) => ({
  navigationPopup: {
    padding: token.padding,
    minWidth: 480,
    background: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  },
  menuItem: {
    borderRadius: token.borderRadius,
    transition: `all ${token.motionDurationSlow}`,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.02)',
    },
  },
  menuItemSpace: {
    padding: token.paddingSM,
  },
  leadingHeader: {
    margin: '0 !important',
    paddingBottom: token.paddingXS,
    borderBottom: `1px solid ${token.colorSplit}`,
  },
  marginLess: {
    margin: '0 !important',
  },
}));

const MenuItem = ({ title, description }: { title: string; description: string }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.menuItem}>
      <Space vertical size={4} className={styles.menuItemSpace}>
        <Title level={5} className={styles.marginLess}>
          {title}
        </Title>
        <Paragraph type="secondary" className={styles.marginLess}>
          {description}
        </Paragraph>
      </Space>
    </div>
  );
};

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

const App: React.FC = () => {
  const { styles } = useStyles();
  const popupRender: MenuProps['popupRender'] = (_, { item }) => {
    return (
      <Flex className={styles.navigationPopup} vertical gap="middle">
        <Typography.Title level={3} className={styles.leadingHeader}>
          {item.title}
        </Typography.Title>
        <Row gutter={16}>
          {React.Children.map(item.children as React.ReactNode, (child) => {
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
      </Flex>
    );
  };

  return (
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
      <Menu mode="horizontal" items={menuItems} popupRender={popupRender} />
    </ConfigProvider>
  );
};

export default App;
