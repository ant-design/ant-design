import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { AliasToken, FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

import {
  alignContentValues,
  alignItemsValues,
  justifyContentValues,
  justifyItemsValues,
} from '../utils';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

// ============================== CSSGrid Token ==============================
export interface CSSGridToken extends FullToken<'Grid'> {
  /**
   * @desc 小间距
   * @descEN Small gap
   */
  cssGridGapSM: number;
  /**
   * @desc 间距
   * @descEN Gap
   */
  cssGridGap: number;
  /**
   * @desc 大间距
   * @descEN Large gap
   */
  cssGridGapLG: number;
}

interface GridRowToken extends FullToken<'Grid'> {
  //
}

interface GridColToken extends FullToken<'Grid'> {
  /**
   * @desc 网格列数
   * @descEN Number of grid columns
   */
  gridColumns: number;
}

// ============================== Row-Shared ==============================
const genGridRowStyle: GenerateStyle<GridRowToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    // Grid system
    [componentCls]: {
      display: 'flex',
      flexFlow: 'row wrap',
      minWidth: 0,

      '&::before, &::after': {
        display: 'flex',
      },

      '&-no-wrap': {
        flexWrap: 'nowrap',
      },

      // The origin of the X-axis
      '&-start': {
        justifyContent: 'flex-start',
      },

      // The center of the X-axis
      '&-center': {
        justifyContent: 'center',
      },

      // The opposite of the X-axis
      '&-end': {
        justifyContent: 'flex-end',
      },

      '&-space-between': {
        justifyContent: 'space-between',
      },

      '&-space-around': {
        justifyContent: 'space-around',
      },

      '&-space-evenly': {
        justifyContent: 'space-evenly',
      },

      // Align at the top
      '&-top': {
        alignItems: 'flex-start',
      },

      // Align at the center
      '&-middle': {
        alignItems: 'center',
      },

      '&-bottom': {
        alignItems: 'flex-end',
      },
    },
  };
};

// ============================== Col-Shared ==============================
const genGridColStyle: GenerateStyle<GridColToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    // Grid system
    [componentCls]: {
      position: 'relative',
      maxWidth: '100%',
      // Prevent columns from collapsing when empty
      minHeight: 1,
    },
  };
};

const genLoopGridColumnsStyle = (token: GridColToken, sizeCls: string): CSSObject => {
  const { componentCls, gridColumns, antCls } = token;

  const [gridVarName, gridVarRef] = genCssVar(antCls, 'grid');
  const [, colVarRef] = genCssVar(antCls, 'col');

  const gridColumnsStyle: CSSObject = {};
  for (let i = gridColumns; i >= 0; i--) {
    if (i === 0) {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: 'none',
      };
      gridColumnsStyle[`${componentCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: 'auto',
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: 0,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: 0,
      };
    } else {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [
        // https://github.com/ant-design/ant-design/issues/44456
        // Form set `display: flex` on Col which will override `display: block`.
        // Let's get it from css variable to support override.
        {
          [gridVarName('display')]: 'block',
          // Fallback to display if variable not support
          display: 'block',
        },
        {
          display: gridVarRef('display'),
          flex: `0 0 ${(i / gridColumns) * 100}%`,
          maxWidth: `${(i / gridColumns) * 100}%`,
        },
      ];
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: i,
      };
    }
  }

  // Flex CSS Var
  gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = {
    flex: colVarRef(`${sizeCls.replace(/-/, '')}-flex`),
  };

  return gridColumnsStyle;
};

const genGridStyle = (token: GridColToken, sizeCls: string): CSSObject =>
  genLoopGridColumnsStyle(token, sizeCls);

const genGridMediaStyle = (
  token: GridColToken,
  screenSize: number,
  sizeCls: string,
): CSSObject => ({
  [`@media (min-width: ${unit(screenSize)})`]: {
    ...genGridStyle(token, sizeCls),
  },
});

export const prepareRowComponentToken: GetDefaultToken<'Grid'> = () => ({});

export const prepareColComponentToken: GetDefaultToken<'Grid'> = () => ({});

// ============================== Export ==============================
export const useRowStyle = genStyleHooks('Grid', genGridRowStyle, prepareRowComponentToken);

export const getMediaSize = (token: AliasToken) => {
  const mediaSizesMap = {
    xs: token.screenXSMin,
    sm: token.screenSMMin,
    md: token.screenMDMin,
    lg: token.screenLGMin,
    xl: token.screenXLMin,
    xxl: token.screenXXLMin,
    xxxl: token.screenXXXLMin,
  } as const;

  return mediaSizesMap;
};

export const useColStyle = genStyleHooks(
  'Grid',
  (token) => {
    const gridToken: GridColToken = mergeToken<GridColToken>(token, {
      gridColumns: 24, // Row is divided into 24 parts in Grid
    });
    const gridMediaSizesMap: Record<string, number> = getMediaSize(gridToken);
    delete gridMediaSizesMap.xs;
    return [
      genGridColStyle(gridToken),
      genGridStyle(gridToken, ''),
      genGridStyle(gridToken, '-xs'),
      Object.keys(gridMediaSizesMap)
        .map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`))
        .reduce<CSSObject>((pre, cur) => ({ ...pre, ...cur }), {}),
    ];
  },
  prepareColComponentToken,
);

