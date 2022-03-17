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

interface DividerToken extends DerivativeToken {
  dividerCls: string;

  dividerBorderColor: string;

  dividerBorderWidth: number;

  dividerNotDefaultTextPadding: number;
  dividerVerticalGutterMargin: number;
  dividerHorizontalWithTextGutterMargin: number;
  dividerHorizontalGutterMargin: number;
}

// ============================== Shared ==============================
const genSharedDividerStyle: GenerateStyle<DividerToken> = (token): CSSObject => {
  const { dividerCls } = token;

  return {
    [dividerCls]: {
      ...resetComponent(token),
      borderBlockStart: `${token.dividerBorderWidth}px solid ${token.dividerBorderColor}`,

      // vertical
      '&-vertical': {
        position: 'relative',
        top: '-0.06em',
        display: 'inline-block',
        height: '0.9em',
        margin: `0 ${token.dividerVerticalGutterMargin}px`,
        verticalAlign: 'middle',
        borderTop: 0,
        borderInlineStart: `${token.dividerBorderWidth}px solid ${token.dividerBorderColor}`,
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
        color: token.headingColor,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderBlockStart: `0 ${token.dividerBorderColor}`,

        '&::before, &::after': {
          position: 'relative',
          top: '50%',
          width: '50%',
          borderBlockStart: `${token.dividerBorderWidth}px solid transparent`,
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
        borderColor: token.dividerBorderColor,
        borderStyle: 'dashed',
        borderWidth: 0,
        borderBlockStart: `${token.dividerBorderWidth}px`,
      },

      '&-horizontal&-with-text&-dashed': {
        '&::before, &::after': {
          borderStyle: 'dashed none none',
        },
      },

      '&-vertical&-dashed': {
        borderWidth: `0 0 0 ${token.dividerBorderWidth}px`,
      },

      '&-plain&-with-text': {
        color: token.textColor,
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

        '.ant-divider-inner-text': {
          paddingInlineStart: `${token.dividerNotDefaultTextPadding}px`,
        },
      },

      '&-horizontal&-with-text-right&-no-default-orientation-margin-right': {
        '&::before': {
          width: '100%',
        },

        '&::after': {
          width: 0,
        },

        '.ant-divider-inner-text': {
          paddingInlineEnd: `${token.dividerNotDefaultTextPadding}px`,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();
  // FIXME
  const dividerBorderColor = 'rgba(0, 0, 0, 6%)';

  const dividerBorderWidth = token.borderWidth;

  const dividerNotDefaultTextPadding = 0;
  const dividerVerticalGutterMargin = token.marginXS;
  const dividerHorizontalWithTextGutterMargin = token.margin;
  const dividerHorizontalGutterMargin = token.marginLG;

  const dividerToken: DividerToken = {
    ...token,

    dividerCls: `.${prefixCls}`,

    dividerBorderColor,

    dividerBorderWidth,

    dividerNotDefaultTextPadding,
    dividerVerticalGutterMargin,
    dividerHorizontalWithTextGutterMargin,
    dividerHorizontalGutterMargin,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genSharedDividerStyle(dividerToken),
    ]),
    hashId,
  ];
}
