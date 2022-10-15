import * as React from 'react';
import { css } from '@emotion/react';
import {
  HomeOutlined,
  FolderOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import {
  Typography,
  Layout,
  Menu,
  Breadcrumb,
  MenuProps,
  Space,
  ConfigProvider,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Segmented,
  theme,
} from 'antd';

const { Header, Content, Sider } = Layout;

const locales = {
  cn: {
    titlePrimaryColor: '主色',
    titleBorderRadius: '圆角',
    titleTheme: '主题',
  },
  en: { titlePrimaryColor: '主色', titleBorderRadius: '圆角', titleTheme: '主题' },
};

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    demo: css`
      border-radius: 8px;
      overflow: hidden;
      background: rgba(250, 250, 250, 0.8);
      backdrop-filter: blur(3px);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    `,

    darkDemo: css`
      // background: green;
    `,

    menu: css`
      margin-left: auto;
    `,

    header: css`
      display: flex;
      align-items: center;
      border-bottom: 1px solid red;
    `,

    logo: css`
      height: 40px;
    `,

    side: css`
      .ant-menu-item {
        width: auto;
        margin: 0 4px;
        border-radius: 8px;
      }
    `,

    form: css`
      width: 500px;
      margin: 0 auto;
    `,
  };
};

interface PickerProps {
  title: React.ReactNode;
}

const subMenuItems: MenuProps['items'] = [
  {
    key: `Design Values`,
    label: `Design Values`,
  },
  {
    key: `Global Styles`,
    label: `Global Styles`,
  },
  {
    key: `Themes`,
    label: `Themes`,
  },
  {
    key: `DesignPatterns`,
    label: `Design Patterns`,
  },
];

const sideMenuItems: MenuProps['items'] = [
  {
    key: `Design`,
    label: `Design`,
    icon: <FolderOutlined />,
    children: subMenuItems,
  },
  {
    key: `Development`,
    label: `Development`,
    icon: <FolderOutlined />,
  },
];

interface ThemeData {
  colorPrimary: string;
  radiusBase: number;
  compact: 'default' | 'compact';
  algorithm: 'light' | 'dark';
}

export default function Theme() {
  const style = useStyle();
  const [locale] = useLocale(locales);

  const [themeData, setThemeData] = React.useState<ThemeData>({
    colorPrimary: '#1677FF',
    radiusBase: 6,
    compact: 'default',
    algorithm: 'light',
  });

  const onThemeChange = (_: Partial<ThemeData>, nextThemeData: ThemeData) => {
    setThemeData(nextThemeData);
  };

  const { algorithm, compact, ...token } = themeData;
  const isLight = algorithm === 'light';

  // ================================ Render ================================
  return (
    <ConfigProvider
      theme={{
        token: {
          ...token,
        },
        hashed: true,
        algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Layout: isLight
            ? {
                colorBgHeader: 'transparent',
                colorBgBody: 'transparent',
              }
            : {
                // colorBgBody: 'transparent',
              },
          Menu: isLight
            ? {
                colorItemBg: 'transparent',
                colorSubItemBg: 'transparent',
                colorActiveBarWidth: 0,
              }
            : {},
        },
      }}
    >
      <div css={[style.demo, !isLight && style.darkDemo]}>
        <Layout>
          <Header css={style.header}>
            <img
              css={style.logo}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <Space css={style.menu}>
              <BellOutlined />
              <QuestionCircleOutlined />
            </Space>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                css={style.side}
                selectedKeys={['Themes']}
                openKeys={['Design']}
                style={{ height: '100%', borderRight: 0 }}
                items={sideMenuItems}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item overlay={<Menu items={subMenuItems} />}>Design</Breadcrumb.Item>
                <Breadcrumb.Item>Themes</Breadcrumb.Item>
              </Breadcrumb>
              <Content>
                <Typography.Title level={2}>Customize Theme</Typography.Title>
                <Card title="My Theme">
                  <Form
                    initialValues={themeData}
                    onValuesChange={onThemeChange}
                    labelCol={{ span: 8 }}
                    css={style.form}
                  >
                    <Form.Item label="Primary Color" name="colorPrimary">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Border Radius" name="radiusBase">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="宽松度" name="compact">
                      <Radio.Group>
                        <Radio value="default">Default</Radio>
                        <Radio value="compact">Compact</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="主题" name="algorithm">
                      <Segmented
                        options={[
                          {
                            value: 'light',
                            label: 'Light',
                          },
                          {
                            value: 'dark',
                            label: 'Dark',
                          },
                        ]}
                      />
                    </Form.Item>
                  </Form>
                </Card>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
