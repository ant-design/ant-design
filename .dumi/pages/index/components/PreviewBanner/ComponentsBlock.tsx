import React from 'react';
import { AntDesignOutlined, CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  Dropdown,
  Input,
  message,
  Modal,
  Progress,
  Select,
  Slider,
  Space,
  Steps,
  Switch,
  Tooltip,
} from 'antd';
import type { ThemeConfig } from 'antd';
import { createStyles } from 'antd-style';

import useLocale from '../../../../hooks/useLocale';

import Tilt from './Tilt';

const { _InternalPanelDoNotUseOrYouWillBeFired: ModalPanel } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMessage } = message;

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
  },
};

const useStyle = createStyles(({ cssVar, css }) => {
  const gap = cssVar.padding;
  return {
    holder: css`
      width: 500px;
      display: flex;
      flex-direction: column;
      row-gap: ${gap};
      opacity: 0.8;
    `,
    flex: css`
      display: flex;
      flex-wrap: nowrap;
      column-gap: ${gap};
    `,
    ptg_20: css`
      flex: 0 1 20%;
    `,
    ptg_none: css`
      flex: none;
    `,
    block: css`
      background-color: ${cssVar.colorBgContainer};
      padding: ${cssVar.paddingXS} ${cssVar.paddingSM};
      border-radius: ${cssVar.borderRadius};
      border: 1px solid ${cssVar.colorBorder};
    `,
    noMargin: css`
      margin: 0;
    `,
  };
});
interface ComponentsBlockProps {
  config: ThemeConfig;
}

const ComponentsBlock: React.FC<ComponentsBlockProps> = ({ config }) => {
  const [locale] = useLocale(locales);
  const { styles } = useStyle();

  return (
    <ConfigProvider {...config}>
      <Tilt options={{ max: 4, glare: false, scale: 0.98 }} className={styles.holder}>
        <ModalPanel title="Ant Design" width="100%">
          {locale.text}
        </ModalPanel>
        <Alert title={locale.infoText} type="info" />
        {/* Line */}
        <div className={styles.flex}>
          <ColorPicker style={{ flex: 'none' }} />
          <div style={{ flex: 'none' }}>
            <Space.Compact>
              <Button>{locale.dropdown}</Button>
              <Dropdown
                menu={{
                  items: Array.from({ length: 5 }).map((_, index) => ({
                    key: `opt${index}`,
                    label: `${locale.option} ${index}`,
                  })),
                }}
              >
                <Button icon={<DownOutlined />} />
              </Dropdown>
            </Space.Compact>
          </div>
          <Select
            style={{ flex: 'auto' }}
            mode="multiple"
            maxTagCount="responsive"
            defaultValue={[{ value: 'apple' }, { value: 'banana' }]}
            options={[
              { value: 'apple', label: locale.apple },
              { value: 'banana', label: locale.banana },
              { value: 'orange', label: locale.orange },
              { value: 'watermelon', label: locale.watermelon },
            ]}
          />
          <Input style={{ flex: 'none', width: 120 }} />
        </div>
        <Progress
          style={{ margin: 0 }}
          percent={100}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
        />
        <Progress style={{ margin: 0 }} percent={33} status="exception" />
        <Steps
          current={1}
          items={[
            { title: locale.finished },
            { title: locale.inProgress },
            { title: locale.waiting },
          ]}
        />
        {/* Line */}
        <div className={styles.block}>
          <Slider
            style={{ marginInline: 20 }}
            range
            marks={{
              0: '0°C',
              26: '26°C',
              37: '37°C',
              100: {
                style: { color: '#f50' },
                label: <strong>100°C</strong>,
              },
            }}
            defaultValue={[26, 37]}
          />
        </div>
        {/* Line */}
        <div className={styles.flex}>
          <Button className={styles.ptg_20} type="primary">
            {locale.primary}
          </Button>
          <Button className={styles.ptg_20} type="primary" danger>
            {locale.danger}
          </Button>
          <Button className={styles.ptg_20}>{locale.default}</Button>
          <Button className={styles.ptg_20} type="dashed">
            {locale.dashed}
          </Button>
          <Button className={styles.ptg_20} icon={<AntDesignOutlined />}>
            {locale.icon}
          </Button>
        </div>
        {/* Line */}
        <div className={styles.block}>
          <div className={styles.flex}>
            <Switch
              className={styles.ptg_none}
              defaultChecked
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <Checkbox.Group
              className={styles.ptg_none}
              options={[locale.apple, locale.banana, locale.orange]}
              defaultValue={[locale.apple]}
            />
          </div>
        </div>
        <div>
          <InternalMessage content={locale.release} type="success" />
        </div>
        <InternalTooltip title={locale.hello} placement="topLeft" className={styles.noMargin} />
        <Alert title="Ant Design love you!" type="success" />
      </Tilt>
    </ConfigProvider>
  );
};

export default ComponentsBlock;
