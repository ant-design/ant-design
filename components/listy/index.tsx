import React from 'react';
import RcListy from '@rc-component/listy';
import type {
  ListyClassNames,
  ListyRef,
  ListyScrollToConfig,
  ListyStyles,
  ListyProps as RcListyProps,
  ScrollAlign,
} from '@rc-component/listy';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import type { AnyObject } from '../_util/type';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import useStyle from './style';

export type ListySemanticType = {
  classNames?: ListyClassNames;
  styles?: ListyStyles;
};

export type ListySemanticAllType = GenerateSemantic<ListySemanticType, ListyProps>;

export interface ListyProps<T = AnyObject, K extends React.Key = React.Key>
  extends Omit<RcListyProps<T, K>, 'itemHeight' | 'direction' | 'classNames' | 'styles'> {
  rootClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: ListySemanticAllType['classNamesAndFn'];
  styles?: ListySemanticAllType['stylesAndFn'];
}

const InternalListy = <T, K extends React.Key = React.Key>(
  props: ListyProps<T, K>,
  ref: React.Ref<ListyRef>,
) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    classNames,
    styles,
    virtual,
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

  const { virtual: contextVirtual } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('listy', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [, token] = useToken();

  const listyToken = { ...token, ...token.Listy };
  const itemHeight =
    listyToken.fontHeight + (listyToken.itemPaddingBlock ?? listyToken.paddingSM) * 2;

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ListySemanticAllType['classNames'],
    ListySemanticAllType['styles'],
    ListyProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
    props: props as unknown as ListyProps,
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

  const mergedVirtual = virtual ?? contextVirtual ?? false;

  return (
    <RcListy<T, K>
      {...restProps}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
      virtual={mergedVirtual}
      itemHeight={itemHeight}
      classNames={{ ...mergedClassNames, root: rootClassNames }}
      styles={mergedStyles}
    />
  );
};

type ListyComponent = (<T = AnyObject, K extends React.Key = React.Key>(
  props: ListyProps<T, K> & { ref?: React.Ref<ListyRef> },
) => React.ReactElement) & { displayName?: string };

const Listy = React.forwardRef(InternalListy) as ListyComponent;

if (process.env.NODE_ENV !== 'production') {
  Listy.displayName = 'Listy';
}

export type { ListyClassNames, ListyRef, ListyScrollToConfig, ListyStyles, ScrollAlign };

export default Listy;
