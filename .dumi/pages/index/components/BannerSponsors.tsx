import React from 'react';
import { Popover } from 'antd';
import { createStyles } from 'antd-style';

import useLocale from '../../../hooks/useLocale';
import SponsorCard from '../../../theme/slots/Header/SponsorCard';
import { getSponsorUrl, sponsors } from '../../../theme/slots/Header/sponsors';
import SiteContext from '../../../theme/slots/SiteContext';

const useStyle = createStyles(({ cssVar, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-top: 20px;
    border-top: 1px solid ${cssVar.colorBorderSecondary};
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `,
  label: css`
    font-size: 11px;
    color: ${cssVar.colorTextQuaternary};
    margin-inline-end: 16px;
    white-space: nowrap;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  `,
  sponsorItem: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 8px;
    text-decoration: none;
    color: ${cssVar.colorTextSecondary};
    transition: background-color ${cssVar.motionDurationFast};

    &:hover {
      background: ${cssVar.colorFillSecondary};
    }
  `,
  sponsorLogo: css`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
    border: 1px solid ${cssVar.colorBorderSecondary};
  `,
  sponsorName: css`
    font-size: 13px;
    font-weight: 500;
    color: ${cssVar.colorTextSecondary};
  `,
  divider: css`
    width: 1px;
    height: 16px;
    background: ${cssVar.colorBorderSecondary};
    margin: 0 4px;
  `,
}));

const BannerSponsors: React.FC = () => {
  const { styles } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = React.use(SiteContext);

  return (
    <div className={styles.wrap}>
      {!isMobile && <span className={styles.label}>Sponsors</span>}
      {sponsors.map((sponsor, index) => (
        <React.Fragment key={sponsor.name}>
          {index > 0 && <div className={styles.divider} />}
          <Popover
            content={<SponsorCard sponsor={sponsor} lang={lang} />}
            trigger={['hover', 'focus']}
            placement="top"
            arrow={{ pointAtCenter: true }}
            destroyOnHidden
          >
            <a
              href={getSponsorUrl(sponsor.url, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sponsorItem}
            >
              <img src={sponsor.logo} alt={sponsor.name} className={styles.sponsorLogo} />
              {!isMobile && <span className={styles.sponsorName}>{sponsor.name}</span>}
            </a>
          </Popover>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BannerSponsors;
