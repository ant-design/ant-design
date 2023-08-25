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
  },
  en: {
    range: 'Set Range',
    text: 'Ant Design 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.',
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
}

export default function ComponentsBlock(props: ComponentsBlockProps) {
  const { className } = props;

  const [locale] = useLocale(locales);
  const { styles } = useStyle();

  return (
    <div className={classNames(className, styles.holder)}>
      <ModalPanel title="Ant Design 5.0" width="100%">
        {locale.text}
      </ModalPanel>

      <Alert message="Info Text" type="info" />

      {/* Line */}
      <div className={styles.flex}>
        <ColorPicker style={{ flex: 'none' }} />
        <div style={{ flex: 'none' }}>
          <Dropdown.Button
            menu={{
              items: new Array(5).fill(null).map((_, index) => ({
                key: `opt${index}`,
                label: `Option ${index}`,
              })),
            }}
          >
            Dropdown
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
              label: 'Apple',
            },
            {
              value: 'banana',
              label: 'Banana',
            },
            {
              value: 'orange',
              label: 'Orange',
            },
            {
              value: 'watermelon',
              label: 'Watermelon',
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
            title: 'Finished',
          },
          {
            title: 'In Progress',
          },
          {
            title: 'Waiting',
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
          Primary
        </Button>
        <Button className={styles.ptg_20} type="primary" danger>
          Danger
        </Button>
        <Button className={styles.ptg_20}>Default</Button>
        <Button className={styles.ptg_20} type="dashed">
          Dashed
        </Button>
        <Button className={styles.ptg_20} icon={<AntDesignOutlined />}>
          Icon
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
            options={['Apple', 'Pear', 'Orange']}
            defaultValue={['Apple']}
          />
        </div>
      </div>

      <div>
        <InternalMessage content="Ant Design 5.0 is here!" type="success" />
      </div>

      <InternalTooltip
        title="Hello, Ant Design 5.0 is here!"
        placement="topLeft"
        className={styles.noMargin}
      />

      <Alert message="Success Text" type="success" />
    </div>
  );
}
