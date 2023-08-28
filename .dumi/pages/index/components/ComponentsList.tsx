/* eslint-disable react/jsx-pascal-case */
import React, { useContext } from 'react';
import { CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import {
  Alert,
  Carousel,
  DatePicker,
  FloatButton,
  Modal,
  Progress,
  Space,
  Tag,
  Tour,
  Typography,
} from 'antd';
import { createStyles, css, useTheme } from 'antd-style';
import classNames from 'classnames';
import dayjs from 'dayjs';

import useDark from '../../../hooks/useDark';
import useLocale from '../../../hooks/useLocale';
import SiteContext from '../../../theme/slots/SiteContext';
import { getCarouselStyle } from './util';

const SAMPLE_CONTENT_EN =
  'Ant Design 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.';

const SAMPLE_CONTENT_CN =
  'Ant Design 5.0 使用 CSS-in-JS 技术以提供动态与混合主题的能力。与此同时，我们使用组件级别的 CSS-in-JS 解决方案，让你的应用获得更好的性能。';

const locales = {
  cn: {
    yesterday: '昨天',
    lastWeek: '上周',
    lastMonth: '上月',
    lastYear: '去年',
    new: '新增',
    update: '更新',
    sampleContent: SAMPLE_CONTENT_CN,
    inProgress: '进行中',
    success: '成功',
    taskFailed: '任务失败',
    tour: '漫游导览帮助用户对新加的功能进行快速了解',
  },
  en: {
    yesterday: 'Yesterday',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    lastYear: 'Last Year',
    new: 'New',
    update: 'Update',
    sampleContent: SAMPLE_CONTENT_EN,
    inProgress: 'In Progress',
    success: 'Success',
    taskFailed: 'Task Failed',
    tour: 'A quick guide for new come user about how to use app.',
  },
};

const useStyle = () => {
  const isRootDark = useDark();

  return createStyles(({ token }) => {
    const { carousel } = getCarouselStyle();

    return {
      card: css`
        border-radius: ${token.borderRadius}px;
        border: 1px solid ${isRootDark ? token.colorBorder : 'transparent'};
        background: ${isRootDark ? token.colorBgContainer : '#f5f8ff'};
        padding: ${token.paddingXL}px;
        flex: none;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;

        > * {
          flex: none;
        }
      `,
      cardCircle: css`
        position: absolute;
        width: 120px;
        height: 120px;
        background: #1677ff;
        border-radius: 50%;
        filter: blur(40px);
        opacity: 0.1;
      `,
      mobileCard: css`
        height: 395px;
      `,
      carousel,
    };
  })();
};

const ComponentItem: React.FC<ComponentItemProps> = ({ title, node, type, index }) => {
  const tagColor = type === 'new' ? 'processing' : 'warning';
  const [locale] = useLocale(locales);
  const tagText = type === 'new' ? locale.new : locale.update;
  const { styles } = useStyle();
  const { isMobile } = useContext(SiteContext);
  const token = useTheme();

  return (
    <div className={classNames(styles.card, isMobile && styles.mobileCard)}>
      {/* Decorator */}
      <div
        className={styles.cardCircle}
        style={{
          right: (index % 2) * -20 - 20,
          bottom: (index % 3) * -40 - 20,
        }}
      />

      {/* Title */}
      <Space>
        <Typography.Title level={4} style={{ fontWeight: 'normal', margin: 0 }}>
          {title}
        </Typography.Title>
        <Tag color={tagColor}>{tagText}</Tag>
      </Space>

      <div
        style={{
          marginTop: token.paddingLG,
          flex: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {node}
      </div>
    </div>
  );
};

interface ComponentItemProps {
  title: React.ReactNode;
  node: React.ReactNode;
  type: 'new' | 'update';
  index: number;
}

export default function ComponentsList() {
  const token = useTheme();
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const { isMobile } = useContext(SiteContext);

  const COMPONENTS: {
    title: React.ReactNode;
    type: 'new' | 'update';
    node: React.ReactNode;
  }[] = React.useMemo(
    () => [
      {
        title: 'Modal',
        type: 'update',
        node: (
          <Modal._InternalPanelDoNotUseOrYouWillBeFired title="Ant Design 5.0" width={300}>
            {locale.sampleContent}
          </Modal._InternalPanelDoNotUseOrYouWillBeFired>
        ),
      },

      {
        title: 'DatePicker',
        type: 'update',
        node: (
          <DatePicker._InternalPanelDoNotUseOrYouWillBeFired
            showToday={false}
            presets={
              isMobile
                ? []
                : [
                    { label: locale.yesterday, value: dayjs().add(-1, 'd') },
                    { label: locale.lastWeek, value: dayjs().add(-7, 'd') },
                    { label: locale.lastMonth, value: dayjs().add(-1, 'month') },
                    { label: locale.lastYear, value: dayjs().add(-1, 'year') },
                  ]
            }
            value={dayjs('2022-11-18 14:00:00')}
          />
        ),
      },

      {
        title: 'Progress',
        type: 'update',
        node: (
          <Space direction="vertical">
            <Space>
              <Progress type="circle" trailColor="#e6f4ff" percent={60} size={14} />
              {locale.inProgress}
            </Space>
            <Space>
              <Progress type="circle" percent={100} size={14} />
              {locale.success}
            </Space>
            <Space>
              <Progress type="circle" status="exception" percent={88} size={14} />
              {locale.taskFailed}
            </Space>
          </Space>
        ),
      },

      {
        title: 'Tour',
        type: 'new',
        node: (
          <Tour._InternalPanelDoNotUseOrYouWillBeFired
            title="Ant Design 5.0"
            description={locale.tour}
            style={{ width: isMobile ? 'auto' : 350 }}
            current={3}
            total={9}
          />
        ),
      },
      {
        title: 'FloatButton',
        type: 'new',
        node: (
          <Space size="large">
            <FloatButton._InternalPanelDoNotUseOrYouWillBeFired
              shape="square"
              items={[
                {
                  icon: <QuestionCircleOutlined />,
                },
                {
                  icon: <CustomerServiceOutlined />,
                },
                {
                  icon: <SyncOutlined />,
                },
              ]}
            />
            <FloatButton._InternalPanelDoNotUseOrYouWillBeFired backTop />
            <FloatButton._InternalPanelDoNotUseOrYouWillBeFired
              items={[
                {
                  icon: <QuestionCircleOutlined />,
                },
                {
                  icon: <CustomerServiceOutlined />,
                },
                {
                  icon: <SyncOutlined />,
                },
              ]}
            />
          </Space>
        ),
      },

      // {
      //   title: 'Steps',
      //   type: 'update',
      //   node: <Button style={{ width: PLACEHOLDER_WIDTH }}>Placeholder</Button>,
      // },

      {
        title: 'Alert',
        type: 'update',
        node: (
          <Alert
            style={{ width: 400 }}
            message="Ant Design 5.0"
            description={locale.sampleContent}
            closable
          />
        ),
      },
    ],
    [isMobile],
  );

  return isMobile ? (
    <div style={{ margin: '0 16px' }}>
      <Carousel className={styles.carousel}>
        {COMPONENTS.map(({ title, node, type }, index) => (
          <ComponentItem title={title} node={node} type={type} index={index} key={index} />
        ))}
      </Carousel>
    </div>
  ) : (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', columnGap: token.paddingLG }}>
        {COMPONENTS.map(({ title, node, type }, index) => (
          <ComponentItem title={title} node={node} type={type} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
