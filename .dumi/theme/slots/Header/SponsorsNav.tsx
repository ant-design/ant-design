import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
import { createStyles } from 'antd-style';

import { sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, token, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    border-radius: 20px;
    border: 1px solid ${cssVar.colorBorderSecondary};
    background: ${cssVar.colorFillQuaternary};
    cursor: default;
    transition: background ${cssVar.motionDurationSlow};

    &:hover {
      background: ${cssVar.colorFillTertiary};
    }
  `,
  label: css`
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: ${cssVar.colorTextTertiary};
    white-space: nowrap;
  `,
  heartIcon: css`
    color: #ff4d4f;
    font-size: 10px;
  `,
  avatar: css`
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
    cursor: pointer;
    transition: transform ${cssVar.motionDurationFast};

    &:hover {
      transform: scale(1.15);
    }
  `,
  card: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 200px;
  `,
  cardLogo: css`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    object-fit: contain;
    background: ${cssVar.colorFillQuaternary};
    border: 1px solid ${cssVar.colorBorderSecondary};
    padding: 4px;
    box-sizing: border-box;
  `,
  cardHeader: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  cardLink: css`
    font-size: 12px;
    color: ${token.colorPrimary};
  `,
}));

interface SponsorCardProps {
  name: string;
  logo: string;
  url: string;
  description: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ name, logo, url, description }) => {
  const { styles } = useStyle();
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img src={logo} alt={name} className={styles.cardLogo} />
        <div>
          <Typography.Text strong style={{ fontSize: 13 }}>
            {name}
          </Typography.Text>
        </div>
      </div>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {description}
      </Typography.Text>
      <a href={url} target="_blank" rel="noreferrer" className={styles.cardLink}>
        Visit website →
      </a>
    </div>
  );
};

const SponsorsNav: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.wrap} aria-label="Sponsors">
      <span className={styles.label}>
        <HeartFilled className={styles.heartIcon} />
        Sponsors
      </span>
      {sponsors.map((sponsor) => (
        <Popover
          key={sponsor.name}
          content={
            <SponsorCard
              name={sponsor.name}
              logo={sponsor.logo}
              url={sponsor.url}
              description={sponsor.description}
            />
          }
          trigger="hover"
          placement="bottomRight"
          destroyOnHidden
        >
          <img src={sponsor.logo} alt={sponsor.name} className={styles.avatar} />
        </Popover>
      ))}
    </div>
  );
};

export default SponsorsNav;
