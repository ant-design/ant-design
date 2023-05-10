import * as React from 'react';
import { Row, Col, Typography } from 'antd';
import { css } from '@emotion/react';
import type { Recommendation } from './util';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    card: css`
      height: 300px;
      background-size: 100% 100%;
      background-position: center;
      position: relative;
      overflow: hidden;

      &:before {
        position: absolute;
        background: linear-gradient(
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.25) 40%,
          rgba(0, 0, 0, 0.65) 100%
        );
        opacity: 0.3;
        transition: all 0.5s;
        content: '';
        pointer-events: none;
        inset: 0;
      }

      &:hover {
        &:before {
          opacity: 1;
        }

        .intro {
          transform: translate3d(0, 0, 0);

          h4${token.antCls}-typography {
            padding-bottom: 0;
          }
        }
      }

      .intro {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translate3d(0, 100%, 0);
        transition: all ${token.motionDurationSlow};

        ${token.antCls}-typography {
          margin: 0;
          color: #fff;
          font-weight: normal;
          text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
          transition: all ${token.motionDurationSlow};
        }

        h4${token.antCls}-typography {
          position: absolute;
          padding: 0 ${token.paddingMD}px ${token.paddingMD}px;
          transform: translate3d(0, -100%, 0);
        }

        div${token.antCls}-typography {
          padding: ${token.paddingXS}px ${token.paddingMD}px ${token.paddingLG}px;
        }
      }
    `,
  };
};

export interface RecommendsProps {
  recommendations?: Recommendation[];
}

export default function Recommends({ recommendations = [] }: RecommendsProps) {
  const { token } = useSiteToken();
  const style = useStyle();

  return (
    <Row gutter={token.marginLG}>
      {new Array(3).fill(null).map((_, index) => {
        const data = recommendations[index];

        return (
          <Col key={index} span={8}>
            {data ? (
              <div css={style.card} style={{ backgroundImage: `url(${data.img})` }}>
                <div className="intro">
                  <Typography.Title level={4}>{data?.title}</Typography.Title>
                  <Typography.Paragraph>{data.description}</Typography.Paragraph>
                </div>
              </div>
            ) : null}
          </Col>
        );
      })}
    </Row>
  );
}