// ============================== CSSGrid Style ==============================
const genCSSGridStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      display: 'grid',
      margin: 0,
      padding: 0,
      '&-rtl': {
        direction: 'rtl',
      },
      '&:empty': {
        display: 'none',
      },
    },
  };
};

const genCSSGridGapStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-gap-small': {
        gap: token.cssGridGapSM,
      },
      '&-gap-medium, &-gap-middle': {
        gap: token.cssGridGap,
      },
      '&-gap-large': {
        gap: token.cssGridGapLG,
      },
      '&-row-gap-small': {
        rowGap: token.cssGridGapSM,
      },
      '&-row-gap-medium, &-row-gap-middle': {
        rowGap: token.cssGridGap,
      },
      '&-row-gap-large': {
        rowGap: token.cssGridGapLG,
      },
      '&-column-gap-small': {
        columnGap: token.cssGridGapSM,
      },
      '&-column-gap-medium, &-column-gap-middle': {
        columnGap: token.cssGridGap,
      },
      '&-column-gap-large': {
        columnGap: token.cssGridGapLG,
      },
    },
  };
};

const genCSSGridJustifyItemsStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const style: CSSObject = {};
  justifyItemsValues.forEach((value) => {
    style[`${componentCls}-justify-items-${value}`] = { justifyItems: value };
  });
  return style;
};

const genCSSGridAlignItemsStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const style: CSSObject = {};
  alignItemsValues.forEach((value) => {
    style[`${componentCls}-align-items-${value}`] = { alignItems: value };
  });
  return style;
};

const genCSSGridJustifyContentStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const style: CSSObject = {};
  justifyContentValues.forEach((value) => {
    style[`${componentCls}-justify-content-${value}`] = { justifyContent: value };
  });
  return style;
};

const genCSSGridAlignContentStyle: GenerateStyle<CSSGridToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const style: CSSObject = {};
  alignContentValues.forEach((value) => {
    style[`${componentCls}-align-content-${value}`] = { alignContent: value };
  });
  return style;
};

export const prepareCSSGridComponentToken: GetDefaultToken<'Grid'> = () => ({});

export const useGridStyle = genStyleHooks(
  'Grid',
  (token) => {
    const { paddingXS, padding, paddingLG } = token;
    const cssGridToken = mergeToken<CSSGridToken>(token, {
      cssGridGapSM: paddingXS,
      cssGridGap: padding,
      cssGridGapLG: paddingLG,
    });
    return [
      genCSSGridStyle(cssGridToken),
      genCSSGridGapStyle(cssGridToken),
      genCSSGridJustifyItemsStyle(cssGridToken),
      genCSSGridAlignItemsStyle(cssGridToken),
      genCSSGridJustifyContentStyle(cssGridToken),
      genCSSGridAlignContentStyle(cssGridToken),
    ];
  },
  prepareCSSGridComponentToken,
  {
    // CSSGrid component don't apply extra font style
    resetStyle: false,
  },
);
