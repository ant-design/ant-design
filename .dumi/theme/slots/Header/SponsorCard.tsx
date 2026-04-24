import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { createStyles } from 'antd-style';

import type { Sponsor } from './sponsors';
import { getSponsorDescription, getSponsorUrl } from './sponsors';

export const useCardStyle = createStyles(({ cssVar, token, css }) => ({
  card: css`
    width: 320px;
    max-width: 320px;
  `,
  cardBody: css`
    display: flex;
    gap: 14px;
    margin-bottom: 12px;
  `,
  cardLogo: css`
    width: 64px;
    height: 64px;
    border-radius: 14px;
    object-fit: contain;
    background: ${cssVar.colorFillQuaternary};
    border: 1px solid ${cssVar.colorBorderSecondary};
    padding: 8px;
    box-sizing: border-box;
    flex-shrink: 0;
  `,
  cardInfo: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-width: 0;
  `,
  cardName: css`
    font-size: 15px;
    font-weight: 600;
    color: ${cssVar.colorText};
    a& {
      text-decoration: none;
      &:hover {
        color: ${token.colorPrimary};
      }
    }
  `,
  cardDesc: css`
    font-size: 13px;
    color: ${cssVar.colorTextSecondary};
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
    font-size: 12px;
  `,
  visitBtn: css`
    font-size: 13px;
    height: 28px;
    padding-inline: 10px;
    color: ${token.colorPrimary} !important;
  `,
  becomeBtn: css`
    font-size: 13px;
    height: 28px;
    padding-inline: 10px;
    color: ${cssVar.colorTextTertiary} !important;
  `,
}));

export interface SponsorCardProps {
  sponsor: Sponsor;
  lang: 'cn' | 'en';
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, lang }) => {
  const { styles } = useCardStyle();
  const isCN = lang === 'cn';
  const url = getSponsorUrl(sponsor.url, lang);
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img src={sponsor.logo} alt={sponsor.name} className={styles.cardLogo} draggable={false} />
        <div className={styles.cardInfo}>
          <a
            href={sponsor.opencollective}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardName}
          >
            {sponsor.name}
          </a>
          <span className={styles.cardDesc}>
            {getSponsorDescription(sponsor.description, lang)}
          </span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.sponsorLabel}>
          <HeartFilled className={styles.heartIcon} />
          {isCN ? '赞助商' : 'Sponsor'}
        </span>
        <div>
          <Button
            type="link"
            size="small"
            href="https://opencollective.com/ant-design/contribute/sponsors-218"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.becomeBtn}
          >
            {isCN ? '成为赞助商' : 'Become a sponsor'}
          </Button>
          <Button
            type="link"
            size="small"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            {isCN ? '访问官网 →' : 'Visit website →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCard;
