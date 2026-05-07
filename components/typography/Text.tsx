import * as React from 'react';
import { omit } from '@rc-component/util';

import { isPlainObject } from '../_util/is';
import { devUseWarning } from '../_util/warning';
import type { BlockProps, EllipsisConfig } from './Base';
import Base from './Base';

export interface TextProps
  extends
    BlockProps<'span'>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'type' | keyof BlockProps<'span'>> {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { ellipsis, children, ...restProps } = props;
  const mergedEllipsis = React.useMemo(() => {
    if (isPlainObject(ellipsis)) {
      return omit(ellipsis as EllipsisConfig, ['expandable', 'rows']);
    }
    return ellipsis;
  }, [ellipsis]);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Typography.Text');
    warning(
      !isPlainObject(ellipsis) || (!('expandable' in ellipsis) && !('rows' in ellipsis)),
      'usage',
      '`ellipsis` do not support `expandable` or `rows` props.',
    );
  }

  return (
    <Base ref={ref} {...restProps} ellipsis={mergedEllipsis} component="span">
      {children}
    </Base>
  );
});

export default Text;
