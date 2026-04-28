import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { NotificationPlacements } from '../interface';
import type { NotificationPlacement } from '../interface';

type AxisProperty = 'top' | 'bottom' | 'left' | 'right';
type VerticalPlacement = Extract<AxisProperty, 'top' | 'bottom'>;
type HorizontalPlacement = Extract<AxisProperty, 'left' | 'right'>;
type PlacementMotionOffset = {
  x?: string;
  y?: string;
};

type PlacementStyleConfig = {
  placement: NotificationPlacement;
  vertical: VerticalPlacement;
  horizontal: HorizontalPlacement;
  motionOffset: PlacementMotionOffset;
};

const getMotionTransform = (motionOffset?: PlacementMotionOffset) => {
  const x = motionOffset?.x ?? '0';
  const y = motionOffset?.y ?? '0';

  return `translate3d(${x}, ${y}, 0) scale(var(--notification-scale, 1))`;
};

const getPlacementStyleConfig = (
  placement: NotificationPlacement,
  motionOffset: string,
): PlacementStyleConfig => {
  const vertical = placement.startsWith('bottom') ? 'bottom' : 'top';
  const horizontal = placement.endsWith('Right') ? 'right' : 'left';
  const isCenterPlacement = placement === 'top' || placement === 'bottom';
  const offset =
    placement === 'top' || placement.endsWith('Left') ? `-${motionOffset}` : motionOffset;

  return {
    placement,
    vertical,
    horizontal,
    motionOffset: isCenterPlacement ? { y: offset } : { x: offset },
  };
};

const getPlacementFlexDirection = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'column-reverse' : 'column';

const getPlacementTransformOrigin = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'center top' : 'center bottom';

const getPlacementStackClipPath = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'inset(-50% -50% 50% -50%)' : 'inset(50% -50% -50% -50%)';

const genPlacementStyle = (token: NotificationToken, config: PlacementStyleConfig): CSSObject => {
  const { componentCls } = token;
  const { placement, vertical, horizontal } = config;
  const noticeCls = `${componentCls}-notice`;
  const noticeMotionCls = `${noticeCls}${componentCls}-fade`;
  const enterTransform = getMotionTransform(config.motionOffset);
  const baseTransform = getMotionTransform();
  const transformOrigin = getPlacementTransformOrigin(vertical);

  return {
    [`&${componentCls}-${placement}`]: {
      display: 'flex',
      flexDirection: getPlacementFlexDirection(vertical),

      [noticeCls]: {
        [vertical]: 'var(--notification-y, 0)',
        [horizontal]: 'var(--notification-x, 0)',
        transformOrigin,
      },

      [`${noticeMotionCls}-appear-prepare, ${noticeMotionCls}-enter-prepare`]: {
        opacity: 0,
        transform: enterTransform,
        transition: 'none',
      },

      [`${noticeMotionCls}-appear-start, ${noticeMotionCls}-enter-start`]: {
        opacity: 0,
        transform: enterTransform,
      },

      [`${noticeMotionCls}-appear-active, ${noticeMotionCls}-enter-active`]: {
        opacity: 1,
        transform: baseTransform,
      },

      [`${noticeMotionCls}-leave-start`]: {
        opacity: 1,
        transform: baseTransform,
      },

      [`${noticeMotionCls}-leave-active`]: {
        opacity: 0,
        transform: enterTransform,
      },

      [`&${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
        [noticeCls]: {
          clipPath: getPlacementStackClipPath(vertical),
        },

        [`${noticeCls}[data-notification-index='0']`]: {
          clipPath: 'inset(-50% -50% -50% -50%)',
        },
      },
    },
  };
};

const genNotificationPlacementStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls, notificationMotionOffset } = token;
  const motionOffset = unit(notificationMotionOffset);

  return {
    [componentCls]: {
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        marginInline: 0,
      },
      ...NotificationPlacements.reduce<CSSObject>(
        (styles, placement) => ({
          ...styles,
          ...genPlacementStyle(token, getPlacementStyleConfig(placement, motionOffset)),
        }),
        {},
      ),
    },
  };
};

export default genNotificationPlacementStyle;
