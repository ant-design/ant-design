import React, { useState } from 'react';
import { Button, Splitter } from 'antd';

const App: React.FC = () => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button
          onClick={() => setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal')}
          style={{ marginRight: '8px' }}
        >
          Toggle Orientation: {orientation}
        </Button>
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme: {theme}
        </Button>
      </div>

      <Splitter
        orientation={orientation}
        style={{ height: 300, border: '1px solid #d9d9d9' }}
        classNames={({ props }) => ({
          root: `custom-splitter-${props.orientation} theme-${theme}`,
          panel: `custom-panel-${theme}`,
          dragger: {
            default: `custom-dragger-${props.orientation}-${theme}`,
            active: `custom-dragger-active-${theme}`,
          },
        })}
        styles={({ props }) => ({
          root: {
            backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            border: `2px solid ${theme === 'dark' ? '#434343' : '#d9d9d9'}`,
          },
          panel: {
            backgroundColor: theme === 'dark' ? '#262626' : '#fafafa',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
          },
          dragger: {
            backgroundColor: theme === 'dark' ? '#434343' : '#e6f4ff',
            borderRadius: props.orientation === 'horizontal' ? '0 4px 4px 0' : '4px 4px 0 0',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#595959' : '#bae0ff',
            },
          },
        })}
      >
        <Splitter.Panel>
          <div>
            Panel 1
            <br />
            Orientation: {orientation}
            <br />
            Theme: {theme}
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div>
            Panel 2
            <br />
            Dynamic styling based on props
          </div>
        </Splitter.Panel>
      </Splitter>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5' }}>
        <h4>Features Demonstrated:</h4>
        <ul>
          <li>
            ✅ <strong>Dynamic classNames as function</strong>: Classes change based on orientation
            and theme
          </li>
          <li>
            ✅ <strong>Dynamic styles as function</strong>: Styles adapt to props and state
          </li>
          <li>
            ✅ <strong>Complex dragger styling</strong>: Different styles for default and active
            states
          </li>
          <li>
            ✅ <strong>Responsive design</strong>: Layout adapts to orientation changes
          </li>
          <li>
            ✅ <strong>Theme support</strong>: Dark/light theme switching
          </li>
        </ul>
      </div>

      <style>{`
        .custom-splitter-horizontal {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .custom-splitter-vertical {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }
        .custom-panel-light {
          border: 1px solid #e6f4ff;
        }
        .custom-panel-dark {
          border: 1px solid #434343;
        }
        .custom-dragger-horizontal-light {
          border-left: 2px solid #1890ff;
        }
        .custom-dragger-vertical-light {
          border-top: 2px solid #1890ff;
        }
        .custom-dragger-horizontal-dark {
          border-left: 2px solid #177ddc;
        }
        .custom-dragger-vertical-dark {
          border-top: 2px solid #177ddc;
        }
        .custom-dragger-active-light {
          background-color: #40a9ff !important;
        }
        .custom-dragger-active-dark {
          background-color: #096dd9 !important;
        }
        .theme-light {
          transition: all 0.3s ease;
        }
        .theme-dark {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default App;
