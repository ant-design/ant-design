import classNames from 'classnames';
import * as React from 'react';
import type { AnchorDirection } from './Anchor';

export interface AnchorInkProps {
  anchorPrefixCls: string;
  direction: AnchorDirection;
  activeLink: string | null;
}

const AnchorInk = React.forwardRef<HTMLElement, AnchorInkProps>((props, ref) => {
  const { anchorPrefixCls: prefixCls, activeLink } = props;

  const inkClass = classNames(`${prefixCls}-ink-ball`, {
    [`${prefixCls}-ink-ball-visible`]: activeLink,
  });

  return <span className={inkClass} ref={ref} />;
});

export default AnchorInk;
