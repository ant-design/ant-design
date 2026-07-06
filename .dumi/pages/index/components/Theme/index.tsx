import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BellOutlined,
  CalendarOutlined,
  ColumnHeightOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  FolderOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import type { ConfigProviderProps, MenuProps, TableProps } from 'antd';
import {
  App,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Input,
  Layout,
  Menu,
  Row,
  Segmented,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  theme,
  Typography,
} from 'antd';
import { createStaticStyles } from 'antd-style';
import { generateColor } from 'antd/es/color-picker/util';
import { clsx } from 'clsx';

import type { PreviewThemeConfig } from '../ThemePreview/previewThemes';
import { DEFAULT_COLOR } from '../ThemePreview/previewThemes';

const { Header, Content, Sider } = Layout;

// ============================= Style =============================
const styles = createStaticStyles(({ cssVar, css, cx }) => {
  const demo = css`
    overflow: hidden;
    background: rgba(240, 242, 245, 0.25);
    backdrop-filter: blur(50px);
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.1);
    transition: all ${cssVar.motionDurationSlow};
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

    menu: css`
      margin-inline-start: auto;
    `,

    header: css`
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${cssVar.colorSplit};
      padding-inline: ${cssVar.paddingLG} !important;
      height: calc(${cssVar.controlHeightLG} * 1.2);
      line-height: calc(${cssVar.controlHeightLG} * 1.2);
    `,

    headerDark: css`
      border-bottom-color: rgba(255, 255, 255, 0.1);
    `,

    avatar: css`
      width: 28px;
      height: 28px;
      border-radius: 100%;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    `,

    avatarDark: css`
      background: rgba(200, 200, 200, 0.3);
    `,

    logo: css`
      display: flex;
      align-items: center;
      column-gap: ${cssVar.padding};

      h1 {
        font-weight: 400;
        font-size: ${cssVar.fontSizeLG};
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
    dashboardShell: css`
      width: 100%;
      min-height: 480px;
      overflow: hidden;
      transition: all ${cssVar.motionDurationSlow};

      .ant-card {
        height: 100%;
      }

      .ant-card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
    dashboardToolbar: css`
      margin-block-end: ${cssVar.marginMD};
    `,
    dashboardTabs: css`
      padding: 3px;
      border-radius: 999px;

      .ant-segmented-item {
        min-width: 96px;
        border-radius: 999px;
        font-weight: 600;
      }

      .ant-segmented-thumb {
        border-radius: 999px;
      }
    `,
    dashboardStatValue: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${cssVar.marginSM};
    `,
    dashboardStatTrend: css`
      margin-inline-start: auto;
      border: 0;
      font-weight: 600;
    `,
    dashboardPanelTitle: css`
      margin: 0 !important;
    `,
    dashboardKpiGrid: css`
      margin-block-end: ${cssVar.marginMD};
    `,
    dashboardTableCard: css`
      margin-block-start: ${cssVar.marginMD};
    `,
    dashboardTableActions: css`
      margin-block: ${cssVar.marginMD};
    `,
    dashboardEmployee: css`
      min-width: 0;
    `,
    dashboardEmployeeMeta: css`
      line-height: 1.3;
    `,
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

const normalize = (value: number) => value / 255;

function rgbToColorMatrix(color: string) {
  const rgb = new FastColor(color).toRgb();
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

export interface ThemeDashboardProps {
  className?: string;
  config?: ConfigProviderProps;
  style?: React.CSSProperties;
  activeTheme?: PreviewThemeConfig;
}

const dashboardKpis = [
  { title: 'Revenue', value: 228441, prefix: 'US$', trend: 3.3, status: 'success' },
  { title: 'Expenses', value: 25108, prefix: 'US$', trend: 3.3, status: 'error' },
  { title: 'Sales', value: 458, prefix: '', trend: 3.3, status: 'success' },
  { title: 'Profit', value: 203133, prefix: 'US$', trend: 4.1, status: 'success' },
] as const;

interface EmployeeRecord {
  key: string;
  id: string;
  avatar: string;
  email: string;
  member: string;
  role: string;
  type: string;
}

const employeeData: EmployeeRecord[] = [
  {
    key: '1',
    id: '#4586936',
    avatar: 'linear-gradient(135deg, #69c0ff, #9254de)',
    email: 'alex@acme.com',
    member: 'Alex Turner',
    role: 'Product Manager',
    type: 'Employee',
  },
  {
    key: '2',
    id: '#4586937',
    avatar: 'linear-gradient(135deg, #ffadd2, #eb2f96)',
    email: 'emma@acme.com',
    member: 'Emma Davis',
    role: 'Senior Designer',
    type: 'Employee',
  },
  {
    key: '3',
    id: '#4586933',
    avatar: 'linear-gradient(135deg, #b5f5ec, #1677ff)',
    email: 'john@acme.com',
    member: 'John Smith',
    role: 'Chief Technology Officer',
    type: 'Employee',
  },
  {
    key: '4',
    id: '#4586932',
    avatar: 'linear-gradient(135deg, #d3f261, #5cdbd3)',
    email: 'kate@acme.com',
    member: 'Kate Moore',
    role: 'Chief Executive Officer',
    type: 'Employee',
  },
];

const employeeColumns: TableProps<EmployeeRecord>['columns'] = [
  {
    title: 'Worker ID',
    dataIndex: 'id',
    width: 150,
    render: (id: string) => <Typography.Text strong>{id}</Typography.Text>,
  },
  {
    title: 'Member',
    dataIndex: 'member',
    render: (_: string, record) => (
      <Flex align="center" gap="middle" className={styles.dashboardEmployee}>
        <Avatar size={40} style={{ background: record.avatar }} />
        <div className={styles.dashboardEmployeeMeta}>
          <Typography.Text strong>{record.member}</Typography.Text>
          <br />
          <Typography.Text type="secondary">{record.email}</Typography.Text>
        </div>
      </Flex>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Worker Type',
    dataIndex: 'type',
    width: 160,
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 148,
    align: 'right',
    render: () => (
      <Space size="small">
        <Button shape="circle" icon={<EyeOutlined />} />
        <Button shape="circle" icon={<EditOutlined />} />
        <Button danger shape="circle" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

function getDashboardConfig(config?: ConfigProviderProps): ConfigProviderProps {
  if (!config) {
    return {
      theme: {
        algorithm: theme.defaultAlgorithm,
        inherit: false,
      },
    };
  }

  const { theme: configTheme, ...restConfig } = config;

  return {
    ...restConfig,
    theme: {
      ...configTheme,
      inherit: false,
    },
  };
}

interface ThemeDashboardLayoutProps {
  className?: string;
  isDarkTheme: boolean;
  style?: React.CSSProperties;
  activeTheme?: PreviewThemeConfig;
}

const ThemeDashboardLayout: React.FC<ThemeDashboardLayoutProps> = (props) => {
  const { className, isDarkTheme, style, activeTheme } = props;

  const { token } = theme.useToken();
  const closestColor = DEFAULT_COLOR;
  const hasDarkBackground = isDarkTheme || !!activeTheme?.bgImgDark;
  const menuTheme = hasDarkBackground ? 'dark' : 'light';
  const logoColor = React.useMemo(() => {
    const hsb = generateColor(token.colorPrimary).toHsb();
    hsb.b = Math.min(hsb.b, 0.7);
    return generateColor(hsb).toHexString();
  }, [token.colorPrimary]);

  return (
    <App style={{ width: '100%' }}>
      <div
        className={clsx(styles.demo, className, {
          [styles.otherDemo]:
            !hasDarkBackground && closestColor !== DEFAULT_COLOR && styles.otherDemo,
          [styles.darkDemo]: hasDarkBackground,
        })}
        style={style}
      >
        <Layout>
          <Header className={clsx(styles.header, hasDarkBackground && styles.headerDark)}>
            <div className={styles.logo}>
              <div className={styles.logoImg}>
                <img
                  draggable={false}
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  style={{
                    filter:
                      closestColor === DEFAULT_COLOR ? undefined : rgbToColorMatrix(logoColor),
                  }}
                  alt="antd logo"
                />
              </div>
              <h1>Ant Design</h1>
            </div>
            <Flex className={styles.menu} gap="middle">
              <BellOutlined />
              <QuestionCircleOutlined />
              <div
                className={styles.avatar}
                style={{
                  backgroundImage: activeTheme?.icon ? `url(${activeTheme.icon})` : undefined,
                }}
              />
            </Flex>
          </Header>
          <Layout hasSider>
            <Sider theme={menuTheme} width={200}>
              <Menu
                mode="inline"
                theme={menuTheme}
                selectedKeys={['Themes']}
                openKeys={['Design']}
                style={{ height: '100%', borderInlineEnd: 0 }}
                items={sideMenuItems}
                expandIcon={false}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                  { title: <HomeOutlined /> },
                  { title: 'Design', menu: { items: subMenuItems } },
                  { title: 'Themes' },
                ]}
              />
              <Content>
                <div className={styles.dashboardShell}>
                  <Flex
                    className={styles.dashboardToolbar}
                    justify="space-between"
                    align="center"
                    wrap
                    gap="middle"
                  >
                    <Segmented
                      className={styles.dashboardTabs}
                      defaultValue="Overview"
                      options={['Overview', 'Sales', 'Expenses']}
                    />
                    <Space>
                      <Button shape="circle" icon={<ReloadOutlined />} />
                      <Select
                        value="monthly"
                        style={{ width: 144 }}
                        options={[
                          {
                            value: 'monthly',
                            label: (
                              <Space size={6}>
                                <CalendarOutlined />
                                Monthly
                              </Space>
                            ),
                          },
                        ]}
                      />
                      <Button type="primary" icon={<DownloadOutlined />}>
                        Download
                      </Button>
                    </Space>
                  </Flex>

                  <Row gutter={[16, 16]} className={styles.dashboardKpiGrid}>
                    {dashboardKpis.map((item) => (
                      <Col key={item.title} xs={24} sm={12} lg={6}>
                        <Card>
                          <Typography.Text type="secondary">{item.title}</Typography.Text>
                          <div className={styles.dashboardStatValue}>
                            <Statistic
                              value={item.value}
                              formatter={(value) =>
                                `${item.prefix ?? ''}${Number(value).toLocaleString('en-US')}`
                              }
                            />
                            <Tag
                              className={styles.dashboardStatTrend}
                              color={item.status}
                              icon={
                                item.status === 'success' ? (
                                  <ArrowUpOutlined />
                                ) : (
                                  <ArrowDownOutlined />
                                )
                              }
                            >
                              {item.trend}%
                            </Tag>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card
                    className={styles.dashboardTableCard}
                    title={
                      <Space>
                        <Typography.Title level={4} className={styles.dashboardPanelTitle}>
                          All Employees
                        </Typography.Title>
                        <Tag>32</Tag>
                      </Space>
                    }
                    extra={<Input prefix={<SearchOutlined />} placeholder="Search..." />}
                  >
                    <Flex
                      className={styles.dashboardTableActions}
                      justify="space-between"
                      align="center"
                      wrap
                      gap="middle"
                    >
                      <Space wrap>
                        <Button icon={<FilterOutlined />}>Filter</Button>
                        <Button icon={<SortAscendingOutlined />}>Sort</Button>
                        <Button icon={<ColumnHeightOutlined />}>Columns</Button>
                      </Space>
                    </Flex>
                    <Table<EmployeeRecord>
                      columns={employeeColumns}
                      dataSource={employeeData}
                      pagination={false}
                      size="middle"
                      scroll={{ x: 900, y: 220 }}
                    />
                  </Card>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </App>
  );
};

export const ThemeDashboard: React.FC<ThemeDashboardProps> = (props) => {
  const { className, config, style, activeTheme } = props;
  const dashboardConfig = React.useMemo(() => getDashboardConfig(config), [config]);
  const isDarkTheme = React.useMemo(() => {
    const algorithm = config?.theme?.algorithm;
    const algorithms = Array.isArray(algorithm) ? algorithm : algorithm ? [algorithm] : [];
    return algorithms.includes(theme.darkAlgorithm);
  }, [config]);

  return (
    <ConfigProvider {...dashboardConfig}>
      <ThemeDashboardLayout
        className={className}
        activeTheme={activeTheme}
        isDarkTheme={isDarkTheme}
        style={style}
      />
    </ConfigProvider>
  );
};

export default ThemeDashboard;
