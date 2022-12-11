import classNames from 'classnames';
import * as React from 'react';
import type { AnchorDirection } from './Anchor';

export interface AnchorInkProps {
  anchorPrefixCls: string;
  direction: AnchorDirection;
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
