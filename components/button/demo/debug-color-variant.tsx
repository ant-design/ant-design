import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import type { ThemeConfig } from 'antd';
import { createStaticStyles } from 'antd-style';

const specClassNames = createStaticStyles(({ css }) => ({
  primary: css`
    background: #5794f7;
    border-color: blue;
    color: wheat;
  `,
  default: css`
    border-color: gray;
    background: #f5f5f5;
    color: #313030;
  `,
  dashed: css`
    border-color: gray;
    background: #f5f5f5;
    color: #313030;
  `,
  text: css`
    color: gray;
  `,
  link: css`
    color: blue;
  `,
}));

const originalClsStyle = createStaticStyles(({ css }) => ({
  wrapper: css`
    .ant-btn-primary {
      color: #ec5b56;
    }
    .ant-btn-default {
      color: orange;
    }
    .ant-btn-dashed {
      color: #3976f6;
    }
    .ant-btn-text {
      color: green;
    }
    .ant-btn-link {
      color: #0e98aa;
    }
  `,
}));

const theme: ThemeConfig = {
  components: {
    Button: {
      defaultHoverBg: 'orange',
      defaultActiveBg: 'blue',
      primaryColor: 'pink',
      dangerColor: 'green',
    },
  },
};

const App: React.FC = () => {
  return (
    <Flex vertical gap="small">
      {/* link color */}
      <Flex gap="small">
        <ConfigProvider theme={{ token: { colorLink: '#FF0000' } }}>
          <Button type="link">Link Button</Button>
        </ConfigProvider>
        <Button type="link">Link Button</Button>
      </Flex>

      {/* css specificity  */}
      <Flex gap="small" wrap>
        <Button type="primary" className={specClassNames.primary}>
          Primary Button
        </Button>
        <Button type="default" className={specClassNames.default}>
          Default Button
        </Button>
        <Button type="dashed" className={specClassNames.dashed}>
          Dashed Button
        </Button>
        <Button type="text" className={specClassNames.text}>
          Text Button
        </Button>
        <Button type="link" className={specClassNames.link}>
          Link Button
        </Button>
      </Flex>

      {/* Compatibility: v < 5.20.1  */}
      <Flex gap="small" wrap className={originalClsStyle.wrapper}>
        <Button type="primary">Primary Button</Button>
        <Button type="default">Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>

      {/* theme config */}
      <Flex gap="small" wrap>
        <ConfigProvider theme={theme}>
          <Button type="primary" variant="solid">
            Primary
          </Button>
          <Button color="primary" variant="solid">
            Solid primary
          </Button>
          <Button color="danger" variant="solid">
            Solid danger
          </Button>
          <Button type="default">Default</Button>
          <Button variant="outlined">Outlined</Button>
          <Button type="dashed">Dashed</Button>
        </ConfigProvider>
      </Flex>
      <Flex gap="small" wrap>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                textTextColor: '#f60',
                textTextHoverColor: '#722ed1',
                textTextActiveColor: '#0f0',
                textHoverBg: '#000',
              },
            },
          }}
        >
          <Button type="text">type="text" (Default)</Button>
        </ConfigProvider>
      </Flex>
    </Flex>
  );
};

export default App;
