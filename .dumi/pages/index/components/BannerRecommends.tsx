import * as React from 'react';
import type { Extra, Icon } from './util';
import useSiteToken from '../../../hooks/useSiteToken';
import { Col, Row, Card, Typography } from 'antd';
import { css } from '@emotion/react';

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
  const first3 = extras.slice(0, 3);
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
      {first3.map((extra, index) => {
        const icon = icons.find(icon => icon.name === extra.source);

        return (
          <a key={index} href={extra.href} target="_blank" css={style.card}>
            <Typography.Title level={5}>{extra.title}</Typography.Title>
            <Typography.Paragraph type="secondary" style={{ flex: 'auto' }}>
              {extra.description}
            </Typography.Paragraph>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>{extra.date}</Typography.Text>
              {icon && <img src={icon.href} style={{ height: token.fontSize }} />}
            </div>
          </a>
        );
      })}
    </div>
  );
}
