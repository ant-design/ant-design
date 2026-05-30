import React from 'react';
import {
  AppleFilled,
  DownOutlined,
  FacebookOutlined,
  GoogleOutlined,
  LoadingOutlined,
  MailOutlined,
  MessageOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import {
  App,
  Avatar,
  Badge,
  BorderBeam,
  Button,
  Card,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Divider,
  Dropdown,
  Flex,
  Input,
  Modal,
  notification,
  Popconfirm,
  Progress,
  QRCode,
  Radio,
  Rate,
  Segmented,
  Select,
  Space,
  Spin,
  Steps,
  Switch,
  Tag,
  Typography,
} from 'antd';
import type { ButtonProps, ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';
import useLocale from '../../../../hooks/useLocale';
import { useAntdRepos } from '../util';

const { Title, Text } = Typography;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;
const { _InternalPanelDoNotUseOrYouWillBeFired: ModalInternalPanel } = Modal;

interface ComponentsBlockProps {
  config?: ConfigProviderProps;
  style?: React.CSSProperties;
  className?: string;
  containerClassName?: string;
  inherit?: boolean;
  isDark?: boolean;
  bgImg?: string;
}

const locales = {
  cn: {
    range: '设置范围',
    text: 'Ant Design 使用 CSS-in-JS 技术以提供动态与混合主题的能力。与此同时，我们使用组件级别的 CSS-in-JS 解决方案，让你的应用获得更好的性能。',
    infoText: '信息内容展示',
    dropdown: '下拉菜单',
    finished: '已完成',
    inProgress: '进行中',
    waiting: '等待中',
    option: '选项',
    apple: '苹果',
    banana: '香蕉',
    orange: '橘子',
    watermelon: '西瓜',
    primary: '主要按钮',
    danger: '危险按钮',
    default: '默认按钮',
    dashed: '虚线按钮',
    icon: '图标按钮',
    hello: '你好，Ant Design!',
    release: 'Ant Design 6.0 正式发布！',
    segmentedDaily: '每日',
    segmentedWeekly: '每周',
    segmentedMonthly: '每月',
  },
  en: {
    range: 'Set Range',
    text: 'Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.',
    infoText: 'Info Text',
    dropdown: 'Dropdown',
    finished: 'Finished',
    inProgress: 'In Progress',
    waiting: 'Waiting',
    option: 'Option',
    apple: 'Apple',
    banana: 'Banana',
    orange: 'Orange',
    watermelon: 'Watermelon',
    primary: 'Primary',
    danger: 'Danger',
    default: 'Default',
    dashed: 'Dashed',
    icon: 'Icon',
    hello: 'Hello, Ant Design!',
    release: 'Ant Design 6.0 is released!',
    segmentedDaily: 'Daily',
    segmentedWeekly: 'Weekly',
    segmentedMonthly: 'Monthly',
  },
};

const useStyle = createStyles(({ css, token, cssVar }) => {
  return {
    container: css({
      backgroundColor: 'transparent',
      padding: 0,
      border: 'none',
      boxShadow: 'none',
      width: '100%',
    }),
    layoutRow: css({
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: '0 auto',
    }),
    colLeft: css({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: token.paddingLG,
    }),
    colCenter: css({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: token.paddingLG,
    }),
    colRight: css({
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: token.paddingLG,
    }),
    blockCard: css({
      background: cssVar.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: `1px solid ${token.colorBorderSecondary}`,
      padding: token.paddingLG,
    }),
    avatarGroup: css({
      marginBottom: 16,
    }),
    formLabel: css({
      display: 'block',
      fontWeight: 600,
      marginBottom: token.marginXXS,
    }),
    listIcon: css({
      fontSize: 16,
      color: token.colorTextSecondary,
    }),
  };
});
const ComponentsBlock: React.FC<ComponentsBlockProps> = (props) => {
  const [locale] = useLocale(locales);
  const { config, className, containerClassName, inherit = false, bgImg, isDark = false } = props;

  const { styles, theme: currentToken } = useStyle();

  const { data } = useAntdRepos();

  const { theme, ...restConfig } = config || {};

  const mergedTheme = React.useMemo(
    () => ({
      ...theme,
      inherit,
    }),
    [theme, inherit],
  );

  // 可 map 的数据
  const selectOptions = [
    { value: 'apple', label: locale.apple },
    { value: 'banana', label: locale.banana },
    { value: 'orange', label: locale.orange },
    { value: 'watermelon', label: locale.watermelon },
  ];

  const dropdownMenuItems = Array.from({ length: 5 }).map((_, index) => ({
    key: `opt${index}`,
    label: `${locale.option} ${index}`,
  }));

  const checkboxOptions = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
  ];

  const radioOptions = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
  ];

  const badgeList = [
    { status: 'success', text: 'Success' },
    { status: 'error', text: 'Error' },
    { status: 'default', text: 'Default' },
    { status: 'processing', text: 'Processing' },
    { status: 'warning', text: 'Warning' },
  ];

  const tagList = [
    { icon: <TwitterOutlined />, color: '#55acee', label: 'Twitter' },
    { icon: <YoutubeOutlined />, color: '#cd201f', label: 'Youtube' },
    { icon: <FacebookOutlined />, color: '#3b5999', label: 'Facebook' },
  ];

  const avatarGroupList = [
    'https://avatars.githubusercontent.com/u/507615?v=4',
    'https://avatars.githubusercontent.com/u/5378891?v=4',
    'https://avatars.githubusercontent.com/u/117748716?v=4',
    'https://avatars.githubusercontent.com/u/59312002?v=4',
    'https://avatars.githubusercontent.com/u/82765353?v=4',
  ];

  const buttonList: ButtonProps[] = [
    { type: 'primary', children: 'Click me' },
    { color: 'primary', variant: 'filled', children: 'Click me' },
    { danger: true, style: { background: '#fff2f0', border: 'none' }, children: 'Click me' },
    { type: 'dashed', variant: 'outlined', shape: 'round', children: 'Click me' },
    { color: 'primary', variant: 'dashed', shape: 'round', children: 'Click me' },
    { danger: true, shape: 'round', children: 'Click me' },
  ];

  const stepsItems = [{ title: 'Finished' }, { title: 'In Process' }, { title: 'Waiting' }];

  return (
    <ConfigProvider {...restConfig} theme={mergedTheme}>
      <div className={clsx(containerClassName, styles.container)}>
        <App>
          <BorderBeam>
            <Card
              styles={{
                root: {
                  justifyContent: 'center',
                  padding: 32,
                  borderRadius: 16,
                  backgroundColor: isDark ? 'lab(14% 0 0)' : 'lab(96.5432% -.0000596046 0)', // matching the light gray background
                  backgroundImage: bgImg ? `url(${bgImg})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                },
                body: {
                  padding: 0,
                },
              }}
              className={clsx(className)}
            >
              <div className={styles.layoutRow}>
                {/* ================= LEFT COLUMN ================= */}
                <div className={styles.colLeft}>
                  <div>
                    <Flex vertical gap="middle">
                      <Flex gap="middle">
                        <Input placeholder="antd@email.com" />
                        <Select
                          placeholder="Select one"
                          style={{ width: 300 }}
                          mode="multiple"
                          maxTagCount="responsive"
                          defaultValue={['apple', 'banana']}
                          options={selectOptions}
                        />
                      </Flex>
                      <Flex gap="middle">
                        <ColorPicker showText defaultValue="#1677ff" style={{ flex: 'none' }} />
                        <Space.Compact>
                          <Button>{locale.dropdown}</Button>
                          <Dropdown menu={{ items: dropdownMenuItems }}>
                            <Button icon={<DownOutlined />} />
                          </Dropdown>
                        </Space.Compact>
                        <DatePicker style={{ flex: 1 }} placeholder="Select DatePicker" />
                      </Flex>
                      <Flex
                        align="center"
                        justify="space-between"
                        style={{ marginTop: 16, padding: '0 4px' }}
                      >
                        <Checkbox.Group options={checkboxOptions} defaultValue={['Apple']} />
                        <Radio.Group block options={radioOptions} defaultValue="Apple" />
                        <Switch defaultChecked />
                        <Progress type="circle" percent={25} size={20} showInfo={false} />
                      </Flex>

                      <div style={{ marginTop: 16 }}>
                        <Steps current={1} status="error" items={stepsItems} />
                      </div>
                    </Flex>
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <Flex gap="middle" vertical>
                      <Progress percent={50} status="active" />
                      <Progress percent={70} status="exception" />
                    </Flex>
                  </div>

                  <div>
                    <Flex justify="space-between" gap={8}>
                      {badgeList.map((badge) => (
                        <Badge key={badge.status} status={badge.status as any} text={badge.text} />
                      ))}
                    </Flex>
                  </div>

                  <div style={{ padding: 0, display: 'flex', gap: '12px' }}>
                    <div className={styles.blockCard} style={{ padding: '6px' }}>
                      <QRCode
                        errorLevel="H"
                        value="https://ant.design/"
                        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Flex justify="space-around">
                        <Spin indicator={<LoadingOutlined spin />} size="middle" />
                        <Spin size="middle" />
                        <Rate size="middle" value={3} style={{ marginBottom: 20 }} />
                      </Flex>
                      <div
                        className={styles.blockCard}
                        style={{ padding: '6px', justifyContent: 'center', marginBottom: '8px' }}
                      >
                        <Flex gap="small" align="center">
                          {tagList.map((tag) => (
                            <Tag key={tag.label} icon={tag.icon} color={tag.color}>
                              {tag.label}
                            </Tag>
                          ))}
                        </Flex>
                      </div>
                      <InternalPopconfirm
                        title="Are you OK?"
                        placement="topRight"
                        style={{ width: '100%', margin: 0 }}
                      />
                    </div>
                  </div>

                  <div className={styles.blockCard} style={{ padding: '8px' }}>
                    <Segmented block options={['1D', '7D', '1M', '1Y', 'All']} />
                    <Segmented
                      styles={{
                        root: {
                          marginTop: 8,
                        },
                      }}
                      block
                      options={[
                        { label: 'Chats', value: 'Chats', icon: <MessageOutlined /> },
                        { label: 'Emails', value: 'Emails', icon: <MailOutlined /> },
                      ]}
                    />
                  </div>
                </div>

                {/* ================= CENTER COLUMN ================= */}
                <div className={styles.colCenter}>
                  <div style={{ textAlign: 'center', position: 'relative' }}>
                    <Avatar.Group className={styles.avatarGroup}>
                      {avatarGroupList.map((src) => (
                        <Avatar key={src} size={46} src={src} />
                      ))}
                      <Avatar size={46} style={{ backgroundColor: '#fff', color: '#666' }}>
                        +5
                      </Avatar>
                    </Avatar.Group>
                    <Title level={5}>Verify account</Title>
                    <Text type="secondary">We've sent a code to a****@gmail.com</Text>

                    <div style={{ margin: '16px 0' }}>
                      <Input.OTP size="large" length={6} defaultValue="4320" />
                    </div>
                    <Text type="secondary">
                      Didn't receive a code? <a>Resend</a>
                    </Text>
                  </div>

                  <Flex gap="large" vertical>
                    <Flex gap="middle" justify="center">
                      {buttonList.slice(0, 3).map((btn: ButtonProps, idx) => (
                        <Button key={idx} {...btn} />
                      ))}
                    </Flex>
                    <Flex gap="middle" justify="center">
                      {buttonList.slice(-3).map((btn: ButtonProps, idx) => (
                        <Button key={idx} {...btn} />
                      ))}
                    </Flex>
                  </Flex>

                  <div className={styles.blockCard}>
                    <Flex align="flex-start" gap="middle">
                      <Avatar
                        shape="square"
                        size={60}
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                      />
                      <div style={{ flex: 1 }}>
                        <Title level={5} style={{ margin: 0 }}>
                          Ant Design
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          @ant-design
                        </Text>
                        <p style={{ margin: '8px 0', fontSize: 14 }}>
                          Building the future of UI for web & mobile.
                        </p>
                        <Space size="large" style={{ fontSize: 13 }}>
                          <span>
                            <Text strong>{data.stars} </Text>
                            <Text type="secondary">Star</Text>
                          </span>
                          <span>
                            <Text strong>{data.forks} </Text>
                            <Text type="secondary">Fork</Text>
                          </span>
                        </Space>
                      </div>
                    </Flex>
                  </div>

                  <InternalPanel
                    styles={{ root: { width: '100%' } }}
                    title="Hello Ant!"
                    description="Hello World?"
                    type="success"
                  />
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className={styles.colRight}>
                  <div
                    className={styles.blockCard}
                    style={{ textAlign: 'center', padding: '32px 24px' }}
                  >
                    <Avatar
                      size={50}
                      src="https://avatars.githubusercontent.com/u/27722486?v=4"
                      style={{ marginBottom: 16 }}
                    />
                    <Title level={4}>Create an account</Title>
                    <Text
                      type="secondary"
                      style={{ display: 'block', marginBottom: 24, fontSize: 14 }}
                    >
                      Start your free 7-day trial. No credit card required.
                    </Text>
                    <Button type="primary" block size="large" style={{ marginBottom: 16 }}>
                      Get Started
                    </Button>
                    <Divider style={{ color: currentToken.colorTextSecondary, fontSize: 12 }}>
                      OR
                    </Divider>
                    <Flex vertical gap="small">
                      <Button block size="large" icon={<GoogleOutlined />}>
                        Continue with Google
                      </Button>
                      <Button block size="large" icon={<AppleFilled />}>
                        Continue with Apple
                      </Button>
                    </Flex>
                  </div>

                  <ModalInternalPanel title="Ant Design">
                    <div style={{ height: 60 }}>
                      Ant Design 使用 CSS-in-JS 技术以提供动态与混合主题的能力。
                    </div>
                  </ModalInternalPanel>
                </div>
              </div>
            </Card>
          </BorderBeam>
        </App>
      </div>
    </ConfigProvider>
  );
};

export default ComponentsBlock;
