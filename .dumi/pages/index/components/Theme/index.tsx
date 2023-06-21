import {
  BellOutlined,
  FolderOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import {
  Breadcrumb,
  Button,
  Card,
  ConfigProvider,
  Form,
  Layout,
  Menu,
  Radio,
  Space,
  Typography,
  theme,
} from 'antd';
import type { Color } from 'antd/es/color-picker';
import { generateColor } from 'antd/es/color-picker/util';
import * as React from 'react';
import useLocale from '../../../../hooks/useLocale';
import useSiteToken from '../../../../hooks/useSiteToken';
import SiteContext from '../../../../theme/slots/SiteContext';
import Group from '../Group';
import { useCarouselStyle } from '../util';
import BackgroundImage from './BackgroundImage';
import ColorPicker from './ColorPicker';
import MobileCarousel from './MobileCarousel';
import RadiusPicker from './RadiusPicker';
import type { THEME } from './ThemePicker';
import ThemePicker from './ThemePicker';
import { DEFAULT_COLOR, PINK_COLOR, getAvatarURL, getClosetColor } from './colorUtil';

const { Header, Content, Sider } = Layout;

const TokenChecker = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Demo Token:', theme.useToken());
  }
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
    toDef: '深度定制',
    toUse: '去使用',
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
    toDef: 'More',
    toUse: 'Apply',
  },
};

