import React, { ReactElement, ReactNode, MouseEvent } from 'react';
import type { SubMenuProps } from 'antd';
import { Menu } from 'antd';

const styles = {
  navigationPopup: {
    padding: '24px',
    minWidth: '480px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
  },
  navigationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  navigationMenuItemLink: {
    display: 'block',
    padding: '16px',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '6px',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  navigationMenuItemTitle: {
    margin: '0 0 8px',
    fontSize: '16px',
    fontWeight: 500,
  },
  navigationMenuItemDesc: {
    margin: 0,
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: '14px',
    lineHeight: 1.5,
  },
};

const addHoverEffect = (e: MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
};

const removeHoverEffect = (e: MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = 'transparent';
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
          <div
            style={styles.navigationMenuItemLink}
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <h3 style={styles.navigationMenuItemTitle}>Getting Started</h3>
            <p style={styles.navigationMenuItemDesc}>Quick start guide and learn the basics.</p>
          </div>
        ),
      },
      {
        key: 'components',
        label: (
          <div
            style={styles.navigationMenuItemLink}
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <h3 style={styles.navigationMenuItemTitle}>Components</h3>
            <p style={styles.navigationMenuItemDesc}>Explore our component library.</p>
          </div>
        ),
      },
      {
        key: 'templates',
        label: (
          <div
            style={styles.navigationMenuItemLink}
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <h3 style={styles.navigationMenuItemTitle}>Templates</h3>
            <p style={styles.navigationMenuItemDesc}>Ready-to-use template designs.</p>
          </div>
        ),
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      {
        key: 'blog',
        label: (
          <div
            style={styles.navigationMenuItemLink}
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <h3 style={styles.navigationMenuItemTitle}>Blog</h3>
            <p style={styles.navigationMenuItemDesc}>Latest updates and articles.</p>
          </div>
        ),
      },
      {
        key: 'community',
        label: (
          <div
            style={styles.navigationMenuItemLink}
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            <h3 style={styles.navigationMenuItemTitle}>Community</h3>
            <p style={styles.navigationMenuItemDesc}>Join our developer community.</p>
          </div>
        ),
      },
    ],
  },
];

const popupRender = (_: ReactElement, { item }: { item: SubMenuProps }) => {
  return (
    <div style={styles.navigationPopup}>
      <div style={styles.navigationGrid}>
        {React.Children.map(item.children as ReactNode, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          return <div>{child}</div>;
        })}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return <Menu mode="horizontal" items={menuItems} popupRender={popupRender} />;
};

export default App;
