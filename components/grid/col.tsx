import * as React from 'react';
import { clsx } from 'clsx';

import { isNonNullable, isNumber } from '../_util/is';
import { responsiveArrayReversed } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import { genCssVar } from '../theme/util/genStyleUtils';
import RowContext from './RowContext';
import { useColStyle } from './style';

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
  extends React.HTMLAttributes<HTMLDivElement>, Partial<Record<Breakpoint, ColSpanType | ColSize>> {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  gridColumn?: string | number;
  gridRow?: string | number;
  gridArea?: string;
  prefixCls?: string;
}

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
  const { gutter, wrap, grid } = React.useContext(RowContext);

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
    className,
    children,
    flex,
    style,
    ...others
  } = props;

  const prefixCls = getPrefixCls('col', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const [hashId, cssVarCls] = useColStyle(prefixCls);

  const [varName] = genCssVar(rootPrefixCls, 'col');

  // ===================== Size ======================
  const sizeStyle: Record<string, string> = {};

  let sizeClassObj: Record<string, boolean | ColSpanType> = {};

  responsiveArrayReversed.forEach((size) => {
    let sizeProps: ColSize = {};
    const propSize = props[size];
    if (isNumber(propSize)) {
      sizeProps.span = propSize;
    } else if (typeof propSize === 'object') {
      sizeProps = propSize || {};
    }

    delete others[size];

    sizeClassObj = {
      ...sizeClassObj,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]:
        !grid && (sizeProps.order || sizeProps.order === 0),
      [`${prefixCls}-${size}-${sizeProps.span}`]: isNonNullable(sizeProps.span),
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
        !grid && (sizeProps.offset || sizeProps.offset === 0),
      [`${prefixCls}-${size}-push-${sizeProps.push}`]:
        !grid && (sizeProps.push || sizeProps.push === 0),
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]:
        !grid && (sizeProps.pull || sizeProps.pull === 0),
      [`${prefixCls}-rtl`]: direction === 'rtl',
    };

    // Responsive flex layout
    if (!grid && sizeProps.flex) {
      sizeClassObj[`${prefixCls}-${size}-flex`] = true;
      sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
    }
  });

  // ==================== Normal =====================
  const classes = clsx(
    prefixCls,
    !grid && {
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    },
    { [`${prefixCls}-grid`]: grid },
    className,
    sizeClassObj,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {};

  if (!grid && gutter?.[0]) {
    const horizontalGutter = isNumber(gutter[0]) ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;

  if (flex) {
    mergedStyle.flex = parseFlex(flex);

    // Hack for Firefox to avoid size issue
    // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
    if (wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }

  // Grid mode
  if (grid) {
    const gridStyles: Record<string, string | number> = {};

    if (span !== undefined && !gridColumn) {
      const spanNum = typeof span === 'number' ? span : Number.parseInt(String(span), 10);
      if (!Number.isNaN(spanNum) && spanNum > 0) {
        gridStyles.gridColumn = `span ${spanNum}`;
      }
    }

    const gridProps = { gridColumn, gridRow, gridArea };
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
