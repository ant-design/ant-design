import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { genFocusOutline, resetComponent } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { AliasToken, DerivativeToken, FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface TreeSharedToken {
  /**
   * @desc 节点标题高度
   * @descEN Node title height
   */
  titleHeight: number;
  /**
   * @desc 节点悬浮态背景色
   * @descEN Background color of hovered node
   */
  nodeHoverBg: string;
  /**
   * @desc 节点选中态背景色
   * @descEN Background color of selected node
   */
  nodeSelectedBg: string;
}

export interface ComponentToken extends TreeSharedToken {
  /**
   * @desc 目录树节点选中文字颜色
   * @descEN Text color of selected directory node
   */
  directoryNodeSelectedColor: string;
  /**
   * @desc 目录树节点选中背景色
   * @descEN Background color of selected directory node
   */
  directoryNodeSelectedBg: string;
}

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
    fontSize: 10,
    verticalAlign: 'baseline',

    svg: {
      transition: `transform ${token.motionDurationSlow}`,
    },
  },
});

// =============================== Drop ===============================
const getDropIndicatorStyle = (prefixCls: string, token: DerivativeToken) => ({
  [`.${prefixCls}-drop-indicator`]: {
    position: 'absolute',
    // it should displayed over the following node
    zIndex: 1,
    height: 2,
    backgroundColor: token.colorPrimary,
    borderRadius: 1,
    pointerEvents: 'none',

    '&:after': {
      position: 'absolute',
      top: -3,
      insetInlineStart: -6,
      width: 8,
      height: 8,
      backgroundColor: 'transparent',
      border: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
      borderRadius: '50%',
      content: '""',
    },
  },
});

// =============================== Base ===============================
type TreeToken = FullToken<'Tree'> & {
  treeCls: string;
  treeNodeCls: string;
  treeNodePadding: number;
};

export const genBaseStyle = (prefixCls: string, token: TreeToken): CSSObject => {
  const { treeCls, treeNodeCls, treeNodePadding, titleHeight, nodeSelectedBg, nodeHoverBg } = token;
  const treeCheckBoxMarginHorizontal = token.paddingXS;

  return {
    [treeCls]: {
      ...resetComponent(token),
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.motionDurationSlow}`,

      [`&${treeCls}-rtl`]: {
        // >>> Switcher
        [`${treeCls}-switcher`]: {
          '&_close': {
            [`${treeCls}-switcher-icon`]: {
              svg: {
                transform: 'rotate(90deg)',
              },
            },
          },
        },
      },

      [`&-focused:not(:hover):not(${treeCls}-active-focused)`]: {
        ...genFocusOutline(token),
      },

      // =================== Virtual List ===================
      [`${treeCls}-list-holder-inner`]: {
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
              insetInlineEnd: 0,
              bottom: treeNodePadding,
              insetInlineStart: 0,
              border: `1px solid ${token.colorPrimary}`,
              opacity: 0,
              animationName: treeNodeFX,
              animationDuration: token.motionDurationSlow,
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

        '&-rtl': {
          direction: 'rtl',
        },

        // Disabled
        '&-disabled': {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            color: token.colorTextDisabled,
            cursor: 'not-allowed',
            '&:hover': {
              background: 'transparent',
            },
          },
        },

        [`&-active ${treeCls}-node-content-wrapper`]: {
          ...genFocusOutline(token),
        },

        [`&:not(${treeNodeCls}-disabled).filter-node ${treeCls}-title`]: {
          color: 'inherit',
          fontWeight: 500,
        },

        '&-draggable': {
          [`${treeCls}-draggable-icon`]: {
            // https://github.com/ant-design/ant-design/issues/41915
            flexShrink: 0,
            width: titleHeight,
            lineHeight: `${titleHeight}px`,
            textAlign: 'center',
            visibility: 'visible',
            opacity: 0.2,
            transition: `opacity ${token.motionDurationSlow}`,

            [`${treeNodeCls}:hover &`]: {
              opacity: 0.45,
            },
          },

          [`&${treeNodeCls}-disabled`]: {
            [`${treeCls}-draggable-icon`]: {
              visibility: 'hidden',
            },
          },
        },
      },

      // >>> Indent
      [`${treeCls}-indent`]: {
        alignSelf: 'stretch',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        '&-unit': {
          display: 'inline-block',
          width: titleHeight,
        },
      },

      // >>> Drag Handler
      [`${treeCls}-draggable-icon`]: {
        visibility: 'hidden',
      },

      // >>> Switcher
      [`${treeCls}-switcher`]: {
        ...getSwitchStyle(prefixCls, token),
        position: 'relative',
        flex: 'none',
        alignSelf: 'stretch',
        width: titleHeight,
        margin: 0,
        lineHeight: `${titleHeight}px`,
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
          color: token.colorPrimary,
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
            insetInlineEnd: titleHeight / 2,
            bottom: -treeNodePadding,
            marginInlineStart: -1,
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""',
          },

          '&:after': {
            position: 'absolute',
            width: (titleHeight / 2) * 0.8,
            height: titleHeight / 2,
            borderBottom: `1px solid ${token.colorBorder}`,
            content: '""',
          },
        },
      },

      // >>> Checkbox
      [`${treeCls}-checkbox`]: {
        top: 'initial',
        marginInlineEnd: treeCheckBoxMarginHorizontal,
        alignSelf: 'flex-start',
        marginTop: token.marginXXS,
      },

      // >>> Title
      // add `${treeCls}-checkbox + span` to cover checkbox `${checkboxCls} + span`
      [`${treeCls}-node-content-wrapper, ${treeCls}-checkbox + span`]: {
        position: 'relative',
        zIndex: 'auto',
        minHeight: titleHeight,
        margin: 0,
        padding: `0 ${token.paddingXS / 2}px`,
        color: 'inherit',
        lineHeight: `${titleHeight}px`,
        background: 'transparent',
        borderRadius: token.borderRadius,
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`,

        '&:hover': {
          backgroundColor: nodeHoverBg,
        },

        [`&${treeCls}-node-selected`]: {
          backgroundColor: nodeSelectedBg,
        },

        // Icon
        [`${treeCls}-iconEle`]: {
          display: 'inline-block',
          width: titleHeight,
          height: titleHeight,
          lineHeight: `${titleHeight}px`,
          textAlign: 'center',
          verticalAlign: 'top',

          '&:empty': {
            display: 'none',
          },
        },
      },

      // https://github.com/ant-design/ant-design/issues/28217
      [`${treeCls}-unselectable ${treeCls}-node-content-wrapper:hover`]: {
        backgroundColor: 'transparent',
      },

      // ==================== Draggable =====================
      [`${treeCls}-node-content-wrapper`]: {
        lineHeight: `${titleHeight}px`,
        userSelect: 'none',

        ...getDropIndicatorStyle(prefixCls, token),
      },

      [`${treeNodeCls}.drop-container`]: {
        '> [draggable]': {
          boxShadow: `0 0 0 2px ${token.colorPrimary}`,
        },
      },

      // ==================== Show Line =====================
      '&-show-line': {
        // ================ Indent lines ================
        [`${treeCls}-indent`]: {
          '&-unit': {
            position: 'relative',
            height: '100%',

            '&:before': {
              position: 'absolute',
              top: 0,
              insetInlineEnd: titleHeight / 2,
              bottom: -treeNodePadding,
              borderInlineEnd: `1px solid ${token.colorBorder}`,
              content: '""',
            },

            '&-end': {
              '&:before': {
                display: 'none',
              },
            },
          },
        },

        // ============== Cover Background ==============
        [`${treeCls}-switcher`]: {
          background: 'transparent',

          '&-line-icon': {
            // https://github.com/ant-design/ant-design/issues/32813
            verticalAlign: '-0.15em',
          },
        },
      },

      [`${treeNodeCls}-leaf-last`]: {
        [`${treeCls}-switcher`]: {
          '&-leaf-line': {
            '&:before': {
              top: 'auto !important',
              bottom: 'auto !important',
              height: `${titleHeight / 2}px !important`,
            },
          },
        },
      },
    },
  };
};

