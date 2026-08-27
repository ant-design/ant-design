import { useMemo } from 'react';

import { useMergeSemantic, useSemanticRootStyle } from '../../_util/hooks/useMergeSemantic';
import type { DirectionType } from '../../config-provider';
import { useComponentConfig } from '../../config-provider/context';
import type { BaseTypographyProps, TypographySemanticAllType } from '../Base';

export const useTypographySemantic = (
  customizePrefixCls?: string,
  classNames?: TypographySemanticAllType['classNamesAndFn'] | undefined,
  styles?: TypographySemanticAllType['stylesAndFn'] | undefined,
  typographyDirection?: DirectionType,
  props?: BaseTypographyProps,
) => {
  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('typography');

  const direction = typographyDirection ?? contextDirection;
  const prefixCls = getPrefixCls('typography', customizePrefixCls);

  const mergedProps: BaseTypographyProps = {
    ...props,
    prefixCls,
    direction,
  };

  const contextClassNamesObject = useMemo<TypographySemanticAllType['classNames']>(
    () => ({ root: contextClassName }),
    [contextClassName],
  );
  const contextStyleRoot = useSemanticRootStyle(contextStyle);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TypographySemanticAllType['classNames'],
    TypographySemanticAllType['styles'],
    BaseTypographyProps
  >(
    [contextClassNamesObject, contextClassNames, classNames],
    [contextStyles, contextStyleRoot, styles],
    {
      props: mergedProps,
    },
  );

  return [mergedClassNames, mergedStyles, prefixCls, direction] as const;
};
