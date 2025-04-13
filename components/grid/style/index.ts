import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { AliasToken, FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

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
const genGridRowStyle: GenerateStyle<GridRowToken> = (token): CSSObject => {
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
const genGridColStyle: GenerateStyle<GridColToken> = (token): CSSObject => {
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
  const { prefixCls, componentCls, gridColumns } = token;

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
          ['--ant-display' as any]: 'block',
          // Fallback to display if variable not support
          display: 'block',
        },
        {
          display: 'var(--ant-display)',
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
    flex: `var(--${prefixCls}${sizeCls}-flex)`,
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
        .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
    ];
  },
  prepareColComponentToken,
);
