import React from 'react';

export interface TrainingIconProps {
  prefixCls: string;
  loading?: boolean;
}

const TrainingIcon = ({ prefixCls }: TrainingIconProps) => {
  return (
    <div className={`${prefixCls}-training-icon`}>
      <div className="bounce-1" />
      <div className="bounce-2" />
      <div className="bounce-3" />
    </div>
  );
};

export default TrainingIcon;
