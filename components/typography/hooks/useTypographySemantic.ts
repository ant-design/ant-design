import { useMemo } from 'react';

import { useMergeSemantic } from '../../_util/hooks';
import type { DirectionType } from '../../config-provider';
import { useComponentConfig } from '../../config-provider/context';
import type {
  BaseTypographyProps,
  TypographyClassNamesType,
  TypographySemanticClassNames,
  TypographySemanticStyles,
  TypographyStylesType,
} from '../Base';

type UseTypographySemanticResult = [
  mergedClassNames: TypographySemanticClassNames,
  mergedStyles: TypographySemanticStyles,
  prefixCls: string,
  direction: DirectionType | undefined,
];

export const useTypographySemantic = (
  customizePrefixCls?: string,
  classNames?: TypographyClassNamesType | undefined,
  styles?: TypographyStylesType | undefined,
  typographyDirection?: DirectionType,
  props?: BaseTypographyProps,
): UseTypographySemanticResult => {
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

  const contextClassNamesObject = useMemo(() => ({ root: contextClassName }), [contextClassName]);
  const contextStylesObject = useMemo(() => ({ root: contextStyle }), [contextStyle]);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TypographyClassNamesType,
    TypographyStylesType,
    BaseTypographyProps
  >(
    [contextClassNamesObject, contextClassNames, classNames],
    [contextStylesObject, contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  return [mergedClassNames, mergedStyles, prefixCls, direction];
};
