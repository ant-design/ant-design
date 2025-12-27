import React from 'react';
import { CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import {
  Card,
  Carousel,
  DatePicker,
  Flex,
  FloatButton,
  Masonry,
  Modal,
  Splitter,
  Tag,
  Tour,
  Typography,
} from 'antd';
import { createStyles, css } from 'antd-style';
import { clsx } from 'clsx';
import dayjs from 'dayjs';

import useLocale from '../../../hooks/useLocale';
import SiteContext from '../../../theme/slots/SiteContext';
import { DarkContext } from './../../../hooks/useDark';
import { getCarouselStyle } from './util';

const { _InternalPanelDoNotUseOrYouWillBeFired: ModalDoNotUseOrYouWillBeFired } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: DatePickerDoNotUseOrYouWillBeFired } = DatePicker;
const { _InternalPanelDoNotUseOrYouWillBeFired: TourDoNotUseOrYouWillBeFired } = Tour;
const { _InternalPanelDoNotUseOrYouWillBeFired: FloatButtonDoNotUseOrYouWillBeFired } = FloatButton;

const SAMPLE_CONTENT_EN =
  'Ant Design use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.';

const SAMPLE_CONTENT_CN =
  'Ant Design 使用 CSS-in-JS 技术以提供动态与混合主题的能力。与此同时，我们使用组件级别的 CSS-in-JS 解决方案，让你的应用获得更好的性能。';

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

const useStyle = createStyles(({ cssVar }, isDark: boolean) => {
  const { carousel } = getCarouselStyle();
  return {
    card: css`
      border-radius: ${cssVar.borderRadius};
      border: 1px solid ${isDark ? cssVar.colorBorder : 'transparent'};
      background-color: ${isDark ? cssVar.colorBgContainer : '#f5f8ff'};
      padding: ${cssVar.paddingXL};
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
    nodeWrap: css`
      margin-top: ${cssVar.paddingLG};
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    carousel,
    componentsList: css`
      width: 100%;
      overflow: hidden;
    `,
    mobileComponentsList: css`
      margin: 0 ${cssVar.margin};
    `,
  };
});

const ComponentItem: React.FC<ComponentItemProps> = ({ title, node, type, index }) => {
  const tagColor = type === 'new' ? 'processing' : 'warning';
  const [locale] = useLocale(locales);
  const tagText = type === 'new' ? locale.new : locale.update;
  const isDark = React.use(DarkContext);
  const { isMobile } = React.use(SiteContext);
  const { styles } = useStyle(isDark);
  return (
    <div className={clsx(styles.card, isMobile && styles.mobileCard)}>
      {/* Decorator */}
      <div
        className={styles.cardCircle}
        style={{ insetInlineEnd: (index % 2) * -20 - 20, bottom: (index % 3) * -40 - 20 }}
      />

      {/* Title */}
      <Flex align="center" gap="small">
        <Typography.Title level={4} style={{ fontWeight: 'normal', margin: 0 }}>
          {title}
        </Typography.Title>
        <Tag color={tagColor}>{tagText}</Tag>
      </Flex>
      <div className={styles.nodeWrap}>{node}</div>
    </div>
  );
};

interface ComponentItemProps {
  title: React.ReactNode;
  node: React.ReactNode;
  type: 'new' | 'update';
  index: number;
}

