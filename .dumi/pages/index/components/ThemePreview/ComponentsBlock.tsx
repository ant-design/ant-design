import React from 'react';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import {
  Alert,
  App,
  Avatar,
  Badge,
  Button,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  Progress,
  Radio,
  Rate,
  Segmented,
  Select,
  Slider,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import useLocale from '../../../../hooks/useLocale';

const { Search } = Input;

const locales = {
  cn: {
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
    releaseDesc: '开启全新设计体验',
    segmentedDaily: '每日',
    segmentedWeekly: '每周',
    segmentedMonthly: '每月',
    searchPlaceholder: '搜索组件',
    tagSuccess: '已上线',
    tagProcessing: '审核中',
    tagError: '已关闭',
    tagWarning: '警告',
    teamTitle: '团队',
  },
  en: {
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
    releaseDesc: 'Start a new design experience',
    segmentedDaily: 'Daily',
    segmentedWeekly: 'Weekly',
    segmentedMonthly: 'Monthly',
    searchPlaceholder: 'Search',
    tagSuccess: 'Live',
    tagProcessing: 'Review',
    tagError: 'Closed',
    tagWarning: 'Warning',
    teamTitle: 'Team',
  },
};

const useStyle = createStyles(({ css, cssVar }) => ({
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: cssVar.paddingSM,
    width: '100%',
    '@media (max-width: 576px)': {
      gridTemplateColumns: '1fr',
    },
  }),
  card: css({
    backgroundColor: `color-mix(in srgb, ${cssVar.colorBgContainer} 70%, transparent)`,
    backdropFilter: 'blur(12px)',
    borderRadius: cssVar.borderRadiusLG,
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorderSecondary}`,
    padding: `${cssVar.paddingSM} ${cssVar.padding}`,
    transition: `transform ${cssVar.motionDurationMid} ${cssVar.motionEaseInOut}, box-shadow ${cssVar.motionDurationMid} ${cssVar.motionEaseInOut}`,
    display: 'flex',
    flexDirection: 'column',
    gap: cssVar.paddingSM,
    justifyContent: 'center',

    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: cssVar.boxShadowSecondary,
    },
  }),
  span2: css({
    gridColumn: 'span 2',
    '@media (max-width: 576px)': {
      gridColumn: 'span 1',
    },
  }),
  span3: css({
    gridColumn: 'span 3',
    '@media (max-width: 576px)': {
      gridColumn: 'span 1',
    },
  }),
  flexAuto: css({ flex: 'auto' }),
}));

interface ComponentsBlockProps {
  config?: ConfigProviderProps;
  style?: React.CSSProperties;
  className?: string;
  containerClassName?: string;
  inherit?: boolean;
}

const ComponentsBlock: React.FC<ComponentsBlockProps> = (props) => {
  const [locale] = useLocale(locales);
  const { styles } = useStyle();
  const { config, style, className, containerClassName, inherit = false } = props;

  const { theme, ...restConfig } = config || {};

  const mergedTheme = React.useMemo(
    () => ({
      ...theme,
      inherit,
    }),
    [theme, inherit],
  );

  const fruitOptions = [
    { value: 'apple', label: locale.apple },
    { value: 'banana', label: locale.banana },
    { value: 'orange', label: locale.orange },
    { value: 'watermelon', label: locale.watermelon },
  ];

  const dropdownItems = Array.from({ length: 5 }).map((_, index) => ({
    key: `opt${index}`,
    label: `${locale.option} ${index}`,
  }));

  return (
    <ConfigProvider {...restConfig} theme={mergedTheme}>
      <App>
        <div className={containerClassName}>
          <div className={clsx(styles.grid, className)} style={style}>
            {/* Row 1: Notification (span2) | Team (span1) */}
            <div className={clsx(styles.card, styles.span2)}>
              <Alert
                message={locale.release}
                description={locale.releaseDesc}
                type="success"
                showIcon
              />
              <Flex gap="small" wrap>
                <Tag color="success">{locale.tagSuccess}</Tag>
                <Tag color="processing">{locale.tagProcessing}</Tag>
                <Tag color="error">{locale.tagError}</Tag>
                <Tag color="warning">{locale.tagWarning}</Tag>
              </Flex>
            </div>
            <div className={styles.card}>
              <Typography.Text type="secondary">{locale.teamTitle}</Typography.Text>
              <Avatar.Group maxCount={3}>
                <Badge dot status="success" offset={[-2, 24]}>
                  <Avatar>A</Avatar>
                </Badge>
                <Avatar>B</Avatar>
                <Avatar>C</Avatar>
                <Avatar>D</Avatar>
                <Avatar>E</Avatar>
              </Avatar.Group>
            </div>

            {/* Row 2: Actions (span1) | Colors & Search (span2) */}
            <div className={styles.card}>
              <Flex gap="small" wrap>
                <Button type="primary" className={styles.flexAuto}>
                  {locale.primary}
                </Button>
                <Button danger className={styles.flexAuto}>
                  {locale.danger}
                </Button>
                <Button className={styles.flexAuto}>{locale.default}</Button>
              </Flex>
              <Space.Compact>
                <Button>{locale.dropdown}</Button>
                <Dropdown menu={{ items: dropdownItems }}>
                  <Button icon={<DownOutlined />} />
                </Dropdown>
              </Space.Compact>
              <Switch
                defaultChecked
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                style={{ width: 48 }}
              />
            </div>
            <div className={clsx(styles.card, styles.span2)}>
              <Flex gap="small" align="center">
                <ColorPicker showText defaultValue="#1677ff" style={{ flex: 'none' }} />
                <Rate defaultValue={4} />
              </Flex>
              <Search placeholder={locale.searchPlaceholder} allowClear />
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                maxTagCount="responsive"
                defaultValue={['apple', 'banana']}
                options={fruitOptions}
              />
            </div>

            {/* Row 3: DatePicker & Select (span2) | Progress (span1) */}
            <div className={clsx(styles.card, styles.span2)}>
              <DatePicker style={{ width: '100%' }} />
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                maxTagCount="responsive"
                defaultValue={['apple', 'banana']}
                options={fruitOptions}
              />
            </div>
            <div className={styles.card}>
              <Flex justify="space-around">
                <Progress type="circle" percent={75} size={72} />
                <Progress type="circle" percent={100} size={72} />
              </Flex>
              <Slider defaultValue={50} />
            </div>

            {/* Row 4: Segmented + Checkbox + Radio (span3) */}
            <div className={clsx(styles.card, styles.span3)}>
              <Flex gap="middle" align="center" justify="center" wrap>
                <Segmented
                  defaultValue={locale.segmentedDaily}
                  options={[locale.segmentedDaily, locale.segmentedWeekly, locale.segmentedMonthly]}
                />
                <Checkbox.Group
                  options={[locale.apple, locale.banana, locale.orange]}
                  defaultValue={[locale.apple]}
                />
                <Radio.Group defaultValue={locale.apple} options={[locale.apple, locale.banana]} />
              </Flex>
            </div>
          </div>
        </div>
      </App>
    </ConfigProvider>
  );
};

export default ComponentsBlock;
