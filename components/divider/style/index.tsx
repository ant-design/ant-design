// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  resetComponent,
  GenerateStyle,
} from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  sizePaddingEdgeHorizontal: number;
}

interface DividerToken extends DerivativeToken, ComponentToken {
  dividerCls: string;

  dividerVerticalGutterMargin: number;
  dividerHorizontalWithTextGutterMargin: number;
  dividerHorizontalGutterMargin: number;
}

// ============================== Shared ==============================
const genSharedDividerStyle: GenerateStyle<DividerToken> = (token): CSSObject => {
  const { dividerCls, sizePaddingEdgeHorizontal, colorSplit, controlLineWidth } = token;

  return {
    [dividerCls]: {
      ...resetComponent(token),
      borderBlockStart: `${controlLineWidth}px solid ${colorSplit}`,

      // vertical
      '&-vertical': {
        position: 'relative',
        top: '-0.06em',
        display: 'inline-block',
        height: '0.9em',
        margin: `0 ${token.dividerVerticalGutterMargin}px`,
        verticalAlign: 'middle',
        borderTop: 0,
        borderInlineStart: `${controlLineWidth}px solid ${colorSplit}`,
      },

      '&-horizontal': {
        display: 'flex',
        clear: 'both',
        width: '100%',
        minWidth: '100%', // Fix https://github.com/ant-design/ant-design/issues/10914
        margin: `${token.dividerHorizontalGutterMargin}px 0`,
      },

      '&-horizontal&-with-text': {
        display: 'flex',
        margin: `${token.dividerHorizontalWithTextGutterMargin}px 0`,
        color: token.colorTextHeading,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderBlockStart: `0 ${colorSplit}`,

        '&::before, &::after': {
          position: 'relative',
          top: '50%',
          width: '50%',
          borderBlockStart: `${controlLineWidth}px solid transparent`,
          // Chrome not accept `inherit` in `border-top`
          borderBlockStartColor: 'inherit',
          borderBlockEnd: 0,
          transform: 'translateY(50%)',
          content: "''",
        },
      },

      '&-horizontal&-with-text-left': {
        '&::before': {
          top: '50%',
          width: '5%',
        },

        '&::after': {
          top: '50%',
          width: '95%',
        },
      },

      '&-horizontal&-with-text-right': {
        '&::before': {
          top: '50%',
          width: '95%',
        },

        '&::after': {
          top: '50%',
          width: '5%',
        },
      },

      [`${dividerCls}-inner-text`]: {
        display: 'inline-block',
        padding: '0 1em',
      },

      '&-dashed': {
        background: 'none',
        borderColor: colorSplit,
        borderStyle: 'dashed',
        borderWidth: 0,
        borderBlockStart: `${controlLineWidth}px`,
      },

      '&-horizontal&-with-text&-dashed': {
        '&::before, &::after': {
          borderStyle: 'dashed none none',
        },
      },

      '&-vertical&-dashed': {
        borderWidth: `0 0 0 ${controlLineWidth}px`,
      },

      '&-plain&-with-text': {
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
      },

      '&-horizontal&-with-text-left&-no-default-orientation-margin-left': {
        '&::before': {
          width: 0,
        },

        '&::after': {
          width: '100%',
        },

        [`${dividerCls}-inner-text`]: {
          paddingInlineStart: sizePaddingEdgeHorizontal,
        },
      },

      '&-horizontal&-with-text-right&-no-default-orientation-margin-right': {
        '&::before': {
          width: '100%',
        },

        '&::after': {
          width: 0,
        },

        [`${dividerCls}-inner-text`]: {
          paddingInlineEnd: sizePaddingEdgeHorizontal,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { divider } = token;

      const dividerVerticalGutterMargin = token.marginSM;
      const dividerHorizontalWithTextGutterMargin = token.margin;
      const dividerHorizontalGutterMargin = token.marginLG;

      const dividerToken: DividerToken = {
        ...token,

        dividerCls: `.${prefixCls}`,

        sizePaddingEdgeHorizontal: 0,

        dividerVerticalGutterMargin,
        dividerHorizontalWithTextGutterMargin,
        dividerHorizontalGutterMargin,

        ...divider,
      };

      return [genSharedDividerStyle(dividerToken)];
    }),
    hashId,
  ];
}
