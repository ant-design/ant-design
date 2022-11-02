import * as React from 'react';
import { css } from '@emotion/react';
import {
  HomeOutlined,
  FolderOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import useLocale from '../../../../hooks/useLocale';
import useSiteToken from '../../../../hooks/useSiteToken';
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
  theme,
} from 'antd';
import ThemePicker, { THEME } from './ThemePicker';
import ColorPicker from './ColorPicker';
import RadiusPicker from './RadiusPicker';
import Group from '../Group';
import BackgroundImage from './BackgroundImage';
import { PRESET_COLORS, getClosetColor } from './colorUtil';

const { Header, Content, Sider } = Layout;

const TokenChecker = () => {
  console.log('Demo Token:', theme.useToken());
  return null;
};

// ============================= Theme =============================
const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: 'Ant Design 5.0 开放更多样式算法，让你定制主题更简单',

    customizeTheme: '定制主题',
    myTheme: '我的主题',
    titlePrimaryColor: '主色',
    titleBorderRadius: '圆角',
    titleCompact: '宽松度',
    default: '默认',
    compact: '紧凑',
    titleTheme: '主题',
    light: '亮色',
    dark: '暗黑',
  },
  en: {
    themeTitle: 'Flexible theme customization',
    themeDesc: 'Ant Design 5.0 enable extendable algorithm, make custom theme easier',

    customizeTheme: 'Customize Theme',
    myTheme: 'My Theme',
    titlePrimaryColor: 'Primary Color',
    titleBorderRadius: 'Border Radius',
    titleCompact: 'Compact',
    titleTheme: 'Theme',
    default: 'Default',
    compact: 'Compact',
    light: 'Light',
    dark: 'Dark',
  },
};

// ============================= Style =============================
const useStyle = () => {
  const { token } = useSiteToken();

  return {
    demo: css`
      overflow: hidden;
      background: rgba(240, 242, 245, 0.25);
      backdrop-filter: blur(50px);
      box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
      transition: all ${token.motionDurationSlow};
    `,

    otherDemo: css`
      backdrop-filter: blur(10px);
      background: rgba(247, 247, 247, 0.5);
    `,

    darkDemo: css`
      // background: green;
    `,

    larkDemo: css`
      // background: #f7f7f7;
      background: rgba(240, 242, 245, 0.65);
    `,
    comicDemo: css`
      // background: #ffe4e6;
      background: rgba(240, 242, 245, 0.65);
    `,

    menu: css`
      margin-left: auto;
    `,

    header: css`
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${token.colorSplit};
      padding-inline: ${token.paddingLG}px !important;
      height: ${token.controlHeightLG * 1.2}px;
      line-height: ${token.controlHeightLG * 1.2}px;
    `,

    avatar: css`
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
      border-radius: 100%;
      background: rgba(240, 240, 240, 0.75);
    `,

    avatarDark: css`
      background: rgba(200, 200, 200, 0.3);
    `,

    logo: css`
      display: flex;
      align-items: center;
      column-gap: ${token.padding}px;

      img {
        height: 30px;
      }

      h1 {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
      }
    `,

    side: css``,

    form: css`
      width: 800px;
      margin: 0 auto;
    `,
  };
};

interface PickerProps {
  title: React.ReactNode;
}

// ========================== Menu Config ==========================
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

// ============================= Theme =============================

function getTitleColor(isLight?: boolean, colorPrimary?: string) {
  if (!isLight) {
    return '#FFF';
  }

  const color = getClosetColor(colorPrimary);

  switch (color) {
    case '#FB7299':
    case '#F2BD27':
      return undefined;

    default:
      return '#FFF';
  }
}

interface ThemeData {
  themeType: THEME;
  colorPrimary: string;
  borderRadius: number;
  compact: 'default' | 'compact';
}

const ThemeDefault: ThemeData = {
  themeType: 'default',
  colorPrimary: '#1677FF',
  borderRadius: 6,
  compact: 'default',
};

const ThemesInfo: Record<THEME, Partial<ThemeData>> = {
  default: {},
  dark: {
    borderRadius: 2,
  },
  lark: {
    colorPrimary: '#00B96B',
    borderRadius: 4,
  },
  comic: {
    colorPrimary: '#fb7299',
    borderRadius: 16,
  },
};

const ThemeBackground: Record<THEME, string> = {
  default: '#F5F8FF',
  dark: '#393F4A',
  lark: 'transparent',
  comic: 'transparent',
};

