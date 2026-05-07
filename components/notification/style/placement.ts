import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { NotificationPlacements } from '../interface';
import type { NotificationPlacement } from '../interface';

type VerticalPlacement = 'top' | 'bottom';
type HorizontalPlacement = 'left' | 'right';

type PlacementOffset = {
  blockEnd: VerticalPlacement;
  inlineEnd: HorizontalPlacement;
};
type PlacementMotionOffset = {
  x?: string;
  y?: string;
};

type PlacementStyleConfig = {
  placement: NotificationPlacement;
  vertical: VerticalPlacement;
  blockEnd: VerticalPlacement;
  horizontal: HorizontalPlacement;
  inlineEnd: HorizontalPlacement;
  motionOffset: PlacementMotionOffset;
  baseMotionOffset?: PlacementMotionOffset;
  isCenterPlacement: boolean;
};

// ============================== Shared ==============================

/** Resolve the opposite block and inline edges for a placement. */
const getPlacementOffset = (
  vertical: VerticalPlacement,
  horizontal: HorizontalPlacement,
): PlacementOffset => ({
  blockEnd: vertical === 'top' ? 'bottom' : 'top',
  inlineEnd: horizontal === 'left' ? 'right' : 'left',
});

/** Convert placement offsets into the transform used by notice motion. */
const getMotionTransform = (motionOffset?: PlacementMotionOffset) => {
  const x = motionOffset?.x ?? '0';
  const y = motionOffset?.y ?? '0';

  return `translate3d(${x}, ${y}, 0)`;
};

/** Build the placement metadata used by position and motion styles. */
const getPlacementStyleConfig = (
  placement: NotificationPlacement,
  motionOffset: string,
): PlacementStyleConfig => {
  const vertical = placement.startsWith('bottom') ? 'bottom' : 'top';
  const horizontal = placement.endsWith('Right') ? 'right' : 'left';
  const { blockEnd, inlineEnd } = getPlacementOffset(vertical, horizontal);
  const isCenterPlacement = placement === 'top' || placement === 'bottom';
  const offset =
    placement === 'top' || placement.endsWith('Left') ? `-${motionOffset}` : motionOffset;

  return {
    placement,
    vertical,
    blockEnd,
    horizontal,
    inlineEnd,
    motionOffset: isCenterPlacement ? { x: '-50%', y: offset } : { x: offset },
    baseMotionOffset: isCenterPlacement ? { x: '-50%' } : undefined,
    isCenterPlacement,
  };
};

/** Get the list direction for a vertical placement. */
const getPlacementFlexDirection = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'column-reverse' : 'column';

/** Get the transform origin used by notice motion. */
const getPlacementTransformOrigin = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'center top' : 'center bottom';

// ============================= Placement =============================

/** Generate styles for a single notification placement. */
const genPlacementStyle = (token: NotificationToken, config: PlacementStyleConfig): CSSObject => {
  const { componentCls } = token;
  const {
    placement,
    vertical,
    blockEnd,
    horizontal,
    inlineEnd,
    // Horizontal centered
    isCenterPlacement,
  } = config;

  const noticeCls = `${componentCls}-notice`;
  const noticeMotionCls = `${noticeCls}${componentCls}-fade`;

  // Transform used for enter start and leave end states.
  const enterTransform = getMotionTransform(config.motionOffset);
  // Transform used when fully visible; top/bottom keep translateX(-50%) for centering.
  const baseTransform = getMotionTransform(config.baseMotionOffset);
  const transformOrigin = getPlacementTransformOrigin(vertical);

  return {
    [`&${componentCls}-${placement}`]: {
      [vertical]: `var(--notification-${vertical}, 0)`,
      [blockEnd]: 'auto',
      display: 'flex',
      flexDirection: getPlacementFlexDirection(vertical),
      ...(isCenterPlacement
        ? {
            marginInline: 0,
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
          }
        : {
            [horizontal]: 0,
            [inlineEnd]: 'auto',
          }),

      [noticeCls]: {
        [vertical]: 'var(--notification-y, 0)',
        ...(isCenterPlacement
          ? {
              left: '50%',
              transform: baseTransform,
            }
          : {
              [horizontal]: 'var(--notification-x, 0)',
            }),
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
    },
  };
};

/** Generate placement styles for all enabled notification placements. */
export const genNotificationPlacementRootStyle = (
  token: NotificationToken,
  placements: readonly NotificationPlacement[] = NotificationPlacements,
): CSSObject => {
  const { notificationMotionOffset } = token;
  const motionOffset = unit(notificationMotionOffset);

  return {
    ...placements.reduce<CSSObject>(
      (styles, placement) => ({
        ...styles,
        ...genPlacementStyle(token, getPlacementStyleConfig(placement, motionOffset)),
      }),
      {},
    ),
  };
};

// ============================== Export ==============================

/** Wrap placement styles under the component root selector. */
const genNotificationPlacementStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: genNotificationPlacementRootStyle(token),
  };
};

export default genNotificationPlacementStyle;
