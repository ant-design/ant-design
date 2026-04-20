import React from 'react';
import { Tooltip } from 'antd';
import { createStyles } from 'antd-style';

import { sponsors } from './sponsors';

const useStyle = createStyles(({ cssVar, css }) => ({
  wrap: css`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 3px 6px;
    border-radius: 20px;
    border: 1px solid ${cssVar.colorBorderSecondary};
    background: ${cssVar.colorFillQuaternary};
  `,
  avatar: css`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: contain;
    background: ${cssVar.colorBgContainer};
  `,
}));

const SponsorsNav: React.FC = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.wrap} aria-label="Sponsors">
      {sponsors.map((sponsor) => (
        <Tooltip key={sponsor.name} title={sponsor.name} destroyOnHidden>
          <a href={sponsor.url} target="_blank" rel="noreferrer">
            <img src={sponsor.logo} alt={sponsor.name} className={styles.avatar} />
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default SponsorsNav;
