import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Card, Typography } from 'antd';
import { createStyles } from 'antd-style';
import useLocale from '../../../hooks/useLocale';

const { Paragraph } = Typography;

const useStyle = createStyles(({ token, css }) => ({
  card: css`
      position: relative;
      overflow: hidden;

      .ant-card-cover {
        overflow: hidden;
      }
      img {
        transition: all ${token.motionDurationSlow} ease-out;
      }

      &:hover img {
        transform: scale(1.3);
        `,
  badge: css`
      position: absolute;
      top: 8px;
      right: 8px;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      color: #fff;
      font-size: ${token.fontSizeSM}px;
      line-height: 1;
      background: rgba(0, 0, 0, 0.65);
      border-radius: ${token.borderRadiusLG}px;
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
      display: inline-flex;
      column-gap: ${token.paddingXXS}px;
    `,
}));

export type Resource = {
  title: string;
  description: string;
  cover: string;
  src: string;
  official?: boolean;
};

const locales = {
  cn: {
    official: '官方',
    thirdPart: '非官方',
    thirdPartDesc: '非官方产品，请自行确认可用性',
  },
  en: {
    official: 'Official',
    thirdPart: 'Third Party',
    thirdPartDesc: 'Unofficial product, please take care confirm availability',
  },
};

export type ResourceCardProps = {
  resource: Resource;
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { styles } = useStyle();
  const [locale] = useLocale(locales);

  const { title, description, cover, src, official } = resource;

  const badge = official ? (
    <div className={styles.badge}>{locale.official}</div>
  ) : (
    <Tooltip title={locale.thirdPartDesc}>
      <div className={styles.badge}>
        <ExclamationCircleOutlined />
        {locale.thirdPart}
      </div>
    </Tooltip>
  );

  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <a className={styles.card} target="_blank" href={src} rel="noreferrer">
        <Card hoverable className={styles.card} cover={<img src={cover} alt={title} />}>
          <Card.Meta
            title={title}
            description={
              <Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 1 }} title={description}>
                {description}
              </Paragraph>
            }
          />
          {badge}
        </Card>
      </a>
    </Col>
  );
};

export type ResourceCardsProps = {
  resources: Resource[];
};

const ResourceCards: React.FC<ResourceCardsProps> = ({ resources }) => (
  <Row gutter={[24, 24]}>
    {resources.map((item) => (
      <ResourceCard resource={item} key={item?.title} />
    ))}
  </Row>
);

export default ResourceCards;
