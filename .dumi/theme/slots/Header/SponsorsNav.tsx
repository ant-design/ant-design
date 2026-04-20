import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { createStyles } from 'antd-style';

import useLocale from '../../../hooks/useLocale';
import { sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, token, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    margin-inline-start: 8px;
    margin-inline-end: 6px;
  `,
  avatarLink: css`
    display: block;
    border-radius: 50%;
    margin-inline-start: -6px;
    border: 2px solid ${cssVar.colorBgLayout};
    transition: transform ${cssVar.motionDurationFast};
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
    width: 260px;
  `,
  cardTop: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${cssVar.colorBorderSecondary};
    margin-bottom: 12px;
  `,
  cardLogo: css`
    width: 52px;
    height: 52px;
    border-radius: 12px;
    object-fit: contain;
    background: ${cssVar.colorFillQuaternary};
    border: 1px solid ${cssVar.colorBorderSecondary};
    padding: 6px;
    box-sizing: border-box;
    flex-shrink: 0;
  `,
  cardName: css`
    font-size: 15px;
    font-weight: 600;
    color: ${cssVar.colorText};
    line-height: 1.4;
  `,
  cardDesc: css`
    font-size: 13px;
    color: ${cssVar.colorTextSecondary};
    line-height: 1.6;
    margin-bottom: 12px;
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
    font-size: 12px;
    color: ${cssVar.colorTextTertiary};
  `,
  heartIcon: css`
    color: #ff4d4f;
    font-size: 11px;
  `,
  visitBtn: css`
    font-size: 13px;
    height: 28px;
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
  const [, lang] = useLocale();

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
              description={sponsor.description[lang as 'cn' | 'en'] ?? sponsor.description.en}
            />
          }
          trigger="hover"
          placement="bottom"
          destroyOnHidden
        >
          <a
            href={sponsor.url}
            target="_blank"
            rel="noreferrer"
            className={styles.avatarLink}
          >
            <img src={sponsor.logo} alt={sponsor.name} className={styles.avatar} />
          </a>
        </Popover>
      ))}
    </div>
  );
};

export default SponsorsNav;
