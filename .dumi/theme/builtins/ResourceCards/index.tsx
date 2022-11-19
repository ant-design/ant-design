import React, { type FC } from 'react';
import { Col, Row } from 'antd';
import { css } from '@emotion/react';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();
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
};

export type Resource = {
  title: string;
  description: string;
  cover: string;
  src: string;
  official?: boolean;
};

export type ResourceCardProps = {
  resource: Resource;
};

const ResourceCard: FC<ResourceCardProps> = ({ resource }) => {
  const styles = useStyle();

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
      <a css={styles.card} target="_blank" href={src}>
        <img
          css={styles.image}
          src={cover}
          alt={title}
          style={coverColor ? { backgroundColor: coverColor } : {}}
        />
        {official && <div css={styles.badge}>Official</div>}
        <p css={styles.title}>{title}</p>
        <p css={styles.description}>{description}</p>
      </a>
    </Col>
  );
};

export type ResourceCardsProps = {
  resources: Resource[];
};

const ResourceCards: FC<ResourceCardsProps> = ({ resources }) => {
  return (
    <Row style={{ margin: '-12px -12px 0 -12px' }}>
      {resources.map((item) => (
        <ResourceCard resource={item} key={item.title} />
      ))}
    </Row>
  );
};

export default ResourceCards;
