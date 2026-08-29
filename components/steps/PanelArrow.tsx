import * as React from 'react';

export interface PanelArrowProps {
  prefixCls: string;
}

const PanelArrow: React.FC<PanelArrowProps> = (props) => {
  const { prefixCls } = props;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative separator hidden from assistive technology
    <svg
      aria-hidden
      className={`${prefixCls}-panel-arrow`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M 0 0 L 100 50 L 0 100" />
    </svg>
  );
};

export default PanelArrow;
