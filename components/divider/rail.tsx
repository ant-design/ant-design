import * as React from 'react';
export interface RailProps {
  prefixCls: string;
}

const Rail: React.FC<React.PropsWithChildren<RailProps>> = (props) => {
  const { prefixCls, children } = props;
  const railCls = `${prefixCls}-rail`;

  // ============================= render =============================

  return (
    <div className={`${prefixCls}-rail-wrapper`}>
      <div className={`${railCls}-start`} />
      {children}
      <div className={`${railCls}-end`} />
    </div>
  );
};

export default Rail;
