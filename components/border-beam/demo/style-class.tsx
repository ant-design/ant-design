import React from 'react';
import { BorderBeam, Flex, theme, Typography } from 'antd';
import type { BorderBeamProps } from 'antd';

const radius = 24;

const classNames: BorderBeamProps['classNames'] = {
  root: 'demo-border-beam-root',
  beam: 'demo-border-beam-beam',
};

const styles: BorderBeamProps['styles'] = {
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
            border-radius: ${radius}px;
          }

          .demo-border-beam-beam::before {
            filter: saturate(1.15);
          }
        `}
      </style>
      <div style={{ width: 360 }}>
        <BorderBeam classNames={classNames} styles={styles}>
          <Flex
            vertical
            gap={8}
            style={{
              padding: 24,
              borderRadius: radius,
              border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
              background: token.colorBgContainer,
              boxShadow: token.boxShadowTertiary,
            }}
          >
            <Typography.Title level={4} style={{ margin: 0 }}>
              Semantic customization
            </Typography.Title>
            <Typography.Text type="secondary">
              Use `classNames.root` to provide the wrapper radius and `styles.beam` to fine tune the
              decorative beam layer.
            </Typography.Text>
          </Flex>
        </BorderBeam>
      </div>
    </>
  );
};

export default App;
