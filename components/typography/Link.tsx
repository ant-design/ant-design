import * as React from 'react';

import { devUseWarning } from '../_util/warning';
import type { BlockProps } from './Base';
import Base from './Base';

export interface LinkProps
  extends BlockProps<'a'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | keyof BlockProps<'a'>> {
  ellipsis?: boolean;
}

const Link = React.forwardRef<HTMLElement, LinkProps>((props, ref) => {
  const { ellipsis, rel, children, ...restProps } = props;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Typography.Link');
    warning(typeof ellipsis !== 'object', 'usage', '`ellipsis` only supports boolean value.');
  }

  const mergedProps: LinkProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
  };

  // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
  delete mergedProps.navigate;

  return (
    <Base {...mergedProps} ref={ref} ellipsis={!!ellipsis} component="a">
      {children}
    </Base>
  );
});

export default Link;
