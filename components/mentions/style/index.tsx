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
  genStatusStyle,
  initInputToken,
  InputToken,
} from '../../input/style';

export interface ComponentToken {
  zIndexDropdown: number;
  dropdownHeight: number;
  controlItemWidth: number;
}

interface MentionsToken extends InputToken, ComponentToken {
  mentionsCls: string;
}

const genMentionsStyle: GenerateStyle<MentionsToken> = token => {
  const {
    mentionsCls,
    colorTextDisabled,
    controlItemBgHover,
    controlPaddingHorizontal,
    colorText,
    motionDurationSlow,
    lineHeight,
    controlHeight,
    inputPaddingHorizontal,
    inputPaddingVertical,
    fontSize,
    colorBgComponent,
    controlRadius,
    boxShadow,
  } = token;

  const itemPaddingVertical = Math.round(
    (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  );

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

      ...genStatusStyle(token),

      '&-disabled': {
        '> textarea': {
          ...genDisabledStyle(token),
        },
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      [`&-affix-wrapper ${mentionsCls}-suffix`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: inputPaddingHorizontal,
        bottom: 0,
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        margin: 'auto',
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
        ...genPlaceholderStyle(token.colorPlaceholder),
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
        zIndex: token.zIndexDropdown,
        boxSizing: 'border-box',
        fontSize,
        fontVariant: 'initial',
        backgroundColor: colorBgComponent,
        borderRadius: controlRadius,
        outline: 'none',
        boxShadow,

        '&-hidden': {
          display: 'none',
        },

        [`${mentionsCls}-dropdown-menu`]: {
          maxHeight: token.dropdownHeight,
          marginBottom: 0,
          paddingInlineStart: 0, // Override default ul/ol
          overflow: 'auto',
          listStyle: 'none',
          outline: 'none',

          '&-item': {
            position: 'relative',
            display: 'block',
            minWidth: token.controlItemWidth,
            padding: `${itemPaddingVertical}px ${controlPaddingHorizontal}px`,
            overflow: 'hidden',
            color: colorText,
            fontWeight: 'normal',
            lineHeight,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&:hover': {
              backgroundColor: controlItemBgHover,
            },

            '&:first-child': {
              borderStartStartRadius: controlRadius,
              borderStartEndRadius: controlRadius,
              borderEndStartRadius: 0,
              borderEndEndRadius: 0,
            },

            '&:last-child': {
              borderStartStartRadius: 0,
              borderStartEndRadius: 0,
              borderEndStartRadius: controlRadius,
              borderEndEndRadius: controlRadius,
            },

            '&-disabled': {
              color: colorTextDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: colorTextDisabled,
                backgroundColor: controlItemBgHover,
                cursor: 'not-allowed',
              },
            },

            '&-selected': {
              color: colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: controlItemBgHover,
            },

            '&-active': {
              backgroundColor: controlItemBgHover,
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

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { zIndexPopup, Mentions } = token;

      const mentionsToken: MentionsToken = {
        ...initInputToken(token, prefixCls, iconPrefixCls),

        mentionsCls: `.${prefixCls}`,

        dropdownHeight: 250,
        controlItemWidth: 100,
        zIndexDropdown: zIndexPopup + 50,

        ...Mentions,
      };

      return [genMentionsStyle(mentionsToken)];
    }),
    hashId,
  ];
}
