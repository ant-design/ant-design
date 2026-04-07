import * as React from 'react';
import { clsx } from 'clsx';

import { responsiveArrayReversed } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import { genCssVar } from '../theme/util/genStyleUtils';
import RowContext from './RowContext';
import { useColStyle, useGridColStyle } from './style';

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string;

type FlexType = number | LiteralUnion<'none' | 'auto'>;

export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<Record<Breakpoint, ColSpanType | ColSize>> {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  /** Grid 模式下设置网格列位置，等同于 CSS grid-column */
  gridColumn?: string | number;
  /** Grid 模式下设置网格行位置，等同于 CSS grid-row */
  gridRow?: string | number;
  /** Grid 模式下设置网格区域名称 */
  gridArea?: string;
  /** Grid 模式下单元格在行轴的对齐方式，等同于 justify-self */
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  /** Grid 模式下单元格在列轴的对齐方式，等同于 align-self */
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  prefixCls?: string;
}

const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

function parseFlex(flex: FlexType): string {
  if (flex === 'auto') {
    return '1 1 auto';
  }

  if (isNumber(flex)) {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { gutter, wrap, mode } = React.useContext(RowContext);

  const {
    prefixCls: customizePrefixCls,
    span,
    order,
    offset,
    push,
    pull,
    gridColumn,
    gridRow,
    gridArea,
    justifySelf,
    alignSelf,
    className,
    children,
    flex,
    style,
    ...others
  } = props;

  const isGrid = mode === 'grid';
  const prefixCls = getPrefixCls(isGrid ? 'grid' : 'col', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  // 必须无条件调用 hooks（React rules of hooks）
  const [colHashId, colCssVarCls] = useColStyle(prefixCls);
  const [gridColHashId, gridColCssVarCls] = useGridColStyle(prefixCls);
  const [hashId, cssVarCls] = isGrid
    ? [gridColHashId, gridColCssVarCls]
    : [colHashId, colCssVarCls];

  const [varName] = genCssVar(rootPrefixCls, 'col');

  // ===================== Size ======================
  const sizeStyle: Record<string, string> = {};

  let sizeClassObj: Record<string, boolean | ColSpanType> = {};

  // Grid 模式下跳过 flex 相关的 class
  const shouldAddFlexClass = !isGrid;

  responsiveArrayReversed.forEach((size) => {
    let sizeProps: ColSize = {};
    const propSize = props[size];
    if (typeof propSize === 'number') {
      sizeProps.span = propSize;
    } else if (typeof propSize === 'object') {
      sizeProps = propSize || {};
    }

    delete others[size];

    sizeClassObj = {
      ...sizeClassObj,
      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]:
        shouldAddFlexClass && (sizeProps.order || sizeProps.order === 0),
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
        shouldAddFlexClass && (sizeProps.offset || sizeProps.offset === 0),
      [`${prefixCls}-${size}-push-${sizeProps.push}`]:
        shouldAddFlexClass && (sizeProps.push || sizeProps.push === 0),
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]:
        shouldAddFlexClass && (sizeProps.pull || sizeProps.pull === 0),
      [`${prefixCls}-rtl`]: direction === 'rtl',
    };

    // Responsive flex layout
    if (shouldAddFlexClass && sizeProps.flex) {
      sizeClassObj[`${prefixCls}-${size}-flex`] = true;
      sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
    }
  });

  // ==================== Normal =====================
  const classes = clsx(
    prefixCls,
    {
      // Grid 模式下 span 不生成 class，通过 inline style 控制
      [`${prefixCls}-${span}`]: !isGrid && span !== undefined,
      // Grid 模式下不支持这些属性
      [`${prefixCls}-order-${order}`]: !isGrid && order,
      [`${prefixCls}-offset-${offset}`]: !isGrid && offset,
      [`${prefixCls}-push-${push}`]: !isGrid && push,
      [`${prefixCls}-pull-${pull}`]: !isGrid && pull,
    },
    className,
    sizeClassObj,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {};

  // Grid 模式下不需要 padding，gap 由 Row 的 style 控制
  if (!isGrid && gutter?.[0]) {
    const horizontalGutter =
      typeof gutter[0] === 'number' ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;
    mergedStyle.paddingInline = horizontalGutter;
  }

  if (flex) {
    mergedStyle.flex = parseFlex(flex);

    // Hack for Firefox to avoid size issue
    // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
    if (wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }

  // Grid 模式样式
  if (isGrid) {
    const gridStyles: Record<string, string | number> = {};

    // span 自动映射为 grid-column: span N
    if (span !== undefined) {
      const spanNum = typeof span === 'number' ? span : Number.parseInt(String(span), 10);
      if (!Number.isNaN(spanNum) && spanNum > 0) {
        gridStyles.gridColumn = `span ${spanNum}`;
      }
    }

    // Grid 属性直接设置（优先级高于 span）
    const gridProps = { gridColumn, gridRow, gridArea, justifySelf, alignSelf };
    Object.entries(gridProps).forEach(([key, value]) => {
      if (value) gridStyles[key] = value;
    });

    Object.assign(mergedStyle, gridStyles);
  }

  // ==================== Render =====================
  return (
    <div
      {...others}
      style={{ ...mergedStyle, ...style, ...sizeStyle }}
      className={classes}
      ref={ref}
    >
      {children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Col.displayName = 'Col';
}

export default Col;
