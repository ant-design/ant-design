import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import type { NotificationToken } from '.';

const genNotificationHolderStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const {
    componentCls,
    notificationMarginEdge,
    motionDurationMid,
    motionDurationSlow,
    motionEaseInOut,
  } = token;

  const noticeCls = `${componentCls}-notice`;
  const listCls = `${componentCls}-list`;
  const listContentCls = `${listCls}-content`;
  const listWidth = token.calc(token.width).add(token.calc(notificationMarginEdge).mul(2)).equal();

  return {
    [componentCls]: {
      ...resetComponent(token),

      // ============================ Holder ============================
      position: 'fixed',
      zIndex: token.zIndexPopup,
      boxSizing: 'border-box',
      width: listWidth,
      maxWidth: '100vw',
      height: '100vh',
      overflow: 'hidden',
      overscrollBehavior: 'contain',
      pointerEvents: 'none',

      [`${componentCls}-hook-holder`]: {
        position: 'relative',
      },

      // ============================= List =============================
      [`&${listCls}`]: {
        maxHeight: '100vh',
        padding: notificationMarginEdge,
        overflowX: 'hidden',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',

        '&::-webkit-scrollbar': {
          display: 'none',
          width: 0,
          height: 0,
        },
      },

      [listContentCls]: {
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        gap: token.notificationMarginBottom,
        width: '100%',
        pointerEvents: 'none',
        willChange: 'height, transform',
        transition: 'none',

        [`&${listContentCls}-decrease`]: {
          transition: `height calc(${motionDurationSlow} * 2) ${motionEaseInOut} ${motionDurationMid}`,
        },
      },

      // ============================ Motion ============================
      [`${componentCls}-fade`]: {
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      },

      // ============================== RTL =============================
      '&-rtl': {
        direction: 'rtl',

        [`${noticeCls}-actions`]: {
          float: 'left',
        },
      },
    },
  };
};

export default genNotificationHolderStyle;
