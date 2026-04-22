import React from 'react';
import { BorderBeam, Card, theme, Typography } from 'antd';
import type { BorderBeamProps } from 'antd';

const classNames: BorderBeamProps['classNames'] = {
  root: 'demo-border-beam-root',
  beam: 'demo-border-beam-beam',
};

const styles: BorderBeamProps['styles'] = {
  root: {
    boxShadow: '0 0 0 1px rgba(22, 119, 255, 0.12)',
  },
  beam: {
    opacity: 0.9,
  },
};

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <>
      <style>
        {`
          .demo-border-beam-root {
            transition: box-shadow 0.3s ease;
          }

          .demo-border-beam-beam::before {
            filter: saturate(1.15);
          }
        `}
      </style>
      <div style={{ width: 360 }}>
        <BorderBeam classNames={classNames} styles={styles}>
          <Card
            title="Semantic customization"
            style={{
              background: token.colorBgContainer,
              boxShadow: token.boxShadowTertiary,
            }}
          >
            <Typography.Text type="secondary">
              Use `classNames.root`, `classNames.beam`, and `styles.beam` to fine tune the decorated
              root and beam layer.
            </Typography.Text>
          </Card>
        </BorderBeam>
      </div>
    </>
  );
};

export default App;
