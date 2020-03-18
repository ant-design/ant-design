import React from 'react';
import Icon from '@ant-design/icons';

export const DefaultIcon = props => {
  const SVGIcon = () => (
    <svg width={21} height={21} viewBox="0 0 21 21" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle fill="#222" cx={10.5} cy={10.5} r={10.5} />
        <path
          d="M13.396 11c0-3.019-1.832-5.584-4.394-6.566A6.427 6.427 0 0111.304 4C15.002 4 18 7.135 18 11c0 3.866-2.998 7-6.698 7A6.42 6.42 0 019 17.566c2.564-.98 4.396-3.545 4.396-6.566z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
  return <Icon component={SVGIcon} {...props} />;
};

export const DarkIcon = props => {
  const SVGIcon = () => (
    <svg width={21} height={21} viewBox="0 0 21 21" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#222"
          fillRule="nonzero"
          d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z"
        />
        <circle stroke="#FFF" strokeWidth={1.5} cx={10.5} cy={10.5} r={4} />
      </g>
    </svg>
  );
  return <Icon component={SVGIcon} {...props} />;
};
