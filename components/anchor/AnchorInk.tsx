import classNames from 'classnames';
import * as React from 'react';

export interface AnchorInkProps {
  anchorPrefixCls: string;
  direction: 'vertical' | 'horizontal';
  activeLink: string | null;
}

const AnchorInk = React.forwardRef<HTMLElement, AnchorInkProps>((props, ref) => {
  const { anchorPrefixCls: prefixCls, activeLink, direction: anchorDirection } = props;

  const horizontalClass = anchorDirection === 'horizontal' ? '-horizontal' : '';

  const inkClass = classNames(
    {
      [`${prefixCls}-ink-ball-visible`]: activeLink,
    },
    `${prefixCls}-ink-ball${horizontalClass}`,
  );

  if (anchorDirection === 'horizontal') {
    return <span className={inkClass} ref={ref} />;
  }

  return (
    <div className={`${prefixCls}-ink${horizontalClass}`}>
      <span className={inkClass} ref={ref} />
    </div>
  );
});

export default AnchorInk;
