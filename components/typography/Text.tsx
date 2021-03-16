import * as React from 'react';
import omit from 'rc-util/lib/omit';
import devWarning from '../_util/devWarning';
import Base, { BlockProps, EllipsisConfig } from './Base';

export interface TextProps extends BlockProps {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
}

const Text: React.FC<TextProps> = ({ ellipsis, ...restProps }) => {
  const mergedEllipsis = React.useMemo(() => {
    if (ellipsis && typeof ellipsis === 'object') {
      return omit(ellipsis as any, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);

  devWarning(
    typeof ellipsis !== 'object' ||
      !ellipsis ||
      (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  );

  return <Base {...restProps} ellipsis={mergedEllipsis} component="span" />;
};

export default Text;
