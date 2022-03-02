// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import { DerivativeToken, useStyleRegister, useToken, resetComponent } from '../../_util/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';

// ============================ Keyframes =============================
const treeNodeFX = new Keyframes('ant-tree-node-fx-do-not-use', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

// ============================== Switch ==============================
const getSwitchStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  [`.${prefixCls}-switcher-icon`]: {
    display: 'inline-block',
    fontSize: 10, // FIXME: missing token
    verticalAlign: 'baseline',

    svg: {
      transition: `transform ${token.duration}`,
    },
  },
});
//   .@{tree-prefix-cls}-switcher-icon,
//   .@{select-tree-prefix-cls}-switcher-icon {
//     display: inline-block;
//     font-size: 10px;
//     vertical-align: baseline;

//     svg {
//       transition: transform 0.3s;
//     }
//   }

// =============================== Base ===============================
export const genBaseStyle = (
  prefixCls: string,
  token: DerivativeToken,
  hashId: string,
): CSSObject => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;

  const treeNodePadding = token.paddingXS / 2;
  const treeTitleHeight = token.heightSM;

  return {
    [treeCls]: {
      ...resetComponent(token),
      background: token.componentBackground,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.duration}`,

      '&-focused:not(:hover):not(&-active-focused)': {
        background: token.tmpPrimaryHoverColorWeak,
      },

      // =================== Virtual List ===================
      '&-list-holder-inner': {
        alignItems: 'flex-start',
      },

      [`&${treeCls}-block-node`]: {
        [`${treeCls}-list-holder-inner`]: {
          alignItems: 'stretch',

          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            flex: 'auto',
          },

          // >>> Drag
          [`${treeNodeCls}.dragging`]: {
            position: 'relative',

            '&:after': {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: treeNodePadding,
              left: 0,
              border: `1px solid ${token.primaryColor}`,
              opacity: 0,
              animation: `${treeNodeFX.getName(hashId)} ${token.duration}`,
              animationPlayState: 'running',
              animationFillMode: 'forwards',
              content: '""',
              pointerEvents: 'none',
            },
          },
        },
      },

      // ===================== TreeNode =====================
      [`${treeNodeCls}`]: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: `0 0 ${treeNodePadding}px 0`,
        outline: 'none',

        // Disabled
        '&-disabled': {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            color: token.textColorDisabled,
            cursor: 'not-allowed',
            '&:hover': {
              background: 'transparent',
            },
          },
        },

        [`&-active ${treeCls}-node-content-wrapper`]: {
          background: token.itemHoverBackground,
        },

        [`&:not(&-disabled).filter-node ${treeCls}-title`]: {
          color: 'inherit',
          fontWeight: 500,
        },
      },

      // >>> Indent
      '&-indent': {
        alignSelf: 'stretch',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        '&-unit': {
          display: 'inline-block',
          width: treeTitleHeight,
        },
      },

      // >>> Drag Handler
      '&-draggable-icon': {
        width: treeTitleHeight,
        lineHeight: `${treeTitleHeight}px`,
        textAlign: 'center',
        opacity: 0.2,
        transition: `opacity ${token.duration}`,

        [`${treeNodeCls}:hover &`]: {
          opacity: 0.45,
        },
      },

      // >>> Switcher
      '&-switcher': {
        ...getSwitchStyle(prefixCls, token),
        position: 'relative',
        flex: 'none',
        alignSelf: 'stretch',
        width: treeTitleHeight,
        margin: 0,
        lineHeight: `${treeTitleHeight}px`,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',

        '&-noop': {
          cursor: 'default',
        },

        '&_close': {
          [`${treeCls}-switcher-icon`]: {
            svg: {
              transform: 'rotate(-90deg)',
            },
          },
        },

        '&-loading-icon': {
          color: token.primaryColor,
        },

        '&-leaf-line': {
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          width: '100%',
          height: '100%',

          // https://github.com/ant-design/ant-design/issues/31884
          '&:before': {
            position: 'absolute',
            top: 0,
            right: treeTitleHeight / 2,
            bottom: -treeNodePadding,
            marginLeft: -1,
            borderRight: `1px solid ${token.borderColor}`,
            content: '""',
          },

          '&:after': {
            position: 'absolute',
            width: (treeTitleHeight / 2) * 0.8,
            height: treeTitleHeight / 2,
            borderBottom: `1px solid ${token.borderColor}`,
            content: '""',
          },
        },
      },

      // >>> Checkbox
      '&-checkbox': {
        top: 'initial',
        margin: `${(treeTitleHeight - token.fontSizeLG) / 2}px 8px 0 0`,
      },

      // >>> Title
      '& &-node-content-wrapper': {
        position: 'relative',
        zIndex: 'auto',
        minHeight: treeTitleHeight,
        margin: 0,
        padding: `0 ${token.paddingXS / 2}px`,
        color: 'inherit',
        lineHeight: `${treeTitleHeight}px`,
        background: 'transparent',
        borderRadius: token.borderRadius,
        cursor: 'pointer',
        transition: `all ${token.duration}, border 0s, line-height 0s, box-shadow 0s`,

          '&:hover': {
            // backgroundColor: @tree-node-hover-bg;
          }
        //   &.@{custom-tree-prefix-cls}-node-selected {
        //     background-color: @tree-node-selected-bg;
        //   }
        //   // Icon
        //   .@{custom-tree-prefix-cls}-iconEle {
        //     display: inline-block;
        //     width: @tree-title-height;
        //     height: @tree-title-height;
        //     line-height: @tree-title-height;
        //     text-align: center;
        //     vertical-align: top;
        //     &:empty {
        //       display: none;
        //     }
        //   }
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  return useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    getCheckboxStyle(`${prefixCls}-checkbox`, token, hashId),
    genBaseStyle(prefixCls, token, hashId),
    treeNodeFX,
  ]);
}
