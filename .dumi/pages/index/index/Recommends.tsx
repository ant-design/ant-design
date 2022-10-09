import * as React from 'react';
import { Row, Col, theme } from 'antd';
import type { Recommendation } from './util';

export interface RecommendsProps {
  recommendations?: Recommendation[];
}

export default function Recommends({ recommendations = [] }: RecommendsProps) {
  const { token } = theme.useToken();

  return (
    <Row gutter={token.gridSpaceXXL}>
      {new Array(3).fill(null).map((_, index) => {
        const data = recommendations[index];

        return (
          <Col key={index} span={8}>
            {data ? (
              <div style={{ height: 300, border: '1px solid red' }}>
                <h4>{data.title}</h4>
                <p>{data.description}</p>
              </div>
            ) : null}
          </Col>
        );
      })}
    </Row>
  );
}