const ComponentsList: React.FC = () => {
  const { styles } = useStyle();
  const [locale] = useLocale(locales);
  const { isMobile } = React.use(SiteContext);
  const COMPONENTS = React.useMemo<Omit<ComponentItemProps, 'index'>[]>(
    () => [
      {
        title: 'Modal',
        type: 'update',
        node: (
          <ModalDoNotUseOrYouWillBeFired title="Ant Design" width={300}>
            {locale.sampleContent}
          </ModalDoNotUseOrYouWillBeFired>
        ),
      },

      {
        title: 'DatePicker',
        type: 'update',
        node: (
          <DatePickerDoNotUseOrYouWillBeFired
            value={dayjs('2022-11-18 14:00:00')}
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
          />
        ),
      },

      // {
      //   title: 'Progress',
      //   type: 'update',
      //   node: (
      //     <Flex gap="small" vertical>
      //       <Flex gap="small" align="center">
      //         <Progress type="circle" railColor="#e6f4ff" percent={60} size={14} />
      //         {locale.inProgress}
      //       </Flex>
      //       <Flex gap="small" align="center">
      //         <Progress type="circle" percent={100} size={14} />
      //         {locale.success}
      //       </Flex>
      //       <Flex gap="small" align="center">
      //         <Progress type="circle" status="exception" percent={88} size={14} />
      //         {locale.taskFailed}
      //       </Flex>
      //     </Flex>
      //   ),
      // },

      {
        title: 'Tour',
        type: 'update',
        node: (
          <TourDoNotUseOrYouWillBeFired
            title="Ant Design"
            description={locale.tour}
            style={{ width: isMobile ? 'auto' : 350 }}
            current={3}
            total={9}
          />
        ),
      },

      {
        title: 'FloatButton',
        type: 'update',
        node: (
          <Flex align="center" gap="large">
            <FloatButtonDoNotUseOrYouWillBeFired
              shape="square"
              items={[
                { icon: <QuestionCircleOutlined /> },
                { icon: <CustomerServiceOutlined /> },
                { icon: <SyncOutlined /> },
              ]}
            />
            <FloatButtonDoNotUseOrYouWillBeFired backTop />
            <FloatButtonDoNotUseOrYouWillBeFired
              items={[
                { icon: <QuestionCircleOutlined /> },
                { icon: <CustomerServiceOutlined /> },
                { icon: <SyncOutlined /> },
              ]}
            />
          </Flex>
        ),
      },

      // {
      //   title: 'Steps',
      //   type: 'update',
      //   node: <Button style={{ width: PLACEHOLDER_WIDTH }}>Placeholder</Button>,
      // },

      {
        title: 'Splitter',
        type: 'new',
        node: (
          <Splitter
            style={{
              height: 200,
              width: 300,
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Splitter.Panel defaultSize="40%" min="20%" max="70%">
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
                  First
                </Typography.Title>
              </Flex>
            </Splitter.Panel>

            <Splitter.Panel>
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
                  Second
                </Typography.Title>
              </Flex>
            </Splitter.Panel>
          </Splitter>
        ),
      },

      {
        title: 'Masonry',
        type: 'new',
        node: (
          <Masonry
            columns={2}
            gutter={8}
            style={{ width: '300px', height: '320px' }}
            items={[
              { key: '1', data: 80 },
              { key: '2', data: 60 },
              { key: '3', data: 40 },
              { key: '4', data: 120 },
              { key: '5', data: 90 },
              { key: '6', data: 40 },
              { key: '7', data: 60 },
              { key: '8', data: 70 },
              { key: '9', data: 120 },
            ]}
            itemRender={({ data, index }) => (
              <Card size="small" style={{ height: data }}>
                {index + 1}
              </Card>
            )}
          />
        ),
      },

      // {
      //   title: 'Alert',
      //   type: 'update',
      //   node: (
      //     <Alert
      //       style={{ width: 400 }}
      //       title="Ant Design"
      //       description={locale.sampleContent}
      //       closable={{ closeIcon: true, disabled: true }}
      //     />
      //   ),
      // },
    ],
    [
      isMobile,
      locale.inProgress,
      locale.lastMonth,
      locale.lastWeek,
      locale.lastYear,
      locale.sampleContent,
      locale.success,
      locale.taskFailed,
      locale.tour,
      locale.yesterday,
    ],
  );

  return isMobile ? (
    <div className={styles.mobileComponentsList}>
      <Carousel className={styles.carousel}>
        {COMPONENTS.map<React.ReactNode>(({ title, node, type }, index) => (
          <ComponentItem
            title={title}
            node={node}
            type={type}
            index={index}
            key={`mobile-item-${index}`}
          />
        ))}
      </Carousel>
    </div>
  ) : (
    <Flex justify="center" className={styles.componentsList}>
      <Flex align="stretch" gap="large">
        {COMPONENTS.map<React.ReactNode>(({ title, node, type }, index) => (
          <ComponentItem
            title={title}
            node={node}
            type={type}
            index={index}
            key={`desktop-item-${index}`}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ComponentsList;
