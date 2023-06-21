import omit from 'rc-util/lib/omit';
import * as React from 'react';
import warning from '../_util/warning';
import type { BlockProps, EllipsisConfig } from './Base';
import Base from './Base';

export interface TextProps
  extends BlockProps<'span'>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'type' | keyof BlockProps<'span'>> {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
}

const Text: React.ForwardRefRenderFunction<HTMLSpanElement, TextProps> = (
  { ellipsis, ...restProps },
  ref,
) => {
  const mergedEllipsis = React.useMemo(() => {
    if (ellipsis && typeof ellipsis === 'object') {
      return omit(ellipsis as any, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);

  warning(
    typeof ellipsis !== 'object' ||
      !ellipsis ||
      (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  );

  return <Base ref={ref} {...restProps} ellipsis={mergedEllipsis} component="span" />;
};

export default React.forwardRef(Text);
