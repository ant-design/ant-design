import * as React from 'react';

export interface PanelArrowProps {
  prefixCls: string;
}

const PanelArrow: React.FC<PanelArrowProps> = (props) => {
  const { prefixCls } = props;
  return (
    <svg
      className={`${prefixCls}-panel-arrow`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <title>Arrow</title>
      <path d="M 0 0 L 100 50 L 0 100" />
    </svg>
  );
};

export default PanelArrow;
