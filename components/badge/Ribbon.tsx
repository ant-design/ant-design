import * as React from 'react';
import { clsx } from 'clsx';

import type { PresetColorType } from '../_util/colors';
import { isPresetColor } from '../_util/colors';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import type { LiteralUnion } from '../_util/type';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style/ribbon';

type RibbonPlacement = 'start' | 'end';

type SemanticName = 'root' | 'content' | 'indicator';

export type RibbonClassNamesType = SemanticClassNamesType<RibbonProps, SemanticName>;
export type RibbonStylesType = SemanticStylesType<RibbonProps, SemanticName>;

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
  rootClassName?: string;
  classNames?: RibbonClassNamesType;
  styles?: RibbonStylesType;
}

const Ribbon: React.FC<RibbonProps> = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = 'end',
    rootClassName,
    styles,
    classNames: ribbonClassNames,
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('ribbon');
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);

  const wrapperCls = `${prefixCls}-wrapper`;
  const [hashId, cssVarCls] = useStyle(prefixCls, wrapperCls);

  // =========== Merged Props for Semantic ===========
  const mergedProps: RibbonProps = {
    ...props,
    placement,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    RibbonClassNamesType,
    RibbonStylesType,
    RibbonProps
  >([contextClassNames, ribbonClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = clsx(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
    contextClassName,
    mergedClassNames.indicator,
  );

  const colorStyle: React.CSSProperties = {};
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return (
    <div
      className={clsx(wrapperCls, rootClassName, hashId, cssVarCls, mergedClassNames.root)}
      style={mergedStyles.root}
    >
      {children}
      <div
        className={clsx(ribbonCls, hashId)}
        style={{ ...colorStyle, ...mergedStyles.indicator, ...contextStyle, ...style }}
      >
        <span
          className={clsx(`${prefixCls}-content`, mergedClassNames.content)}
          style={mergedStyles.content}
        >
          {text}
        </span>
        <div className={`${prefixCls}-corner`} style={cornerColorStyle} />
      </div>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Ribbon.displayName = 'Ribbon';
}

export default Ribbon;
