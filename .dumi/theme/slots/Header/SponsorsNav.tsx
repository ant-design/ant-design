import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Button, Popover, Typography } from 'antd';
import { createStyles } from 'antd-style';

import { sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, token, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    margin-inline-end: 6px;
  `,
  avatarLink: css`
    display: block;
    border-radius: 50%;
    margin-inline-start: -6px;
    border: 2px solid ${cssVar.colorBgLayout};
    transition: transform ${cssVar.motionDurationFast}, z-index 0s;
    position: relative;
    z-index: 0;

    &:first-child {
      margin-inline-start: 0;
    }

    &:hover {
      transform: translateY(-2px);
      z-index: 1;
    }
  `,
  avatar: css`
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
  `,
  card: css`
    width: 220px;
  `,
  cardTop: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${cssVar.colorBorderSecondary};
    margin-bottom: 10px;
  `,
  cardLogo: css`
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: contain;
    background: ${cssVar.colorFillQuaternary};
    border: 1px solid ${cssVar.colorBorderSecondary};
    padding: 6px;
    box-sizing: border-box;
    flex-shrink: 0;
  `,
  cardName: css`
    font-size: 14px;
    font-weight: 600;
    color: ${cssVar.colorText};
    line-height: 1.4;
  `,
  cardDesc: css`
    font-size: 12px;
    color: ${cssVar.colorTextSecondary};
    line-height: 1.6;
    margin-bottom: 10px;
  `,
  cardFooter: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  sponsorLabel: css`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: ${cssVar.colorTextTertiary};
  `,
  heartIcon: css`
    color: #ff4d4f;
    font-size: 10px;
  `,
  visitBtn: css`
    font-size: 12px;
    height: 26px;
    padding-inline: 10px;
    color: ${token.colorPrimary} !important;
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
      <div className={styles.cardTop}>
        <img src={logo} alt={name} className={styles.cardLogo} />
        <span className={styles.cardName}>{name}</span>
      </div>
      <div className={styles.cardDesc}>{description}</div>
      <div className={styles.cardFooter}>
        <span className={styles.sponsorLabel}>
          <HeartFilled className={styles.heartIcon} />
          Sponsor
        </span>
        <Button
          type="link"
          size="small"
          href={url}
          target="_blank"
          rel="noreferrer"
          className={styles.visitBtn}
        >
          Visit website →
        </Button>
      </div>
    </div>
  );
};

const SponsorsNav: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.wrap} aria-label="Sponsors">
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
          placement="bottom"
          destroyOnHidden
          arrow={false}
        >
          <a
            href={sponsor.url}
            target="_blank"
            rel="noreferrer"
            className={styles.avatarLink}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={sponsor.logo} alt={sponsor.name} className={styles.avatar} />
          </a>
        </Popover>
      ))}
    </div>
  );
};

export default SponsorsNav;
