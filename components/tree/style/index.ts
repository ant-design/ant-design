import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { Keyframes, unit } from '@ant-design/cssinjs';

import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { genFocusOutline, resetComponent } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { AliasToken, CSSUtil, FullToken, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genDirectoryStyle } from './directory';

export interface TreeSharedToken {
  /**
   * @desc 节点标题高度
   * @descEN Node title height
   */
  titleHeight: number;
  /**
   * @desc 缩进宽度
   * @descEN Indent width of tree
   */
  indentSize?: number;
  /**
   * @desc 节点悬浮态背景色
   * @descEN Background color of hovered node
   */
  nodeHoverBg: string;
  /**
   * @desc 节点悬浮态态文字颜色
   * @descEN Text color of hovered node
   */
  nodeHoverColor: string;
  /**
   * @desc 节点选中态背景色
   * @descEN Background color of selected node
   */
  nodeSelectedBg: string;
  /**
   * @desc 节点选中态文字颜色
   * @descEN Text color of selected node
   */
  nodeSelectedColor: string;
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
const getSwitchStyle = (prefixCls: string, token: AliasToken): CSSObject => ({
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
const getDropIndicatorStyle = (prefixCls: string, token: AliasToken) => ({
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
      border: `${unit(token.lineWidthBold)} solid ${token.colorPrimary}`,
      borderRadius: '50%',
      content: '""',
    },
  },
});

// =============================== Base ===============================
export type TreeToken = FullToken<'Tree'> & {
  treeCls: string;
  treeNodeCls: string;
  treeNodePadding: number | string;
};

export const genBaseStyle = (prefixCls: string, token: TreeToken): CSSObject => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    titleHeight,
    indentSize,
    nodeSelectedBg,
    nodeHoverBg,
    colorTextQuaternary,
    controlItemBgActiveDisabled,
  } = token;
  return {
    [treeCls]: {
      ...resetComponent(token),
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.motionDurationSlow}`,

      '&-rtl': {
        direction: 'rtl',
      },

      [`&${treeCls}-rtl ${treeCls}-switcher_close ${treeCls}-switcher-icon svg`]: {
        transform: 'rotate(90deg)',
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
          [`${treeNodeCls}.dragging:after`]: {
            position: 'absolute',
            inset: 0,
            border: `1px solid ${token.colorPrimary}`,
            opacity: 0,
            animationName: treeNodeFX,
            animationDuration: token.motionDurationSlow,
            animationPlayState: 'running',
            animationFillMode: 'forwards',
            content: '""',
            pointerEvents: 'none',
            borderRadius: token.borderRadius,
          },
        },
      },

      // ===================== TreeNode =====================
      [treeNodeCls]: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: treeNodePadding,
        lineHeight: unit(titleHeight),
        position: 'relative',

        // 非常重要，避免 drop-indicator 在拖拽过程中闪烁
        '&:before': {
          content: '""',
          position: 'absolute',
          zIndex: 1,
          insetInlineStart: 0,
          width: '100%',
          top: '100%',
          height: treeNodePadding,
        },

        // Disabled
        [`&-disabled ${treeCls}-node-content-wrapper`]: {
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
          '&:hover': {
            background: 'transparent',
          },
        },

        [`${treeCls}-checkbox-disabled + ${treeCls}-node-selected,&${treeNodeCls}-disabled${treeNodeCls}-selected ${treeCls}-node-content-wrapper`]:
          {
            backgroundColor: controlItemBgActiveDisabled,
          },

        // we can not set pointer-events to none for checkbox in tree
        // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-2605234058
        [`${treeCls}-checkbox-disabled`]: {
          pointerEvents: 'unset',
        },

        // not disable
        [`&:not(${treeNodeCls}-disabled)`]: {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            '&:hover': {
              color: token.nodeHoverColor,
            },
          },
        },

        [`&-active ${treeCls}-node-content-wrapper`]: {
          background: token.controlItemBgHover,
        },

        [`&:not(${treeNodeCls}-disabled).filter-node ${treeCls}-title`]: {
          color: token.colorPrimary,
          fontWeight: 500,
        },

        '&-draggable': {
          cursor: 'grab',

          [`${treeCls}-draggable-icon`]: {
            // https://github.com/ant-design/ant-design/issues/41915
            flexShrink: 0,
            width: titleHeight,
            textAlign: 'center',
            visibility: 'visible',
            color: colorTextQuaternary,
          },

          [`&${treeNodeCls}-disabled ${treeCls}-draggable-icon`]: {
            visibility: 'hidden',
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
          width: indentSize,
        },
      },

      // >>> Drag Handler
      [`${treeCls}-draggable-icon`]: {
        visibility: 'hidden',
      },

      // Switcher / Checkbox
      [`${treeCls}-switcher, ${treeCls}-checkbox`]: {
        marginInlineEnd: token
          .calc(token.calc(titleHeight).sub(token.controlInteractiveSize))
          .div(2)
          .equal(),
      },

      // >>> Switcher
      [`${treeCls}-switcher`]: {
        ...getSwitchStyle(prefixCls, token),
        position: 'relative',
        flex: 'none',
        alignSelf: 'stretch',
        width: titleHeight,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: `all ${token.motionDurationSlow}`,

        '&-noop': {
          cursor: 'unset',
        },

        '&:before': {
          pointerEvents: 'none',
          content: '""',
          width: titleHeight,
          height: titleHeight,
          position: 'absolute',
          left: {
            _skip_check_: true,
            value: 0,
          },
          top: 0,
          borderRadius: token.borderRadius,
          transition: `all ${token.motionDurationSlow}`,
        },

        [`&:not(${treeCls}-switcher-noop):hover:before`]: {
          backgroundColor: token.colorBgTextHover,
        },

        [`&_close ${treeCls}-switcher-icon svg`]: {
          transform: 'rotate(-90deg)',
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
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            marginInlineStart: -1,
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""',
          },

          '&:after': {
            position: 'absolute',
            width: token.calc(token.calc(titleHeight).div(2).equal()).mul(0.8).equal(),
            height: token.calc(titleHeight).div(2).equal(),
            borderBottom: `1px solid ${token.colorBorder}`,
            content: '""',
          },
        },
      },

      // >>> Title
      // add `${treeCls}-checkbox + span` to cover checkbox `${checkboxCls} + span`
      [`${treeCls}-node-content-wrapper`]: {
        position: 'relative',
        minHeight: titleHeight,
        paddingBlock: 0,
        paddingInline: token.paddingXS,
        background: 'transparent',
        borderRadius: token.borderRadius,
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`,
        ...getDropIndicatorStyle(prefixCls, token),

        '&:hover': {
          backgroundColor: nodeHoverBg,
        },

        [`&${treeCls}-node-selected`]: {
          color: token.nodeSelectedColor,
          backgroundColor: nodeSelectedBg,
        },

        // Icon
        [`${treeCls}-iconEle`]: {
          display: 'inline-block',
          width: titleHeight,
          height: titleHeight,
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

      [`${treeNodeCls}.drop-container > [draggable]`]: {
        boxShadow: `0 0 0 2px ${token.colorPrimary}`,
      },

      // ==================== Show Line =====================
      '&-show-line': {
        // ================ Indent lines ================
        [`${treeCls}-indent-unit`]: {
          position: 'relative',
          height: '100%',

          '&:before': {
            position: 'absolute',
            top: 0,
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""',
          },

          '&-end:before': {
            display: 'none',
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

      [`${treeNodeCls}-leaf-last ${treeCls}-switcher-leaf-line:before`]: {
        top: 'auto !important',
        bottom: 'auto !important',
        height: `${unit(token.calc(titleHeight).div(2).equal())} !important`,
      },
    },
  };
};

// ============================== Merged ==============================
export const genTreeStyle = (
  prefixCls: string,
  token: AliasToken & TreeSharedToken & CSSUtil,
): CSSInterpolation => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;

  const treeNodePadding = token.calc(token.paddingXS).div(2).equal();

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
  const { controlHeightSM, controlItemBgHover, controlItemBgActive } = token;
  const titleHeight = controlHeightSM;

  return {
    titleHeight,
    indentSize: titleHeight,
    nodeHoverBg: controlItemBgHover,
    nodeHoverColor: token.colorText,
    nodeSelectedBg: controlItemBgActive,
    nodeSelectedColor: token.colorText,
  };
};

export const prepareComponentToken: GetDefaultToken<'Tree'> = (token) => {
  const { colorTextLightSolid, colorPrimary } = token;

  return {
    ...initComponentToken(token),
    directoryNodeSelectedColor: colorTextLightSolid,
    directoryNodeSelectedBg: colorPrimary,
  };
};

export default genStyleHooks(
  'Tree',
  (token, { prefixCls }) => [
    {
      [token.componentCls]: getCheckboxStyle(`${prefixCls}-checkbox`, token),
    },
    genTreeStyle(prefixCls, token),
    genCollapseMotion(token),
  ],
  prepareComponentToken,
);
