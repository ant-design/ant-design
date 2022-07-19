import type { CSSObject } from '@ant-design/cssinjs';
import { zoomIn } from '../../style/motion';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

interface FormToken extends FullToken<'Form'> {
  formItemCls: string;
  rootPrefixCls: string;
}

const resetForm = (token: AliasToken): CSSObject => ({
  legend: {
    display: 'block',
    width: '100%',
    marginBottom: token.marginLG,
    padding: 0,
    color: token.colorTextSecondary,
    fontSize: token.fontSizeLG,
    lineHeight: 'inherit',
    border: 0,
    borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
  },

  label: {
    fontSize: token.fontSize,
  },

  'input[type="search"]': {
    boxSizing: 'border-box',
  },

  // Position radios and checkboxes better
  'input[type="radio"], input[type="checkbox"]': {
    lineHeight: 'normal',
  },

  'input[type="file"]': {
    display: 'block',
  },

  // Make range inputs behave like textual form controls
  'input[type="range"]': {
    display: 'block',
    width: '100%',
  },

  // Make multiple select elements height not fixed
  'select[multiple], select[size]': {
    height: 'auto',
  },

  // Focus for file, radio, and checkbox
  [`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]: {
    outline: 0,
    boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.colorPrimaryOutline}`,
  },

  // Adjust output element
  output: {
    display: 'block',
    paddingTop: 15,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
  },
});

const genFormSize = (token: FormToken, height: number): CSSObject => ({
  [`${token.formItemCls}-label > label`]: {
    height,
  },

  [`${token.formItemCls}-control-input`]: {
    minHeight: height,
  },
});

const genFormStyle: GenerateStyle<FormToken> = token => {
  const { componentCls } = token;

  return {
    [token.componentCls]: {
      ...resetComponent(token),
      ...resetForm(token),

      [`${componentCls}-text`]: {
        display: 'inline-block',
        paddingInlineEnd: token.paddingSM,
      },

      // ================================================================
      // =                             Size                             =
      // ================================================================
      '&-small': {
        ...genFormSize(token, token.controlHeightSM),
      },

      '&-large': {
        ...genFormSize(token, token.controlHeightLG),
      },
    },
  };
};