// ============================ Directory =============================
export const genDirectoryStyle = (token: TreeToken): CSSObject => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    directoryNodeSelectedBg,
    directoryNodeSelectedColor,
  } = token;

  return {
    [`${treeCls}${treeCls}-directory`]: {
      // ================== TreeNode ==================
      [treeNodeCls]: {
        position: 'relative',

        // Hover color
        '&:before': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: treeNodePadding,
          insetInlineStart: 0,
          transition: `background-color ${token.motionDurationMid}`,
          content: '""',
          pointerEvents: 'none',
        },

        '&:hover': {
          '&:before': {
            background: token.controlItemBgHover,
          },
        },

        // Elements
        '> *': {
          zIndex: 1,
        },

        // >>> Switcher
        [`${treeCls}-switcher`]: {
          transition: `color ${token.motionDurationMid}`,
        },

        // >>> Title
        [`${treeCls}-node-content-wrapper`]: {
          borderRadius: 0,
          userSelect: 'none',

          '&:hover': {
            background: 'transparent',
          },

          [`&${treeCls}-node-selected`]: {
            color: directoryNodeSelectedColor,
            background: 'transparent',
          },
        },

        // ============= Selected =============
        '&-selected': {
          [`
            &:hover::before,
            &::before
          `]: {
            background: directoryNodeSelectedBg,
          },

          // >>> Switcher
          [`${treeCls}-switcher`]: {
            color: directoryNodeSelectedColor,
          },

          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            color: directoryNodeSelectedColor,
            background: 'transparent',
          },
        },
      },
    },
  };
};

// ============================== Merged ==============================
export const genTreeStyle = (
  prefixCls: string,
  token: AliasToken & TreeSharedToken,
): CSSInterpolation => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;

  const treeNodePadding = token.paddingXS / 2;

  const treeToken = mergeToken<TreeToken>(token, {
    treeCls,
    treeNodeCls,
    treeNodePadding,
  });

  return [
    // Basic
    genBaseStyle(prefixCls, treeToken),
    // Directory
    genDirectoryStyle(treeToken),
  ];
};

export const initComponentToken = (token: AliasToken): TreeSharedToken => {
  const { controlHeightSM } = token;

  return {
    titleHeight: controlHeightSM,
    nodeHoverBg: token.controlItemBgHover,
    nodeSelectedBg: token.controlItemBgActive,
  };
};

export default genComponentStyleHook(
  'Tree',
  (token, { prefixCls }) => [
    {
      [token.componentCls]: getCheckboxStyle(`${prefixCls}-checkbox`, token),
    },
    genTreeStyle(prefixCls, token),
    genCollapseMotion(token),
  ],
  (token) => {
    const { colorTextLightSolid, colorPrimary } = token;

    return {
      ...initComponentToken(token),
      directoryNodeSelectedColor: colorTextLightSolid,
      directoryNodeSelectedBg: colorPrimary,
    };
  },
);
