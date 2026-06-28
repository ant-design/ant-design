import React, { useMemo } from 'react';
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
import type {
  BadgeProps,
  ButtonProps,
  ConfigProviderProps,
  RadioGroupProps,
  SelectProps,
  TagProps,
} from 'antd';
import { createStyles } from 'antd-style';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { ItemType } from 'antd/es/menu/interface';
import { clsx } from 'clsx';

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
  isDarkTheme?: boolean;
}

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
      '@media (max-width: 768px)': {
        display: 'none',
      },
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
      '@media (max-width: 1200px)': {
        display: 'none',
      },
    }),
    mainCard: css({
      justifyContent: 'center',
      padding: 32,
      borderRadius: 16,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    blockCard: css({
      background: cssVar.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: `1px solid ${token.colorBorderSecondary}`,
      padding: token.paddingLG,
    }),
    avatarGroup: css({
      marginBlockEnd: 16,
    }),
    // ---- Migrated inline styles ----
    selectInput: css({
      flex: '0 0 300px',
    }),
    colorPickerFixed: css({
      flex: 'none',
    }),
    datePickerGrow: css({
      flex: 1,
    }),
    controlsRow: css({
      marginBlockStart: 16,
      paddingInline: 4,
    }),
    stepsWrapper: css({
      marginBlockStart: 16,
    }),
    progressWrapper: css({
      marginBlockStart: 8,
    }),
    flexRow12: css({
      padding: 0,
      display: 'flex',
      gap: 12,
    }),
    blockCardQr: css({
      padding: 6,
      flex: '0 0 auto',
    }),
    blockCardExtraPad: css({
      padding: 6,
      justifyContent: 'center',
      marginBlockEnd: 8,
    }),
    flexCol1: css({
      flex: 1,
    }),
    rateStyle: css({
      marginBlockEnd: 20,
    }),
    popconfirmFull: css({
      width: '100%',
      margin: 0,
    }),
    blockCardSegmented: css({
      padding: 8,
    }),
    avatarSection: css({
      textAlign: 'center',
      position: 'relative',
    }),
    avatarExtra: css({
      backgroundColor: '#fff',
      color: '#666',
    }),
    otpWrapper: css({
      marginBlock: 16,
    }),
    dangerBtn: css({
      '.ant-btn': {
        background: '#fff2f0',
        border: 'none',
      },
    }),
    profileInfo: css({
      flex: 1,
    }),
    profileTitle: css({
      margin: 0,
    }),
    profileHandle: css({
      fontSize: 13,
    }),
    profileDesc: css({
      marginBlock: 8,
      fontSize: 14,
    }),
    profileStats: css({
      fontSize: 13,
    }),
    signupCard: css({
      textAlign: 'center',
      padding: '32px 24px',
    }),
    signupAvatar: css({
      marginBlockEnd: 16,
    }),
    signupText: css({
      display: 'block',
      marginBlockEnd: 24,
      fontSize: 14,
    }),
    signupBtn: css({
      marginBlockEnd: 16,
    }),
    signupDivider: css({
      color: token.colorTextSecondary,
      fontSize: 12,
    }),
  };
});

const selectOptions: SelectProps<string>['options'] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'watermelon', label: 'Watermelon' },
];

const dropdownMenuItems = Array.from({ length: 5 }).map<ItemType>((_, index) => ({
  key: `opt${index}`,
  label: `Option ${index}`,
}));

const checkboxOptions: CheckboxGroupProps<string>['options'] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
];

const radioOptions: RadioGroupProps['options'] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
];

const badgeList: BadgeProps[] = [
  { status: 'success', text: 'Success' },
  { status: 'error', text: 'Error' },
  { status: 'default', text: 'Default' },
  { status: 'processing', text: 'Processing' },
  { status: 'warning', text: 'Warning' },
];

const tagList: TagProps[] = [
  { icon: <TwitterOutlined />, color: '#55acee', content: 'Twitter' },
  { icon: <YoutubeOutlined />, color: '#cd201f', content: 'Youtube' },
  { icon: <FacebookOutlined />, color: '#3b5999', content: 'Facebook' },
];

