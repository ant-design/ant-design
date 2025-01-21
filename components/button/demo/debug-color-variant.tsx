import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';
import { createStyles } from 'antd-style';

const useSpecStyle = createStyles(({ css }) => ({
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

const useOriginalClsStyle = createStyles(({ css }) => ({
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

const App: React.FC = () => {
  const { styles: specStyle } = useSpecStyle();
  const { styles: originalClsStyle } = useOriginalClsStyle();

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
        <Button type="primary" className={specStyle.primary}>
          Primary Button
        </Button>
        <Button type="default" className={specStyle.default}>
          Default Button
        </Button>
        <Button type="dashed" className={specStyle.dashed}>
          Dashed Button
        </Button>
        <Button type="text" className={specStyle.text}>
          Text Button
        </Button>
        <Button type="link" className={specStyle.link}>
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
    </Flex>
  );
};

export default App;
