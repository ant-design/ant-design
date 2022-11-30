import * as React from 'react';
import { Skeleton, Typography } from 'antd';
import { css } from '@emotion/react';
import type { Extra, Icon } from './util';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    card: css`
      border: ${token.lineWidth}px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadiusLG}px;
      padding-block: ${token.paddingMD}px;
      padding-inline: ${token.paddingLG}px;
      flex: 1 1 0;
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      text-decoration: none;
      transition: all ${token.motionDurationSlow};
      background: ${token.colorBgContainer};

      &:hover {
        box-shadow: ${token.boxShadowCard};
      }
    `,
  };
};

export interface BannerRecommendsProps {
  extras?: Extra[];
  icons?: Icon[];
}

export default function BannerRecommends({ extras = [], icons = [] }: BannerRecommendsProps) {
  const style = useStyle();
  const first3 = extras.length === 0 ? Array(3).fill(null) : extras.slice(0, 3);
  const { token } = useSiteToken();

  return (
    <div
      style={{
        maxWidth: 1208,
        marginInline: 'auto',
        boxSizing: 'border-box',
        paddingInline: token.marginXXL,
        display: 'flex',
        columnGap: token.paddingMD * 2,
        alignItems: 'stretch',
        textAlign: 'start',
      }}
    >
      {first3.map((extra) => {
        if (!extra) {
          return <Skeleton key={extra.title} />;
        }
        const icon = icons.find((i) => i.name === extra.source);
        return (
          <a key={extra.title} href={extra.href} target="_blank" css={style.card} rel="noreferrer">
            <Typography.Title level={5}>{extra.title}</Typography.Title>
            <Typography.Paragraph type="secondary" style={{ flex: 'auto' }}>
              {extra.description}
            </Typography.Paragraph>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>{extra.date}</Typography.Text>
              {icon && <img src={icon.href} style={{ height: token.fontSize }} alt="banner" />}
            </div>
          </a>
        );
      })}
    </div>
  );
}
