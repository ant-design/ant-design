import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <div>Component Token</div>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontWeight: '900',
            contentFontSizeSM: 20,
            contentLineHeightSM: 2,
            contentFontSize: 30,
            contentLineHeight: 2,
            contentFontSizeLG: 40,
            contentLineHeightLG: 2,
            paddingBlockSM: 20,
            paddingBlock: 30,
            paddingBlockLG: 40,
            paddingInlineSM: 20,
            paddingInline: 30,
            paddingInlineLG: 40,
          },
        },
      }}
    >
      <Flex gap="small" align="center">
        <Button size="small">Small</Button>
        <Button>Default</Button>
        <Button size="large">Large</Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            dangerColor: 'green',
            dangerShadow: 'yellow',
          },
        },
      }}
    >
      <Flex gap="small" align="center">
        <Button danger>Default</Button>
        <Button danger type="primary">
          Primary
        </Button>
        <Button danger type="dashed">
          Dashed
        </Button>
        <Button danger type="text">
          Text
        </Button>
        <Button danger type="link">
          Link
        </Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            dashedBgDisabled: 'red',
          },
        },
      }}
    >
      <Button type="dashed" disabled>
        Dashed Disabled
      </Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultColor: 'red',
            defaultBg: 'blue',
            defaultBorderColor: 'green',
            defaultShadow: 'yellow',
            defaultBgDisabled: 'pink',

            defaultHoverColor: 'brown',
            defaultHoverBg: 'orange',
            defaultHoverBorderColor: 'purple',

            defaultActiveColor: 'fuchsia',
            defaultActiveBg: 'aqua',
            defaultActiveBorderColor: 'lime',
          },
        },
      }}
    >
      <Flex gap="small" align="start">
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button disabled>Disabled</Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            ghostBg: 'red',
            defaultGhostColor: 'yellow',
            defaultGhostBorderColor: 'green',
          },
        },
      }}
    >
      <Flex gap="small" align="start">
        <Button ghost>Default</Button>
        <Button ghost type="dashed">
          Dashed
        </Button>
        <Button ghost type="text">
          Text
        </Button>
        <Button ghost type="link">
          Link
        </Button>
        <Button ghost type="primary">
          Primary
        </Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            iconGap: 40,
          },
        },
      }}
    >
      <Button icon={<SearchOutlined />}>icon gap 40</Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            linkHoverBg: 'red',
          },
        },
      }}
    >
      <Flex gap="small" align="center">
        <Button type="link" href="https://ant.design">
          Link
        </Button>
        <Button disabled type="link" href="https://ant.design">
          Link(disabled)
        </Button>
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            onlyIconSizeSM: 20,
            onlyIconSize: 30,
            onlyIconSizeLG: 40,
          },
        },
      }}
    >
      <Flex gap="small" align="center">
        <Button size="small" icon={<SearchOutlined />} />
        <Button icon={<SearchOutlined />} />
        <Button size="large" icon={<SearchOutlined />} />
      </Flex>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: 'red',
            primaryShadow: 'yellow',
          },
        },
      }}
    >
      <Button type="primary">Primary</Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            solidTextColor: 'red',
          },
        },
      }}
    >
      <Button variant="solid" color="default">
        Solid
      </Button>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            textTextColor: 'red',
            textHoverBg: 'yellow',
            textTextHoverColor: 'blue',
            textTextActiveColor: 'green',
          },
        },
      }}
    >
      <Flex gap="small" align="start">
        <Button type="text">Text</Button>
        <Button variant="text" color="default">
          Default Text
        </Button>
        <Button variant="text" color="primary">
          Primary Text
        </Button>
        <Button variant="text" color="danger">
          Danger Text
        </Button>
      </Flex>
    </ConfigProvider>
    <div>Global Token</div>
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
  </Flex>
);

export default App;