const genFormItemStyle: GenerateStyle<FormToken> = token => {
  const { formItemCls, iconCls, componentCls, rootPrefixCls } = token;

  return {
    [formItemCls]: {
      ...resetComponent(token),

      marginBottom: token.marginLG,
      verticalAlign: 'top',

      '&-with-help': {
        transition: 'none',
      },

      [`&-hidden,
        &-hidden.${rootPrefixCls}-row`]: {
        // https://github.com/ant-design/ant-design/issues/26141
        display: 'none',
      },

      '&-has-warning': {
        [`${formItemCls}-split`]: {
          color: token.colorError,
        },
      },

      '&-has-error': {
        [`${formItemCls}-split`]: {
          color: token.colorWarning,
        },
      },

      // ==============================================================
      // =                            Label                           =
      // ==============================================================
      [`${formItemCls}-label`]: {
        display: 'inline-block',
        flexGrow: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textAlign: 'end',
        verticalAlign: 'middle',

        '&-left': {
          textAlign: 'start',
        },

        '&-wrap': {
          overflow: 'unset',
          lineHeight: `${token.lineHeight} - 0.25em`,
          whiteSpace: 'unset',
        },

        '> label': {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          maxWidth: '100%',
          height: token.controlHeight,
          color: token.colorTextHeading,
          fontSize: token.fontSize,

          [`> ${iconCls}`]: {
            fontSize: token.fontSize,
            verticalAlign: 'top',
          },

          // Required mark
          [`&${formItemCls}-required:not(${formItemCls}-required-mark-optional)::before`]: {
            display: 'inline-block',
            marginInlineEnd: token.marginXXS,
            color: token.colorError,
            fontSize: token.fontSize,
            fontFamily: 'SimSun, sans-serif',
            lineHeight: 1,
            content: '"*"',

            [`${componentCls}-hide-required-mark &`]: {
              display: 'none',
            },
          },

          // Optional mark
          [`${formItemCls}-optional`]: {
            display: 'inline-block',
            marginInlineStart: token.marginXXS,
            color: token.colorTextSecondary,

            [`${componentCls}-hide-required-mark &`]: {
              display: 'none',
            },
          },

          // Optional mark
          [`${formItemCls}-tooltip`]: {
            color: token.colorTextSecondary,
            cursor: 'help',
            writingMode: 'horizontal-tb',
            marginInlineStart: token.marginXXS,
          },

          '&::after': {
            content: '":"',
            position: 'relative',
            marginBlock: 0,
            marginInlineStart: token.marginXXS / 2,
            marginInlineEnd: token.marginXS,
          },

          [`&${formItemCls}-no-colon::after`]: {
            content: '" "',
          },
        },
      },

      // ==============================================================
      // =                            Input                           =
      // ==============================================================
      [`${formItemCls}-control`]: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

        [`&:first-child:not([class^=~"'${rootPrefixCls}-col-'"]):not([class*=~"' ${rootPrefixCls}-col-'"])`]:
          {
            width: '100%',
          },

        '&-input': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: token.controlHeight,

          '&-content': {
            flex: 'auto',
            maxWidth: '100%',
          },
        },
      },

      // ==============================================================
      // =                           Explain                          =
      // ==============================================================
      [formItemCls]: {
        '&-explain, &-extra': {
          clear: 'both',
          color: token.colorTextSecondary,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          transition: `color ${token.motionDurationMid} ${token.motionEaseOut}`, // sync input color transition
        },

        '&-explain-connected': {
          width: '100%',
        },

        '&-extra': {
          minHeight: token.controlHeightSM,
        },

        '&-explain': {
          '&-error': {
            color: token.colorError,
          },

          '&-warning': {
            color: token.colorWarning,
          },
        },
      },

      [`&-with-help ${formItemCls}-explain`]: {
        height: 'auto',
        opacity: 1,
      },

      // ==============================================================
      // =                        Feedback Icon                       =
      // ==============================================================
      [`${formItemCls}-feedback-icon`]: {
        fontSize: token.fontSize,
        textAlign: 'center',
        visibility: 'visible',
        animationName: zoomIn,
        animationDuration: token.motionDurationMid,
        animationTimingFunction: token.motionEaseOutBack,
        pointerEvents: 'none',

        '&-success': {
          color: token.colorSuccess,
        },

        '&-error': {
          color: token.colorError,
        },

        '&-warning': {
          color: token.colorWarning,
        },

        '&-validating': {
          color: token.colorPrimary,
        },
      },
    },
  };
};

const genFormMotionStyle: GenerateStyle<FormToken> = token => {
  const { componentCls, rootPrefixCls } = token;

  return {
    [componentCls]: {
      // Explain holder
      [`.${rootPrefixCls}-show-help`]: {
        transition: `opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,

        '&-appear, &-enter': {
          opacity: 0,

          '&-active': {
            opacity: 1,
          },
        },

        '&-leave': {
          opacity: 1,

          '&-active': {
            opacity: 0,
          },
        },
      },

      // Explain
      [`.${rootPrefixCls}-show-help-item`]: {
        overflow: 'hidden',
        transition: `height ${token.motionDurationSlow} ${token.motionEaseInOut},
                     opacity ${token.motionDurationSlow} ${token.motionEaseInOut},
                     transform ${token.motionDurationSlow} ${token.motionEaseInOut} !important`,

        [`&-appear,
          &-enter`]: {
          transform: `translateY(-5px)`,
          opacity: 0,

          '&-active': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },

        '&-leave-active': {
          transform: `translateY(-5px)`,
        },
      },
    },
  };
};

const genHorizontalStyle: GenerateStyle<FormToken> = token => {
  const { componentCls, formItemCls, rootPrefixCls } = token;

  return {
    [`${componentCls}-horizontal`]: {
      [`${formItemCls}-label`]: {
        flexGrow: 0,
      },

      [`${formItemCls}-control`]: {
        flex: '1 1 0',
        // https://github.com/ant-design/ant-design/issues/32777
        // https://github.com/ant-design/ant-design/issues/33773
        minWidth: 0,
      },

      // https://github.com/ant-design/ant-design/issues/32980
      [`${formItemCls}-label.${rootPrefixCls}-col-24 + ${formItemCls}-control`]: {
        minWidth: 'unset',
      },
    },
  };
};

const genInlineStyle: GenerateStyle<FormToken> = token => {
  const { componentCls, formItemCls } = token;

  return {
    [`${componentCls}-inline`]: {
      display: 'flex',
      flexWrap: 'wrap',

      [formItemCls]: {
        flex: 'none',
        flexWrap: 'nowrap',
        marginInlineEnd: token.margin,
        marginBottom: 0,

        '&-with-help': {
          marginBottom: token.marginLG,
        },

        [`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
          display: 'inline-block',
          verticalAlign: 'top',
        },

        [`> ${formItemCls}-label`]: {
          flex: 'none',
        },

        [`${componentCls}-text`]: {
          display: 'inline-block',
        },

        [`${formItemCls}-has-feedback`]: {
          display: 'inline-block',
        },
      },
    },
  };
};

