/* eslint-disable react/no-array-index-key */
import React from 'react';

interface LoadingProps {
  prefixCls: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { prefixCls } = props;
  return (
    <span className={`${prefixCls}-dot`}>
      {Array.from({ length: 3 }).map<React.ReactNode>((_, i) => (
        <i className={`${prefixCls}-dot-item`} key={`dot-item-${i}`} />
      ))}
    </span>
  );
};

export default Loading;
