import * as React from 'react';
import RcListy from '@rc-component/listy';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { AnyObject } from '../_util/type';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import type { ListyClassNames, ListyProps, ListyRef, ListyStyles } from './interface';
import useStyle from './style';

function InternalListy<T extends AnyObject = AnyObject, K extends React.Key = React.Key>(
  props: ListyProps<T, K>,
  ref: React.Ref<ListyRef>,
) {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    classNames,
    styles,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('listy');

  const prefixCls = getPrefixCls('listy', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [, token] = useToken();

  const itemHeight = Math.round(
    token.fontSize * token.lineHeight + token.paddingSM * 2 + token.lineWidth,
  );

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ListyClassNames,
    ListyStyles,
    ListyProps<T, K>
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
    props,
  });

  const rootClassNames = clsx(
    contextClassName,
    mergedClassNames.root,
    rootClassName,
    className,
    hashId,
    cssVarCls,
    rootCls,
  );

  return (
    <RcListy<T, K>
      {...restProps}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
      itemHeight={itemHeight}
      classNames={{ ...mergedClassNames, root: rootClassNames }}
      styles={mergedStyles}
    />
  );
}

type ListyComponent = (<T extends AnyObject = AnyObject, K extends React.Key = React.Key>(
  props: ListyProps<T, K> & { ref?: React.Ref<ListyRef> },
) => React.ReactElement) & { displayName?: string };

const Listy = React.forwardRef(InternalListy) as ListyComponent;

if (process.env.NODE_ENV !== 'production') {
  Listy.displayName = 'Listy';
}

export type {
  ListyClassNames,
  ListyProps,
  ListyRef,
  ListyScrollToConfig,
  ListyStyles,
  ScrollAlign,
} from './interface';

export default Listy;