const makeVerticalLayoutLabel = (token: FormToken): CSSObject => ({
  margin: 0,
  padding: `0 0 ${token.paddingXS}px`,
  whiteSpace: 'initial',
  textAlign: 'start',

  '> label': {
    margin: 0,

    '&::after': {
      display: 'none',
    },
  },
});

const makeVerticalLayout = (token: FormToken): CSSObject => {
  const { componentCls, formItemCls } = token;

  return {
    [`${formItemCls} ${formItemCls}-label`]: {
      ...makeVerticalLayoutLabel(token),
    },
    [componentCls]: {
      [formItemCls]: {
        flexWrap: 'wrap',

        [`${formItemCls}-label,
          ${formItemCls}-control`]: {
          flex: '0 0 100%',
          maxWidth: '100%',
        },
      },
    },
  };
};

const genVerticalStyle: GenerateStyle<FormToken> = token => {
  const { componentCls, formItemCls, rootPrefixCls } = token;

  return {
    [`${componentCls}-vertical`]: {
      [formItemCls]: {
        flexDirection: 'column',

        '&-label > label': {
          height: 'auto',
        },

        [`${componentCls}-item-control`]: {
          width: '100%',
        },
      },
    },

    [`${componentCls}-vertical ${formItemCls}-label,
      .${rootPrefixCls}-col-24${formItemCls}-label,
      .${rootPrefixCls}-col-xl-24${formItemCls}-label`]: {
      ...makeVerticalLayoutLabel(token),
    },

    [`@media (max-width: ${token.screenSMMax}px)`]: {
      ...makeVerticalLayout(token),
      [componentCls]: {
        [`.${rootPrefixCls}-col-xs-24${formItemCls}-label`]: {
          ...makeVerticalLayoutLabel(token),
        },
      },
    },

    [`@media (max-width: ${token.screenSMMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-sm-24${formItemCls}-label`]: {
          ...makeVerticalLayoutLabel(token),
        },
      },
    },

    [`@media (max-width: ${token.screenMDMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-md-24${formItemCls}-label`]: {
          ...makeVerticalLayoutLabel(token),
        },
      },
    },

    [`@media (max-width: ${token.screenLGMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-lg-24${formItemCls}-label`]: {
          ...makeVerticalLayoutLabel(token),
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Form', (token, { rootPrefixCls }) => {
  const formToken = mergeToken<FormToken>(token, {
    formItemCls: `${token.componentCls}-item`,
    rootPrefixCls,
  });

  return [
    genFormStyle(formToken),
    genFormItemStyle(formToken),
    genFormMotionStyle(formToken),
    genHorizontalStyle(formToken),
    genInlineStyle(formToken),
    genVerticalStyle(formToken),
    zoomIn,
  ];
});