// ============================= Style =============================
const useStyle = () => {
  const { token } = useSiteToken();
  const { carousel } = useCarouselStyle();

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
      background: #000;
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
      margin-inline-start: auto;
    `,

    darkSideMenu: css``,

    header: css`
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${token.colorSplit};
      padding-inline: ${token.paddingLG}px !important;
      height: ${token.controlHeightLG * 1.2}px;
      line-height: ${token.controlHeightLG * 1.2}px;
    `,

    headerDark: css`
      border-bottom-color: rgba(255, 255, 255, 0.1);
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

      h1 {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
      }
    `,

    logoImg: css`
      width: 30px;
      height: 30px;
      overflow: hidden;

      img {
        width: 30px;
        height: 30px;
        vertical-align: top;
      }
    `,

    logoImgPureColor: css`
      img {
        transform: translate3d(-30px, 0, 0);
      }
    `,

    transBg: css`
      background: transparent !important;
    `,

    form: css`
      width: 800px;
      margin: 0 auto;
    `,
    carousel,
  };
};

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

function getTitleColor(colorPrimary: string | Color, isLight?: boolean) {
  if (!isLight) {
    return '#FFF';
  }

  const color = generateColor(colorPrimary);
  const closestColor = getClosetColor(colorPrimary);

  switch (closestColor) {
    case DEFAULT_COLOR:
    case PINK_COLOR:
    case '#F2BD27':
      return undefined;

    default:
      return color.toHsb().b < 0.7 ? '#FFF' : undefined;
  }
}

interface ThemeData {
  themeType: THEME;
  colorPrimary: string | Color;
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
    colorPrimary: PINK_COLOR,
    borderRadius: 16,
  },
};

export default function Theme() {
  const style = useStyle();
  const { token } = useSiteToken();
  const [locale] = useLocale(locales);

  const [themeData, setThemeData] = React.useState<ThemeData>(ThemeDefault);

  const onThemeChange = (_: Partial<ThemeData>, nextThemeData: ThemeData) => {
    setThemeData(nextThemeData);
  };

  const { compact, themeType, colorPrimary, ...themeToken } = themeData;
  const isLight = themeType !== 'dark';
  const [form] = Form.useForm();
  const { isMobile } = React.useContext(SiteContext);
  const colorPrimaryValue = React.useMemo(
    () => (typeof colorPrimary === 'string' ? colorPrimary : colorPrimary.toHexString()),
    [colorPrimary],
  );

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

  // ================================ Tokens ================================
  const closestColor = getClosetColor(colorPrimaryValue);

  const [backgroundColor, avatarColor] = React.useMemo(() => {
    let bgColor = 'transparent';

    const mapToken = theme.defaultAlgorithm({
      ...theme.defaultConfig.token,
      colorPrimary: colorPrimaryValue,
    });

    if (themeType === 'dark') {
      bgColor = '#393F4A';
    } else if (closestColor === DEFAULT_COLOR) {
      bgColor = '#F5F8FF';
    } else {
      bgColor = mapToken.colorPrimaryHover;
    }

    return [bgColor, mapToken.colorPrimaryBgHover];
  }, [themeType, closestColor, colorPrimaryValue]);

  const logoColor = React.useMemo(() => {
    const hsb = generateColor(colorPrimaryValue).toHsb();
    hsb.b = Math.min(hsb.b, 0.7);

    return generateColor(hsb).toHexString();
  }, [colorPrimaryValue]);

  // ================================ Render ================================
  const themeNode = (
    <ConfigProvider
      theme={{
        token: {
          ...themeToken,
          ...(isLight
            ? {}
            : {
                // colorBgContainer: '#474C56',
                // colorBorderSecondary: 'rgba(255,255,255,0.06)',
              }),
          colorPrimary: colorPrimaryValue,
        },
        hashed: true,
        algorithm: algorithmFn,
        components: {
          Slider: {
            // 1677FF
          },
          Card: isLight
            ? {}
            : {
                // colorBgContainer: '#474C56',
              },
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
                itemBg: 'transparent',
                subMenuItemBg: 'transparent',
                colorActiveBarWidth: 0,
              }
            : {
                // colorItemBg: 'transparent',
                // colorSubItemBg: 'transparent',
                // colorItemBgActive: 'rgba(255,255,255,0.2)',
                // colorItemBgSelected: 'rgba(255,255,255,0.2)',
              },
        },
      }}
    >
      <TokenChecker />
      <div
        css={[
          style.demo,
          isLight && closestColor !== DEFAULT_COLOR && style.otherDemo,
          !isLight && style.darkDemo,
        ]}
        style={{ borderRadius: themeData.borderRadius }}
      >
        <Layout css={style.transBg}>
          <Header css={[style.header, style.transBg, !isLight && style.headerDark]}>
            {/* Logo */}
            <div css={style.logo}>
              <div css={[style.logoImg, closestColor !== DEFAULT_COLOR && style.logoImgPureColor]}>
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  style={{
                    filter:
                      closestColor === DEFAULT_COLOR
                        ? undefined
                        : `drop-shadow(30px 0 0 ${logoColor})`,
                  }}
                  alt=""
                />
              </div>
              <h1>Ant Design 5.0</h1>
            </div>

            <Space css={style.menu} size="middle">
              <BellOutlined />
              <QuestionCircleOutlined />
              <div
                css={[style.avatar, themeType === 'dark' && style.avatarDark]}
                style={{
                  backgroundColor: avatarColor,
                  backgroundImage: `url(${getAvatarURL(closestColor)})`,
                  backgroundSize: 'cover',
                  boxShadow: `0 0 2px rgba(0, 0, 0, 0.2)`,
                }}
              />
            </Space>
          </Header>
          <Layout css={style.transBg} hasSider>
            <Sider css={style.transBg} width={200} className="site-layout-background">
              <Menu
                mode="inline"
                css={[style.transBg, !isLight && style.darkSideMenu]}
                selectedKeys={['Themes']}
                openKeys={['Design']}
                style={{ height: '100%', borderRight: 0 }}
                items={sideMenuItems}
              />
            </Sider>
            <Layout css={style.transBg} style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item overlay={<Menu items={subMenuItems} />}>Design</Breadcrumb.Item>
                <Breadcrumb.Item>Themes</Breadcrumb.Item>
              </Breadcrumb>
              <Content>
                <Typography.Title level={2}>{locale.customizeTheme}</Typography.Title>
                <Card
                  title={locale.myTheme}
                  extra={
                    <Space>
                      <Button type="default">{locale.toDef}</Button>
                      <Button type="primary">{locale.toUse}</Button>
                    </Space>
                  }
                >
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
  const leftTopImageStyle = {
    left: '50%',
    transform: 'translate3d(-900px, 0, 0)',
    top: -100,
    height: 500,
  };
  const rightBottomImageStyle = {
    right: '50%',
    transform: 'translate3d(750px, 0, 0)',
    bottom: -100,
    height: 287,
  };

  return isMobile ? (
    <MobileCarousel title={locale.themeTitle} description={locale.themeDesc} id="flexible" />
  ) : (
    <Group
      title={locale.themeTitle}
      titleColor={getTitleColor(colorPrimaryValue, isLight)}
      description={locale.themeDesc}
      id="flexible"
      background={backgroundColor}
      decoration={
        // =========================== Theme Background ===========================
        <>
          {/* >>>>>> Default <<<<<< */}
          <div
            style={{
              transition: `all ${token.motionDurationSlow}`,
              opacity: isLight && closestColor === DEFAULT_COLOR ? 1 : 0,
            }}
          >
            {/* Image Left Top */}
            <img
              style={{
                ...posStyle,
                ...leftTopImageStyle,
              }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg"
              alt=""
            />
            {/* Image Right Bottom */}
            <img
              style={{
                ...posStyle,
                ...rightBottomImageStyle,
              }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/84ad805a-74cb-4916-b7ba-9cdc2bdec23a.svg"
              alt=""
            />
          </div>

          {/* >>>>>> Dark <<<<<< */}
          <div
            style={{
              transition: `all ${token.motionDurationSlow}`,
              opacity: !isLight || !closestColor ? 1 : 0,
            }}
          >
            {/* Image Left Top */}
            <img
              style={{ ...posStyle, left: 0, top: -100, height: 500 }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/a213184a-f212-4afb-beec-1e8b36bb4b8a.svg"
              alt=""
            />
            {/* Image Right Bottom */}
            <img
              style={{ ...posStyle, right: 0, bottom: -100, height: 287 }}
              src="https://gw.alipayobjects.com/zos/bmw-prod/bb74a2fb-bff1-4d0d-8c2d-2ade0cd9bb0d.svg"
              alt=""
            />
          </div>

          {/* >>>>>> Background Image <<<<<< */}
          <BackgroundImage isLight={isLight} colorPrimary={colorPrimaryValue} />
        </>
      }
    >
      {themeNode}
    </Group>
  );
}
