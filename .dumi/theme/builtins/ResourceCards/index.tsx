import React from 'react';
import { createStyles } from 'antd-style';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ token, css }) => {
  const { boxShadowSecondary } = token;

  return {
    card: css`
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: inherit;
      list-style: none;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      cursor: pointer;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: ${boxShadowSecondary};
      }
    `,
    image: css`
      width: calc(100% + 2px);
      max-width: none;
      height: 184px;
      margin: -1px -1px 0;
      object-fit: cover;
    `,
    badge: css`
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 8px;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 1px;
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.2);
      display: inline-flex;
      column-gap: 4px;
    `,
    title: css`
      margin: 16px 20px 8px;
      color: #0d1a26;
      font-size: 20px;
      line-height: 28px;
    `,
    description: css`
      margin: 0 20px 20px;
      color: #697b8c;
      font-size: 14px;
      line-height: 22px;
    `,
  };
});

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
    thirdPart: 'Third Part',
    thirdPartDesc: 'Unofficial product, please take care confirm availability',
  },
};

export type ResourceCardProps = {
  resource: Resource;
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { styles } = useStyle();
  const [locale] = useLocale(locales);

  const { title: titleStr, description, cover, src, official } = resource;

  let coverColor: string | null = null;
  let title: string = titleStr;
  const titleMatch = titleStr.match(/(.*)(#[\dA-Fa-f]{6})/);
  if (titleMatch) {
    title = titleMatch[1].trim();
    // eslint-disable-next-line prefer-destructuring
    coverColor = titleMatch[2];
  }

  return (
    <Col xs={24} sm={12} md={8} lg={6} style={{ padding: 12 }}>
      <a className={styles.card} target="_blank" href={src} rel="noreferrer">
        <img
          className={styles.image}
          src={cover}
          alt={title}
          style={coverColor ? { backgroundColor: coverColor } : {}}
        />
        {official ? (
          <div className={styles.badge}>{locale.official}</div>
        ) : (
          <Tooltip title={locale.thirdPartDesc}>
            <div className={styles.badge}>
              <ExclamationCircleOutlined />
              {locale.thirdPart}
            </div>
          </Tooltip>
        )}
        <p className={styles?.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </a>
    </Col>
  );
};

export type ResourceCardsProps = {
  resources: Resource[];
};

const ResourceCards: React.FC<ResourceCardsProps> = ({ resources }) => (
  <Row style={{ margin: '-12px -12px 0 -12px' }}>
    {resources.map((item) => (
      <ResourceCard resource={item} key={item?.title} />
    ))}
  </Row>
);

export default ResourceCards;
