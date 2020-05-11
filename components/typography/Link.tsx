import * as React from 'react';
import warning from '../_util/warning';
import Base, { BlockProps } from './Base';

export interface LinkProps
  extends BlockProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  ellipsis?: boolean;
}

const Link: React.FC<LinkProps> = ({ ellipsis, rel, ...restProps }) => {
  warning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );

  const mergedProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
  };

  return <Base {...mergedProps} ellipsis={!!ellipsis} component="a" />;
};

export default Link;
