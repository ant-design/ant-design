// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  DerivativeToken,
} from '../../_util/theme';

interface GridRowToken extends DerivativeToken {
  gridCls: string;
}

interface GridColToken extends DerivativeToken {
  gridCls: string;
  gridColumns: number;
}

// ============================== Row-Shared ==============================
const genGridRowStyle: GenerateStyle<GridRowToken> = (token): CSSObject => {
  const { gridCls } = token;

  return {
    // Grid system
    [gridCls]: {
      display: 'flex',
      flexFlow: 'row wrap',

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

      '&-space-around ': {
        justifyContent: 'space-around',
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
  const { gridCls } = token;

  return {
    // Grid system
    [gridCls]: {
      position: 'relative',
      maxWidth: '100%',
      // Prevent columns from collapsing when empty
      minHeight: 1,
    },
  };
};

const genLoopGridColumnsStyle = (token: GridColToken, sizeCls: string): CSSObject => {
  const { gridCls, gridColumns } = token;

  const gridColumnsStyle: CSSObject = {};
  for (let i = gridColumns; i >= 0; i--) {
    if (i === 0) {
      gridColumnsStyle[`${gridCls}${sizeCls}-${i}`] = {
        display: 'none',
      };
      gridColumnsStyle[`${gridCls}-push-${i}`] = {
        left: 'auto',
      };
      gridColumnsStyle[`${gridCls}-pull-${i}`] = {
        right: 'auto',
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-push-${i}`] = {
        left: 'auto',
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-pull-${i}`] = {
        right: 'auto',
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-offset-${i}`] = {
        marginRight: 0,
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-order-${i}`] = {
        order: 0,
      };
    } else {
      gridColumnsStyle[`${gridCls}${sizeCls}-${i}`] = {
        display: 'block',
        flex: `0 0 ${(i / gridColumns) * 100}%`,
        maxWidth: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-push-${i}`] = {
        left: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-pull-${i}`] = {
        right: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-offset-${i}`] = {
        marginLeft: `${(i / gridColumns) * 100}%`,
      };
      gridColumnsStyle[`${gridCls}${sizeCls}-order-${i}`] = {
        order: i,
      };
    }
  }

  return gridColumnsStyle;
};

const genGridStyle = (token: GridColToken, sizeCls: string): CSSObject =>
  genLoopGridColumnsStyle(token, sizeCls);

const genGridMediaStyle = (
  token: GridColToken,
  screenSize: number,
  sizeCls: string,
): CSSObject => ({
  [`@media (min-width: ${screenSize}px)`]: {
    ...genGridStyle(token, sizeCls),
  },
});

// ============================== Export ==============================
export function useRowStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();
  const gridToken: GridRowToken = {
    ...token,
    gridCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genGridRowStyle(gridToken),
    ]),
    hashId,
  ];
}

export function useColStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const gridToken: GridColToken = {
    ...token,
    gridColumns: 24, // FIXME: hardcode in v4
    gridCls: `.${prefixCls}`,
  };

  const gridMediaSizesMap = {
    '-sm': gridToken.screenSMMin,
    '-md': gridToken.screenMDMin,
    '-lg': gridToken.screenLGMin,
    '-xl': gridToken.screenXLMin,
    '-xxl': gridToken.screenXXLMin,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genGridColStyle(gridToken),
      genGridStyle(gridToken, ''),
      genGridStyle(gridToken, '-xs'),
      Object.keys(gridMediaSizesMap)
        .map((key: keyof typeof gridMediaSizesMap) =>
          genGridMediaStyle(gridToken, gridMediaSizesMap[key], key),
        )
        .reduce((pre, cur) => ({ ...pre, ...cur }), {}),
    ]),
    hashId,
  ];
}