export default function Theme() {
  const style = useStyle();
  const { token } = useSiteToken();
  const [locale] = useLocale(locales);

  const [themeData, setThemeData] = React.useState<ThemeData>(ThemeDefault);

  const onThemeChange = (_: Partial<ThemeData>, nextThemeData: ThemeData) => {
    setThemeData(nextThemeData);
  };

  const { compact, themeType, ...themeToken } = themeData;
  const isLight = themeType !== 'dark';
  const [form] = Form.useForm();

  // const algorithmFn = isLight ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const algorithmFn = React.useMemo(() => {
    const algorithms = [isLight ? theme.defaultAlgorithm : theme.darkAlgorithm];

    if (compact === 'compact') {
      algorithms.push(theme.compactAlgorithm);
    }

    return algorithms;
  }, [isLight, compact]);

  // ================================ Themes ================================
  React.useEffect(() => {
    const mergedData = {
      ...ThemeDefault,
      themeType,
      ...ThemesInfo[themeType],
    } as any;

    setThemeData(mergedData);
    form.setFieldsValue(mergedData);
  }, [themeType]);

  // ================================ Render ================================
  const closestColor = getClosetColor(themeData.colorPrimary);

  const themeNode = (
    <ConfigProvider
      theme={{
        token: {
          ...themeToken,
        },
        hashed: true,
        algorithm: algorithmFn,
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
      <TokenChecker />
      <div
        css={[
          style.demo,
          isLight && closestColor !== '#1677FF' && style.otherDemo,
          !isLight && style.darkDemo,
        ]}
        style={{ borderRadius: themeData.borderRadius }}
      >
        <Layout>
          <Header css={style.header}>
            {/* Logo */}
            <div css={style.logo}>
              <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              <h1>Ant Design 5.0</h1>
            </div>

            <Space css={style.menu} size="middle">
              <BellOutlined />
              <QuestionCircleOutlined />
              <div css={[style.avatar, themeType === 'dark' && style.avatarDark]} />
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
                <Typography.Title level={2}>{locale.customizeTheme}</Typography.Title>
                <Card title={locale.myTheme}>
                  <Form
                    form={form}
                    initialValues={themeData}
                    onValuesChange={onThemeChange}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    css={style.form}
                  >
                    <Form.Item label={locale.titleTheme} name="themeType">
                      <ThemePicker />
                    </Form.Item>

                    <Form.Item label={locale.titlePrimaryColor} name="colorPrimary">
                      <ColorPicker />
                    </Form.Item>
                    <Form.Item label={locale.titleBorderRadius} name="borderRadius">
                      <RadiusPicker />
                    </Form.Item>
                    <Form.Item label={locale.titleCompact} name="compact">
                      <Radio.Group>
                        <Radio value="default">{locale.default}</Radio>
                        <Radio value="compact">{locale.compact}</Radio>
                      </Radio.Group>
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

  const posStyle: React.CSSProperties = {
    position: 'absolute',
  };

  return (
    <Group
      title={locale.themeTitle}
      titleColor={getTitleColor(isLight, themeData.colorPrimary)}
      description={locale.themeDesc}
      id="flexible"
      background={ThemeBackground[themeType]}
      decoration={
        // =========================== Theme Background ===========================
        <>
          {/* >>>>>> Default <<<<<< */}
          <div
            style={{
              transition: `all ${token.motionDurationSlow}`,
              opacity: themeType === 'default' ? 1 : 0,
            }}
          >
            {/* Image Left Top */}
            <img
              style={{
                ...posStyle,
                left: '50%',
                transform: 'translateX(-900px)',
                top: -100,
                height: 500,
              }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg"
            />
            {/* Image Right Bottom */}
            <img
              style={{
                ...posStyle,
                right: '50%',
                transform: 'translateX(750px)',
                bottom: -100,
                height: 287,
              }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/84ad805a-74cb-4916-b7ba-9cdc2bdec23a.svg"
            />
          </div>

          {/* >>>>>> Dark <<<<<< */}
          <div
            style={{
              transition: `all ${token.motionDurationSlow}`,
              opacity: themeType === 'dark' ? 1 : 0,
            }}
          >
            {/* Image Left Top */}
            <img
              style={{ ...posStyle, left: 0, top: -100, height: 500 }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/a213184a-f212-4afb-beec-1e8b36bb4b8a.svg"
            />
            {/* Image Right Bottom */}
            <img
              style={{ ...posStyle, right: 0, bottom: -100, height: 287 }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/bb74a2fb-bff1-4d0d-8c2d-2ade0cd9bb0d.svg"
            />
          </div>

          {/* >>>>>> Background Image <<<<<< */}
          <BackgroundImage isLight={isLight} colorPrimary={themeData.colorPrimary} />
        </>
      }
    >
      {themeNode}
    </Group>
  );
}
