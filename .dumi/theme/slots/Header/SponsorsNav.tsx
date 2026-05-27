import React from 'react';
import { Popover } from 'antd';
import { createStyles } from 'antd-style';

import useLocale from '../../../hooks/useLocale';
import SponsorCard from './SponsorCard';
import { getSponsorUrl, sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    margin-inline-start: 8px;
    margin-inline-end: 12px;
  `,
  avatarLink: css`
    display: block;
    border-radius: 50%;
    margin-inline-start: -6px;
    border: 2px solid ${cssVar.colorBgLayout};
    position: relative;
    z-index: 0;

    &:first-child {
      margin-inline-start: 0;
    }

    &:hover,
    &:focus-within {
      z-index: 1;

      img {
        transform: translateY(-2px);
        opacity: 1;
      }
    }
  `,
  avatar: css`
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
    opacity: 0.5;
    transition:
      transform ${cssVar.motionDurationFast},
      opacity ${cssVar.motionDurationSlow};
  `,
}));

const SponsorsNav: React.FC = () => {
  const { styles } = useStyle();
  const [, lang] = useLocale();

  return (
    <div className={styles.wrap} aria-label="Sponsors">
      {sponsors.map((sponsor) => (
        <Popover
          key={sponsor.name}
          content={<SponsorCard sponsor={sponsor} lang={lang} />}
          trigger={['hover', 'focus']}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          destroyOnHidden
        >
          <a
            href={getSponsorUrl(sponsor.url, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.avatarLink}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className={styles.avatar}
              draggable={false}
            />
          </a>
        </Popover>
      ))}
    </div>
  );
};

export default SponsorsNav;
