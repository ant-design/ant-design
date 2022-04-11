import React, { CSSProperties } from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export default () => (
  <Carousel>
    {' '}
    <div>
      {' '}
      <h3 style={contentStyle as CSSProperties}>1</h3>{' '}
    </div>{' '}
    <div>
      {' '}
      <h3 style={contentStyle as CSSProperties}>2</h3>{' '}
    </div>{' '}
    <div>
      {' '}
      <h3 style={contentStyle as CSSProperties}>3</h3>{' '}
    </div>{' '}
    <div>
      {' '}
      <h3 style={contentStyle as CSSProperties}>4</h3>{' '}
    </div>{' '}
  </Carousel>
);
