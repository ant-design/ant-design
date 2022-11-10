import useSiteToken from '../../../hooks/useSiteToken';
import React from 'react';
import {
  Button,
  Space,
  Typography,
  Tour,
  Tag,
  DatePicker,
  Alert,
  Modal,
  FloatButton,
  Progress,
} from 'antd';
import dayjs from 'dayjs';
import { CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';

const PLACEHOLDER_WIDTH = 400;

const SAMPLE_CONTENT =
  'Ant Design 5.0 use CSS-in-JS technology to provide dynamic & mix theme ability. And which use component level CSS-in-JS solution get your application a better performance.';

const COMPONENTS: {
  title: React.ReactNode;
  type: 'new' | 'update';
  node: React.ReactNode;
}[] = [
  {
    title: 'Modal',
    type: 'update',
    node: (
      <Modal._InternalPanelDoNotUseOrYouWillBeFired title="Ant Design 5.0" width={300}>
        {SAMPLE_CONTENT}
      </Modal._InternalPanelDoNotUseOrYouWillBeFired>
    ),
  },

  {
    title: 'DatePicker',
    type: 'update',
    node: (
      <DatePicker._InternalPanelDoNotUseOrYouWillBeFired
        showToday={false}
        presets={[
          { label: 'Yesterday', value: dayjs().add(-1, 'd') },
          { label: 'Last Week', value: dayjs().add(-7, 'd') },
          { label: 'Last Month', value: dayjs().add(-1, 'month') },
          { label: 'Last Year', value: dayjs().add(-1, 'year') },
        ]}
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
          <Progress type="circle" trailColor="#e6f4ff" percent={60} width={14} />
          In Progress
        </Space>
        <Space>
          <Progress type="circle" percent={100} width={14} />
          Success
        </Space>
        <Space>
          <Progress type="circle" status="exception" percent={88} width={14} />
          Task Failed
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
        description="A quick guide for new come user about how to use app."
        style={{ width: 350 }}
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
        description={SAMPLE_CONTENT}
        closable
      />
    ),
  },
];

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    card: css`
      border-radius: ${token.borderRadius}px;
      background: #f5f8ff;
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
  };
};

export default function ComponentsList() {
  const { token } = useSiteToken();
  const styles = useStyle();

  return (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', columnGap: token.paddingLG }}>
        {COMPONENTS.map(({ title, node, type }, index) => {
          const tagColor = type === 'new' ? 'processing' : 'warning';
          const tagText = type === 'new' ? 'New' : 'Update';

          return (
            <div key={index} css={styles.card} style={{ pointerEvents: 'none' }}>
              {/* Decorator */}
              <div
                css={styles.cardCircle}
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
        })}
      </div>
    </div>
  );
}
