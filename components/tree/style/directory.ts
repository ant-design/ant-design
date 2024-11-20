import type { CSSObject } from '@ant-design/cssinjs';
import type { TreeToken } from '.';

// ============================ Directory =============================
export const genDirectoryStyle = ({
  treeCls,
  treeNodeCls,
  directoryNodeSelectedBg,
  directoryNodeSelectedColor,
  motionDurationMid,
  borderRadius,
  controlItemBgHover,
}: TreeToken): CSSObject => ({
  [`${treeCls}${treeCls}-directory ${treeNodeCls}`]: {
    // >>> Title
    [`${treeCls}-node-content-wrapper`]: {
      position: 'static',

      [`> *:not(${treeCls}-drop-indicator)`]: {
        position: 'relative',
      },

      '&:hover': {
        background: 'transparent',
      },

      // Expand interactive area to whole line
      '&:before': {
        position: 'absolute',
        inset: 0,
        transition: `background-color ${motionDurationMid}`,
        content: '""',
        borderRadius,
      },

      '&:hover:before': {
        background: controlItemBgHover,
      },
    },

    [`${treeCls}-switcher, ${treeCls}-checkbox, ${treeCls}-draggable-icon`]: {
      zIndex: 1,
    },

    // ============= Selected =============
    '&-selected': {
      [`${treeCls}-switcher, ${treeCls}-draggable-icon`]: {
        color: directoryNodeSelectedColor,
      },

      // >>> Title
      [`${treeCls}-node-content-wrapper`]: {
        color: directoryNodeSelectedColor,
        background: 'transparent',

        '&:before, &:hover:before': {
          background: directoryNodeSelectedBg,
        },
      },
    },
  },
});
