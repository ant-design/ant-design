import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            algorithm: true,
            colorPrimary: '#1976d2',
            controlHeight: 36,
            primaryShadow:
              '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
            fontWeight: 500,
            defaultBorderColor: 'rgba(25, 118, 210, 0.5)',
            colorText: '#1976d2',
            defaultColor: '#1976d2',
            borderRadius: 4,
            colorTextDisabled: 'rgba(0, 0, 0, 0.26)',
            colorBgContainerDisabled: 'rgba(0, 0, 0, 0.12)',
            contentFontSizeSM: 12,
          },
        },
      }}
    >
      <Flex wrap gap="small">
        <Button type="text">TEXT</Button>
        <Button type="primary">CONTAINED</Button>
        <Button>OUTLINED</Button>
      </Flex>
      <Flex wrap gap="small">
        <Button type="text" disabled>
          TEXT
        </Button>
        <Button type="primary" disabled>
          CONTAINED
        </Button>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorBorderDisabled: 'rgba(0, 0, 0, 0.12)',
                colorBgContainerDisabled: 'transparent',
              },
            },
          }}
        >
          <Button disabled>OUTLINED</Button>
        </ConfigProvider>
      </Flex>
      <Flex wrap gap="small">
        <Button type="text" size="small">
          TEXT
        </Button>
        <Button type="primary" size="small">
          CONTAINED
        </Button>
        <Button size="small">OUTLINED</Button>
      </Flex>
    </ConfigProvider>
    <Flex gap="small" wrap>
      <ConfigProvider theme={{ components: { Button: { colorBorderDisabled: 'red' } } }}>
        <Button disabled>Custom Red Disabled</Button>
      </ConfigProvider>
      <ConfigProvider theme={{ components: { Button: { borderColorDisabled: 'blue' } } }}>
        <Button disabled>Legacy Blue Disabled</Button>
      </ConfigProvider>
    </Flex>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF0000',
        },
      }}
    >
      <Flex gap="small" wrap>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
        <Button color="primary" variant="text">
          Primary Text
        </Button>
        <Button color="primary" variant="link">
          Primary Link
        </Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: { Button: { paddingInline: 100, paddingInlineLG: 150, paddingInlineSM: 50 } },
      }}
    >
      <Flex gap="small" vertical align="start">
        <Button>Default Button</Button>
        <Button shape="round">Default Button</Button>
        <Button size="large">Default Button</Button>
        <Button shape="round" size="large">
          Default Button
        </Button>
        <Button size="small">Default Button</Button>
        <Button shape="round" size="small">
          Default Button
        </Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#000',
            defaultColor: '#f00',
            defaultHoverColor: '#0f0',
            defaultActiveColor: '#00f',
          },
        },
      }}
    >
      <Flex gap="small" vertical align="start">
        <Button>Default Button</Button>
      </Flex>
    </ConfigProvider>
  </Flex>
);

export default App;