const avatarGroupList = [
  'https://avatars.githubusercontent.com/u/507615?v=4',
  'https://avatars.githubusercontent.com/u/5378891?v=4',
  'https://avatars.githubusercontent.com/u/49217418?v=4',
  'https://avatars.githubusercontent.com/u/117748716?v=4',
  'https://avatars.githubusercontent.com/u/59312002?v=4',
  'https://avatars.githubusercontent.com/u/82765353?v=4',
];

const buttonList: ButtonProps[] = [
  { type: 'primary', children: 'Primary button' },
  { danger: true, children: 'Danger button' },
  { type: 'dashed', variant: 'outlined', shape: 'round', children: 'Outlined button' },
  { danger: true, shape: 'round', children: 'Round button' },
];

const stepsItems = [{ title: 'Finished' }, { title: 'In Process' }, { title: 'Waiting' }];

const ComponentsBlock: React.FC<ComponentsBlockProps> = (props) => {
  const {
    config,
    className,
    containerClassName,
    inherit = false,
    isDark = false,
    isDarkTheme = false,
  } = props;

  const { styles } = useStyle();

  const { theme, ...restConfig } = config || {};

  const mergedTheme = React.useMemo(
    () => ({
      ...theme,
      inherit,
    }),
    [theme, inherit],
  );

  const genBackgroundColor = useMemo(() => {
    if (isDarkTheme) {
      return 'lab(14% 0 0)';
    }
    if (isDark && !isDarkTheme) {
      return '#f5f5f5';
    }
    return 'transparent';
  }, [isDark, isDarkTheme]);

  return (
    <ConfigProvider {...restConfig} theme={mergedTheme}>
      <div className={clsx(containerClassName, styles.container)}>
        <App style={{ width: '100%' }}>
          <BorderBeam lineWidth={2}>
            <Card
              styles={{
                root: {
                  backgroundColor: genBackgroundColor,
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,.08), 0 12px 32px rgba(0,0,0,.08)',
                },
                body: {
                  padding: 0,
                },
              }}
              className={clsx(className, styles.mainCard)}
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
                          className={styles.selectInput}
                          mode="multiple"
                          maxTagCount="responsive"
                          defaultValue={['apple', 'banana']}
                          options={selectOptions}
                        />
                      </Flex>
                      <Flex gap="middle">
                        <ColorPicker
                          showText
                          defaultValue="#1677ff"
                          className={styles.colorPickerFixed}
                        />
                        <Space.Compact>
                          <Button>Dropdown</Button>
                          <Dropdown menu={{ items: dropdownMenuItems }}>
                            <Button icon={<DownOutlined />} />
                          </Dropdown>
                        </Space.Compact>
                        <DatePicker className={styles.datePickerGrow} placeholder="Select Date" />
                      </Flex>
                      <Flex align="center" justify="space-between" className={styles.controlsRow}>
                        <Checkbox.Group options={checkboxOptions} defaultValue={['Apple']} />
                        <Radio.Group block options={radioOptions} defaultValue="Apple" />
                        <Switch defaultChecked />
                        <Progress type="circle" percent={25} size={20} showInfo={false} />
                      </Flex>

                      <div className={styles.stepsWrapper}>
                        <Steps current={1} status="error" items={stepsItems} />
                      </div>
                    </Flex>
                  </div>

                  <div className={styles.progressWrapper}>
                    <Flex gap="middle" vertical>
                      <Progress percent={50} status="active" />
                      <Progress percent={70} status="exception" />
                    </Flex>
                  </div>
                  <div>
                    <Flex justify="space-between" gap={8}>
                      {badgeList.map((badge, index) => (
                        <Badge key={`item-${index}`} {...badge} />
                      ))}
                    </Flex>
                  </div>
                  <div className={styles.flexRow12}>
                    <div className={clsx(styles.blockCard, styles.blockCardQr)}>
                      <QRCode
                        errorLevel="H"
                        value="https://ant.design/"
                        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                      />
                    </div>
                    <div className={styles.flexCol1}>
                      <Flex justify="space-around">
                        <Spin indicator={<LoadingOutlined spin />} size="middle" />
                        <Spin size="middle" />
                        <Rate size="middle" value={3} className={styles.rateStyle} />
                      </Flex>
                      <div className={clsx(styles.blockCard, styles.blockCardExtraPad)}>
                        <Flex gap="small" align="center">
                          {tagList.map((tag) => {
                            const { content, ...restProps } = tag;
                            return (
                              <Tag key={`item-${content}`} {...restProps}>
                                {content}
                              </Tag>
                            );
                          })}
                        </Flex>
                      </div>
                      <InternalPopconfirm
                        title="Are you OK?"
                        placement="topRight"
                        className={styles.popconfirmFull}
                      />
                    </div>
                  </div>

                  <div className={clsx(styles.blockCard, styles.blockCardSegmented)}>
                    <Segmented block options={['1D', '7D', '1M', '1Y', 'All']} />
                    <Segmented
                      styles={{
                        root: {
                          marginBlockStart: 8,
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
                  <div className={styles.avatarSection}>
                    <Avatar.Group className={styles.avatarGroup}>
                      {avatarGroupList.map((src) => (
                        <Avatar key={src} size={46} src={src} />
                      ))}
                      <Avatar size={46} className={styles.avatarExtra}>
                        +5
                      </Avatar>
                    </Avatar.Group>
                    <Title level={5}>Verify account</Title>
                    <Text type="secondary">We've sent a code to a****@gmail.com</Text>

                    <div className={styles.otpWrapper}>
                      <Input.OTP size="large" length={6} defaultValue="4320" />
                    </div>
                    <Text type="secondary">
                      Didn't receive a code? <a>Resend</a>
                    </Text>
                  </div>

                  <Flex gap="large" vertical>
                    <Flex gap="middle" justify="center">
                      {buttonList.slice(0, 2).map((props, idx) => {
                        const { children, ...restProps } = props;
                        return (
                          <Button key={`item-${idx}`} {...restProps}>
                            {children}
                          </Button>
                        );
                      })}
                    </Flex>
                    <Flex gap="middle" justify="center">
                      {buttonList.slice(-2).map((props, idx) => {
                        const { children, ...restProps } = props;
                        return (
                          <Button key={`item-${idx}`} {...restProps}>
                            {children}
                          </Button>
                        );
                      })}
                    </Flex>
                  </Flex>

                  <div className={styles.blockCard}>
                    <Flex align="flex-start" gap="middle">
                      <Avatar
                        shape="square"
                        size={60}
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                      />
                      <div className={styles.profileInfo}>
                        <Title level={5} className={styles.profileTitle}>
                          Ant Design
                        </Title>
                        <Text type="secondary" className={styles.profileHandle}>
                          @ant-design
                        </Text>
                        <p className={styles.profileDesc}>
                          Building the future of UI for web & mobile.
                        </p>
                      </div>
                    </Flex>
                  </div>

                  <InternalPanel
                    styles={{ root: { width: '100%' } }}
                    title="Ant Design"
                    description="An enterprise-class design system for building modern, intelligent, and delightful user experiences."
                    type="success"
                  />
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className={styles.colRight}>
                  <div className={clsx(styles.blockCard, styles.signupCard)}>
                    <Avatar
                      size={50}
                      src="https://avatars.githubusercontent.com/u/27722486?v=4"
                      className={styles.signupAvatar}
                    />
                    <Title level={4}>Create an account</Title>
                    <Text type="secondary" className={styles.signupText}>
                      Start your free 7-day trial. No credit card required.
                    </Text>
                    <Button type="primary" block size="large" className={styles.signupBtn}>
                      Get Started
                    </Button>
                    <Divider className={styles.signupDivider}>OR</Divider>
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
                    <div>
                      Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability.
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
