import * as React from 'react';
import devWarning from '../_util/devWarning';
import Base, { BlockProps } from './Base';

export interface LinkProps
  extends BlockProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  ellipsis?: boolean;
}

const Link: React.ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  { ellipsis, rel, ...restProps },
  ref,
) => {
  devWarning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );

  const baseRef = React.useRef<Base>(null);

  React.useImperativeHandle(ref, () => baseRef.current?.contentRef.current!);

  const mergedProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
  };

  return <Base {...mergedProps} ref={baseRef} ellipsis={!!ellipsis} component="a" />;
};

export default React.forwardRef(Link);
