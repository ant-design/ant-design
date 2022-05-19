import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { NotificationToken } from '.';

const genNotificationPlacementStyle: GenerateStyle<NotificationToken, CSSObject> = token => {
  const { componentCls, notificationWidth, notificationMarginEdge } = token;

  const notificationTopFadeIn = new Keyframes('antNotificationTopFadeIn', {
    '0%': {
      marginTop: '-100%', // FIXME: hardcode in v4
      opacity: 0, // FIXME: hardcode in v4
    },

    '100%': {
      marginTop: 0, // FIXME: hardcode in v4
      opacity: 1, // FIXME: hardcode in v4
    },
  });

  const notificationBottomFadeIn = new Keyframes('antNotificationBottomFadeIn', {
    '0%': {
      marginBottom: '-100%', // FIXME: hardcode in v4
      opacity: 0, // FIXME: hardcode in v4
    },

    '100%': {
      marginBottom: 0, // FIXME: hardcode in v4
      opacity: 1, // FIXME: hardcode in v4
    },
  });

  const notificationLeftFadeIn = new Keyframes('antNotificationLeftFadeIn', {
    '0%': {
      right: {
        _skip_check_: true,
        value: notificationWidth,
      },
      opacity: 0, // FIXME: hardcode in v4
    },

    '100%': {
      right: {
        _skip_check_: true,
        value: 0, // FIXME: hardcode in v4
      },
      opacity: 1, // FIXME: hardcode in v4
    },
  });

  return {
    [`&${componentCls}-top, &${componentCls}-bottom`]: {
      // marginRight: 0,
      // marginLeft: 0,
      marginInline: '0 0', // FIXME: hardcode in v4
    },

    [`&${componentCls}-top`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]:
        {
          animationName: notificationTopFadeIn,
        },
    },

    [`&${componentCls}-bottom`]: {
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]:
        {
          animationName: notificationBottomFadeIn,
        },
    },

    [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
      // marginRight: 0,
      marginInlineEnd: 0, // FIXME: hardcode in v4
      // marginLeft: notificationMarginEdge,
      marginInlineStart: notificationMarginEdge,

      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]:
        {
          animationName: notificationLeftFadeIn,
        },
    },
  };
};
export default genNotificationPlacementStyle;
