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

  const inkClass = classNames({
    [`${prefixCls}-ink-ball`]: anchorDirection !== 'horizontal',
    [`${prefixCls}-ink-ball-horizontal`]: anchorDirection === 'horizontal',
    [`${prefixCls}-ink-ball-visible`]: activeLink,
  });

  return <span className={inkClass} ref={ref} />;
});

export default AnchorInk;
