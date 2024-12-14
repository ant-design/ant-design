import * as React from 'react';
import { defaultAlgorithm, defaultTheme } from '@ant-design/compatible';
import {
  BellOutlined,
  FolderOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import type { ColorPickerProps, GetProp, MenuProps, ThemeConfig } from 'antd';
import {
  Breadcrumb,
  Card,
  ConfigProvider,
  Flex,
  Form,
  Layout,
  Menu,
  Radio,
  theme,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import { generateColor } from 'antd/es/color-picker/util';
import classNames from 'classnames';
import { useLocation } from 'dumi';

import useDark from '../../../../hooks/useDark';
import useLocale from '../../../../hooks/useLocale';
import LinkButton from '../../../../theme/common/LinkButton';
import SiteContext from '../../../../theme/slots/SiteContext';
import { getLocalizedPathname } from '../../../../theme/utils';
import Group from '../Group';
import { getCarouselStyle } from '../util';
import BackgroundImage from './BackgroundImage';
import ColorPicker from './ColorPicker';
import { DEFAULT_COLOR, getAvatarURL, getClosetColor, PINK_COLOR } from './colorUtil';
import MobileCarousel from './MobileCarousel';
import RadiusPicker from './RadiusPicker';
import type { THEME } from './ThemePicker';
import ThemePicker from './ThemePicker';

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

const { Header, Content, Sider } = Layout;

const TokenChecker: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
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
const useStyle = createStyles(({ token, css, cx }) => {
  const { carousel } = getCarouselStyle();
  const demo = css`
    overflow: hidden;
    background: rgba(240, 242, 245, 0.25);
    backdrop-filter: blur(50px);
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    transition: all ${token.motionDurationSlow};
  `;

  return {
    demo,

    otherDemo: css`
      &.${cx(demo)} {
        backdrop-filter: blur(10px);
        background: rgba(247, 247, 247, 0.5);
      }
    `,

    darkDemo: css`
      &.${cx(demo)} {
        background: #000;
      }
    `,

    larkDemo: css`
      &.${cx(demo)} {
        // background: #f7f7f7;
        background: rgba(240, 242, 245, 0.65);
      }
    `,
    comicDemo: css`
      &.${cx(demo)} {
        // background: #ffe4e6;
        background: rgba(240, 242, 245, 0.65);
      }
    `,

    menu: css`
      margin-inline-start: auto;
    `,

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
      background-size: cover;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
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
        font-size: ${token.fontSizeLG}px;
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

    transBg: css`
      background: transparent !important;
    `,

    form: css`
      width: 100%;
      margin: 0 auto;
    `,
    pos: css`
      position: absolute;
    `,
    leftTopImagePos: css`
      inset-inline-start: 0;
      top: -100px;
      height: 500px;
    `,
    rightBottomPos: css`
      inset-inline-end: 0;
      bottom: -100px;
      height: 287px;
    `,
    leftTopImage: css`
      inset-inline-start: 50%;
      transform: translate3d(-900px, 0, 0);
      top: -100px;
      height: 500px;
    `,
    rightBottomImage: css`
      inset-inline-end: 50%;
      transform: translate3d(750px, 0, 0);
      bottom: -100px;
      height: 287px;
    `,
    motion: css`
      transition: all ${token.motionDurationSlow};
    `,
    op1: css`
      opacity: 1;
    `,
    op0: css`
      opacity: 0;
    `,
    carousel,
  };
});

// ========================== Menu Config ==========================
const subMenuItems = [
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

function getTitleColor(colorPrimary: Color, isLight?: boolean) {
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

    case '#5A54F9':
    case '#E0282E':
      return '#FFF';

    default:
      return color.toHsb().b < 0.7 ? '#FFF' : undefined;
  }
}

interface ThemeData {
  themeType: THEME;
  colorPrimary: Color;
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
  v4: {
    ...defaultTheme.token,
  },
};

const normalize = (value: number) => value / 255;

function rgbToColorMatrix(color: string) {
  const rgb = new TinyColor(color).toRgb();
  const { r, g, b } = rgb;

  const invertValue = normalize(r) * 100;
  const sepiaValue = 100;
  const saturateValue = Math.max(normalize(r), normalize(g), normalize(b)) * 10000;
  const hueRotateValue =
    ((Math.atan2(
      Math.sqrt(3) * (normalize(g) - normalize(b)),
      2 * normalize(r) - normalize(g) - normalize(b),
    ) *
      180) /
      Math.PI +
      360) %
    360;

  return `invert(${invertValue}%) sepia(${sepiaValue}%) saturate(${saturateValue}%) hue-rotate(${hueRotateValue}deg)`;
}

const Theme: React.FC = () => {
  const { styles } = useStyle();
  const [locale, lang] = useLocale(locales);
  const isZhCN = lang === 'cn';
  const { search } = useLocation();

  const [themeData, setThemeData] = React.useState<ThemeData>(ThemeDefault);

  const onThemeChange = (_: Partial<ThemeData>, nextThemeData: ThemeData) => {
    React.startTransition(() => {
      setThemeData({ ...ThemesInfo[nextThemeData.themeType], ...nextThemeData });
    });
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

    if (themeType === 'v4') {
      algorithms.push(defaultAlgorithm);
    }

    return algorithms;
  }, [isLight, compact, themeType]);

  // ================================ Themes ================================
  React.useEffect(() => {
    const mergedData = {
      ...ThemeDefault,
      themeType,
      ...ThemesInfo[themeType],
    };

    setThemeData(mergedData);
    form.setFieldsValue(mergedData);
  }, [themeType]);

  const isRootDark = useDark();

  React.useEffect(() => {
    onThemeChange({}, { ...themeData, themeType: isRootDark ? 'dark' : 'default' });
  }, [isRootDark]);

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

  const memoTheme = React.useMemo<ThemeConfig>(
    () => ({
      token: { ...themeToken, colorPrimary: colorPrimaryValue },
      algorithm: algorithmFn,
      components: {
        Layout: isLight
          ? {
              headerBg: 'transparent',
              bodyBg: 'transparent',
            }
          : {},
        Menu: isLight
          ? {
              itemBg: 'transparent',
              subMenuItemBg: 'transparent',
              activeBarBorderWidth: 0,
            }
          : {},
        ...(themeType === 'v4' ? defaultTheme.components : {}),
      },
    }),
    [themeToken, colorPrimaryValue, algorithmFn, themeType],
  );

  // ================================ Render ================================
  const themeNode = (
    <ConfigProvider theme={memoTheme}>
      <TokenChecker />
      <div
        className={classNames(styles.demo, {
          [styles.otherDemo]: isLight && closestColor !== DEFAULT_COLOR && styles.otherDemo,
          [styles.darkDemo]: !isLight,
        })}
        style={{ borderRadius: themeData.borderRadius }}
      >
        <Layout className={styles.transBg}>
          <Header
            className={classNames(styles.header, styles.transBg, !isLight && styles.headerDark)}
          >
            {/* Logo */}
            <div className={styles.logo}>
              <div className={styles.logoImg}>
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  style={{
                    filter:
                      closestColor === DEFAULT_COLOR ? undefined : rgbToColorMatrix(logoColor),
                  }}
                  alt="antd logo"
                />
              </div>
              <h1>Ant Design 5.0</h1>
            </div>
            <Flex className={styles.menu} gap="middle">
              <BellOutlined />
              <QuestionCircleOutlined />
              <div
                className={classNames(styles.avatar, { [styles.avatarDark]: themeType === 'dark' })}
                style={{
                  backgroundColor: avatarColor,
                  backgroundImage: `url(${getAvatarURL(closestColor)})`,
                }}
              />
            </Flex>
          </Header>
          <Layout className={styles.transBg} hasSider>
            <Sider className={classNames(styles.transBg)} width={200}>
              <Menu
                mode="inline"
                className={classNames(styles.transBg)}
                selectedKeys={['Themes']}
                openKeys={['Design']}
                style={{ height: '100%', borderRight: 0 }}
                items={sideMenuItems}
                expandIcon={false}
              />
            </Sider>
            <Layout className={styles.transBg} style={{ padding: '0 24px 24px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                  { title: <HomeOutlined /> },
                  { title: 'Design', menu: { items: subMenuItems } },
                  { title: 'Themes' },
                ]}
              />
              <Content>
                <Typography.Title level={2}>{locale.customizeTheme}</Typography.Title>
                <Card
                  title={locale.myTheme}
                  extra={
                    <Flex gap="small">
                      <LinkButton to={getLocalizedPathname('/theme-editor', isZhCN, search)}>
                        {locale.toDef}
                      </LinkButton>
                      <LinkButton
                        type="primary"
                        to={getLocalizedPathname('/docs/react/customize-theme', isZhCN, search)}
                      >
                        {locale.toUse}
                      </LinkButton>
                    </Flex>
                  }
                >
                  <Form
                    form={form}
                    initialValues={themeData}
                    onValuesChange={onThemeChange}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    className={styles.form}
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
                    <Form.Item label={locale.titleCompact} name="compact" htmlFor="compact_default">
                      <Radio.Group
                        options={[
                          { label: locale.default, value: 'default', id: 'compact_default' },
                          { label: locale.compact, value: 'compact' },
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
            className={classNames(
              styles.motion,
              isLight && closestColor === DEFAULT_COLOR ? styles.op1 : styles.op0,
            )}
          >
            {/* Image Left Top */}
            <img
              className={classNames(styles.pos, styles.leftTopImage)}
              src="https://gw.alipayobjects.com/zos/bmw-prod/bd71b0c6-f93a-4e52-9c8a-f01a9b8fe22b.svg"
              alt=""
            />
            {/* Image Right Bottom */}
            <img
              className={classNames(styles.pos, styles.rightBottomImage)}
              src="https://gw.alipayobjects.com/zos/bmw-prod/84ad805a-74cb-4916-b7ba-9cdc2bdec23a.svg"
              alt=""
            />
          </div>
          {/* >>>>>> Dark <<<<<< */}
          <div
            className={classNames(
              styles.motion,
              !isLight || !closestColor ? styles.op1 : styles.op0,
            )}
          >
            {/* Image Left Top */}
            <img
              className={classNames(styles.pos, styles.leftTopImagePos)}
              src="https://gw.alipayobjects.com/zos/bmw-prod/a213184a-f212-4afb-beec-1e8b36bb4b8a.svg"
              alt=""
            />
            {/* Image Right Bottom */}
            <img
              className={classNames(styles.pos, styles.rightBottomPos)}
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
};

export default Theme;
