import React from 'react';
import { AntDesignOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  ColorPicker,
  Dropdown,
  Input,
  message,
  Modal,
  Progress,
  Select,
  Slider,
  Steps,
  Switch,
  Tooltip,
} from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import useLocale from '../../../../hooks/useLocale';

const { _InternalPanelDoNotUseOrYouWillBeFired: ModalPanel } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalTooltip } = Tooltip;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalMessage } = message;

const locales = {
  cn: {
    range: '设置范围',
    text: 'Ant Design 5.0 使用 CSS-in-JS 技术以提供动态与混合主题的能力。与此同时，我们使用组件级别的 CSS-in-JS 解决方案，让你的应用获得更好的性能。',
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
    release: 'Ant Design 5.0 正式发布！',
  },
  en: {
    range: 'Set Range',
    text: 'Ant Design 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.',
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
    release: 'Ant Design 5.0 is released!',
  },
};

const useStyle = createStyles(({ token, css }) => {
  const gap = token.padding;

  return {
    holder: css`
      width: 500px;
      display: flex;
      flex-direction: column;
      row-gap: ${gap}px;
      opacity: 0.65;
    `,

    flex: css`
      display: flex;
      flex-wrap: nowrap;
      column-gap: ${gap}px;
    `,
    ptg_20: css`
      flex: 0 1 20%;
    `,
    ptg_none: css`
      flex: none;
    `,
    block: css`
      background-color: ${token.colorBgContainer};
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      border-radius: ${token.borderRadius}px;
      border: 1px solid ${token.colorBorder};
    `,
    noMargin: css`
      margin: 0;
    `,
  };
});

export interface ComponentsBlockProps {
  className?: string;
  style?: React.CSSProperties;
}

const ComponentsBlock: React.FC<ComponentsBlockProps> = (props) => {
  const { className, style } = props;

  const [locale] = useLocale(locales);
  const { styles } = useStyle();

  return (
    <div className={classNames(className, styles.holder)} style={style}>
      <ModalPanel title="Ant Design 5.0" width="100%">
        {locale.text}
      </ModalPanel>

      <Alert message={locale.infoText} type="info" />

      {/* Line */}
      <div className={styles.flex}>
        <ColorPicker style={{ flex: 'none' }} />
        <div style={{ flex: 'none' }}>
          <Dropdown.Button
            menu={{
              items: new Array(5).fill(null).map((_, index) => ({
                key: `opt${index}`,
                label: `${locale.option} ${index}`,
              })),
            }}
          >
            {locale.dropdown}
          </Dropdown.Button>
        </div>

        <Select
          style={{ flex: 'auto' }}
          mode="multiple"
          maxTagCount="responsive"
          defaultValue={[{ value: 'apple' }, { value: 'banana' }]}
          options={[
            {
              value: 'apple',
              label: locale.apple,
            },
            {
              value: 'banana',
              label: locale.banana,
            },
            {
              value: 'orange',
              label: locale.orange,
            },
            {
              value: 'watermelon',
              label: locale.watermelon,
            },
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
          {
            title: locale.finished,
          },
          {
            title: locale.inProgress,
          },
          {
            title: locale.waiting,
          },
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
              style: {
                color: '#f50',
              },
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

      <Alert message="Ant Design love you!" type="success" />
    </div>
  );
};

export default ComponentsBlock;
