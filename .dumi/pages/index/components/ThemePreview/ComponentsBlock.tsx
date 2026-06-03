import React from 'react';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import {
  Alert,
  App,
  Button,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Flex,
  Modal,
  Progress,
  Radio,
  Segmented,
  Select,
  Slider,
  Space,
  Steps,
  Switch,
} from 'antd';
import type { ConfigProviderProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

import useLocale from '../../../../hooks/useLocale';

const { _InternalPanelDoNotUseOrYouWillBeFired: ModalPanel } = Modal;
const { Group: RadioButtonGroup, Button: RadioButton } = Radio;

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

const useStyle = createStyles(({ css, cssVar }) => ({
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: cssVar.paddingSM,
    width: '100%',
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
  }),
  span3: css({
    gridColumn: 'span 3',
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
            {/* Row 1: Modal + Alert (2 cols) | DatePicker + Select (1 col) */}
            <div className={clsx(styles.card, styles.span2)}>
              <ModalPanel title="Ant Design" width="100%">
                {locale.text}
              </ModalPanel>
              <Alert title={locale.infoText} type="info" />
            </div>
            <div className={styles.card}>
              <DatePicker />
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                maxTagCount="responsive"
                defaultValue={['apple', 'banana']}
                options={fruitOptions}
              />
            </div>

            {/* Row 2: Buttons (1 col) | ColorPicker + Dropdown + Select (2 cols) */}
            <div className={styles.card}>
              <Flex gap="small" wrap>
                <Button type="primary" className={styles.flexAuto}>
                  {locale.primary}
                </Button>
                <Button type="primary" className={styles.flexAuto} danger>
                  {locale.danger}
                </Button>
                <Button className={styles.flexAuto}>{locale.default}</Button>
                <Button className={styles.flexAuto} type="dashed">
                  {locale.dashed}
                </Button>
              </Flex>
              <Progress style={{ margin: 0 }} percent={60} />
            </div>
            <div className={clsx(styles.card, styles.span2)}>
              <Flex gap="middle" align="center">
                <ColorPicker showText defaultValue="#1677ff" style={{ flex: 'none' }} />
                <Space.Compact>
                  <Button>{locale.dropdown}</Button>
                  <Dropdown menu={{ items: dropdownItems }}>
                    <Button icon={<DownOutlined />} />
                  </Dropdown>
                </Space.Compact>
              </Flex>
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                maxTagCount="responsive"
                defaultValue={['apple', 'banana']}
                options={fruitOptions}
              />
            </div>

            {/* Row 3: Switch + Checkbox + Radio (1 col) | Steps (2 cols) */}
            <div className={styles.card}>
              <Switch
                defaultChecked
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                style={{ width: 48 }}
              />
              <Checkbox.Group
                options={[locale.apple, locale.banana, locale.orange]}
                defaultValue={[locale.apple]}
              />
              <Radio.Group defaultValue={locale.apple} options={[locale.apple, locale.banana]} />
            </div>
            <div className={clsx(styles.card, styles.span2)}>
              <Steps
                current={1}
                items={[
                  { title: locale.finished },
                  { title: locale.inProgress },
                  { title: locale.waiting },
                ]}
              />
              <Slider defaultValue={50} />
            </div>

            {/* Row 4: Segmented + RadioButtonGroup (3 cols) */}
            <div className={clsx(styles.card, styles.span3)}>
              <Flex gap="middle" align="center" justify="center">
                <Segmented
                  defaultValue={locale.segmentedDaily}
                  options={[locale.segmentedDaily, locale.segmentedWeekly, locale.segmentedMonthly]}
                />
                <RadioButtonGroup defaultValue="a">
                  <RadioButton value="a">A</RadioButton>
                  <RadioButton value="b">B</RadioButton>
                  <RadioButton value="c">C</RadioButton>
                </RadioButtonGroup>
              </Flex>
            </div>
          </div>
        </div>
      </App>
    </ConfigProvider>
  );
};

export default ComponentsBlock;
