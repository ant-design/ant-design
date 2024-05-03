import React from 'react';

interface LoadingProps {
  prefixCls?: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { prefixCls } = props;
  return (
    <span className={`${prefixCls}-dot`}>
      <i className={`${prefixCls}-dot-item`} key={1} />
      <i className={`${prefixCls}-dot-item`} key={2} />
      <i className={`${prefixCls}-dot-item`} key={3} />
    </span>
  );
};

export default Loading;
