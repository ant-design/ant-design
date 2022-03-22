// deps-lint-skip-all
import {
  GenerateStyle,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
} from '../../_util/theme';
import {
  genActiveStyle,
  genBasicInputStyle,
  genDisabledStyle,
  genPlaceholderStyle,
  initInputToken,
  InputToken,
} from '../../input/style';

interface MentionsToken extends InputToken {
  mentionsCls: string;
}

const genMentionsStyle: GenerateStyle<MentionsToken> = token => {
  const {
    mentionsCls,
    backgroundLight,
    colorTextDisabled: textColorDisabled,
    itemHoverBackground,
    controlPaddingHorizontal,
    colorText: textColor,
    duration,
    lineHeight,
    controlHeight,
    inputPaddingHorizontal,
    inputPaddingVertical,
    fontSize,
    componentBackground,
    controlRadius: borderRadius,
    boxShadow,
  } = token;

  return {
    [`${mentionsCls}`]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),

      position: 'relative',
      display: 'inline-block',
      height: 'auto',
      padding: 0,
      overflow: 'hidden',
      lineHeight,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'bottom',

      '&-disabled': {
        '> textarea': {
          ...genDisabledStyle(token),
        },
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      // ================= Input Area =================
      [`> textarea, ${mentionsCls}-measure`]: {
        minHeight: controlHeight - 2,
        margin: 0,
        padding: `${inputPaddingVertical}px ${inputPaddingHorizontal}px`,
        overflow: 'inherit',
        overflowX: 'hidden',
        overflowY: 'auto',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontStyle: 'inherit',
        fontVariant: 'inherit',
        fontSizeAdjust: 'inherit',
        fontStretch: 'inherit',
        lineHeight: 'inherit',
        direction: 'inherit',
        letterSpacing: 'inherit',
        whiteSpace: 'inherit',
        textAlign: 'inherit',
        verticalAlign: 'top',
        wordWrap: 'break-word',
        wordBreak: 'inherit',
        tabSize: 'inherit',
      },

      '> textarea': {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        ...genPlaceholderStyle(),
      },

      [`${mentionsCls}-measure`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: -1,
        color: 'transparent',
        pointerEvents: 'none',

        '> span': {
          display: 'inline-block',
          minHeight: '1em',
        },
      },

      // ================== Dropdown ==================
      '&-dropdown': {
        // Ref select dropdown style
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        insetInlineStart: -9999,
        zIndex: 1050, // FIXME: magic
        boxSizing: 'border-box',
        fontSize,
        fontVariant: 'initial',
        backgroundColor: componentBackground,
        borderRadius,
        outline: 'none',
        boxShadow,

        '&-hidden': {
          display: 'none',
        },

        [`${mentionsCls}-dropdown-menu`]: {
          maxHeight: 250, // FIXME: magic
          marginBottom: 0,
          paddingInlineStart: 0, // Override default ul/ol
          overflow: 'auto',
          listStyle: 'none',
          outline: 'none',

          '&-item': {
            position: 'relative',
            display: 'block',
            minWidth: 100, // FIXME: magic
            padding: `5px ${controlPaddingHorizontal}px`, // FIXME: magic
            overflow: 'hidden',
            color: textColor,
            fontWeight: 'normal',
            lineHeight,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            transition: `background ${duration} ease`,

            '&:hover': {
              backgroundColor: itemHoverBackground,
            },

            '&:first-child': {
              borderStartStartRadius: borderRadius,
              borderStartEndRadius: borderRadius,
              borderEndStartRadius: 0,
              borderEndEndRadius: 0,
            },

            '&:last-child': {
              borderStartStartRadius: 0,
              borderStartEndRadius: 0,
              borderEndStartRadius: borderRadius,
              borderEndEndRadius: borderRadius,
            },

            '&-disabled': {
              color: textColorDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: textColorDisabled,
                backgroundColor: itemHoverBackground,
                cursor: 'not-allowed',
              },
            },

            '&-selected': {
              color: textColor,
              fontWeight: 600, // FIXME: Need design token?
              backgroundColor: backgroundLight,
            },

            '&-active': {
              backgroundColor: itemHoverBackground,
            },
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const mentionsToken: MentionsToken = {
    ...initInputToken(token, prefixCls, iconPrefixCls),
    mentionsCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genMentionsStyle(mentionsToken),
    ]),
    hashId,
  ];
}
