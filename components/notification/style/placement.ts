import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { NotificationPlacements } from '../interface';
import type { NotificationPlacement } from '../interface';

type AxisProperty = 'top' | 'bottom' | 'left' | 'right';
type VerticalPlacement = Extract<AxisProperty, 'top' | 'bottom'>;
type HorizontalPlacement = Extract<AxisProperty, 'left' | 'right'>;
type PlacementOffset = {
  blockEnd: VerticalPlacement;
  inlineEnd: HorizontalPlacement;
};

type PlacementStyleConfig = {
  placement: NotificationPlacement;
  vertical: VerticalPlacement;
  blockEnd: VerticalPlacement;
  horizontal: HorizontalPlacement;
  inlineEnd: HorizontalPlacement;
  enterX?: string;
  enterY?: string;
  baseX?: string;
  isCenterPlacement: boolean;
};

const MOTION_BASE_X = '--notification-motion-base-x';
const MOTION_BASE_Y = '--notification-motion-base-y';
const MOTION_ENTER_X = '--notification-motion-enter-x';
const MOTION_ENTER_Y = '--notification-motion-enter-y';

const getPlacementOffset = (
  vertical: VerticalPlacement,
  horizontal: HorizontalPlacement,
): PlacementOffset => ({
  blockEnd: vertical === 'top' ? 'bottom' : 'top',
  inlineEnd: horizontal === 'left' ? 'right' : 'left',
});

const getMotionTransform = (xVar: string, yVar: string) =>
  `translate3d(var(${xVar}, 0), var(${yVar}, 0), 0) scale(var(--notification-scale, 1))`;

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
    enterX: isCenterPlacement ? '-50%' : offset,
    enterY: isCenterPlacement ? offset : undefined,
    baseX: isCenterPlacement ? '-50%' : undefined,
    isCenterPlacement,
  };
};

const getPlacementFlexDirection = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'column-reverse' : 'column';

const getPlacementTransformOrigin = (vertical: VerticalPlacement) =>
  vertical === 'bottom' ? 'center top' : 'center bottom';

const getStackShadowClipOffset = (token: NotificationToken) =>
  unit(token.calc(token.marginXXL).mul(-1).equal());

const getStackNoticeClipPath = (token: NotificationToken) => {
  const offset = getStackShadowClipOffset(token);
  return `inset(${offset} ${offset} ${offset} ${offset})`;
};

const getPlacementStackClipPath = (token: NotificationToken, vertical: VerticalPlacement) => {
  const offset = getStackShadowClipOffset(token);

  return vertical === 'bottom'
    ? `inset(${offset} ${offset} 50% ${offset})`
    : `inset(50% ${offset} ${offset} ${offset})`;
};

const genPlacementStyle = (token: NotificationToken, config: PlacementStyleConfig): CSSObject => {
  const { componentCls } = token;
  const { placement, vertical, blockEnd, horizontal, inlineEnd } = config;
  const noticeCls = `${componentCls}-notice`;
  const baseTransform = getMotionTransform(MOTION_BASE_X, MOTION_BASE_Y);
  const transformOrigin = getPlacementTransformOrigin(vertical);

  return {
    [`&${componentCls}-${placement}`]: {
      ...(config.baseX && { [MOTION_BASE_X]: config.baseX }),
      ...(config.enterX && { [MOTION_ENTER_X]: config.enterX }),
      ...(config.enterY && { [MOTION_ENTER_Y]: config.enterY }),
      [vertical]: `var(--notification-${vertical}, 0)`,
      [blockEnd]: 'auto',
      display: 'flex',
      flexDirection: getPlacementFlexDirection(vertical),
      ...(config.isCenterPlacement
        ? {
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
        ...(config.isCenterPlacement
          ? {
              left: '50%',
              transform: baseTransform,
            }
          : {
              [horizontal]: 'var(--notification-x, 0)',
            }),
        transformOrigin,
      },

      [`&${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
        [noticeCls]: {
          clipPath: getPlacementStackClipPath(token, vertical),
        },

        [`${noticeCls}[data-notification-index='0']`]: {
          clipPath: getStackNoticeClipPath(token),
        },
      },
    },
  };
};

export const genNotificationPlacementRootStyle = (
  token: NotificationToken,
  placements: readonly NotificationPlacement[] = NotificationPlacements,
): CSSObject => {
  const { componentCls, notificationMotionOffset } = token;
  const noticeCls = `${componentCls}-notice`;
  const noticeMotionCls = `${noticeCls}${componentCls}-fade`;
  const motionOffset = unit(notificationMotionOffset);
  const centerPlacementCls = placements
    .filter((placement) => placement === 'top' || placement === 'bottom')
    .map((placement) => `&${componentCls}-${placement}`)
    .join(', ');
  const baseTransform = getMotionTransform(MOTION_BASE_X, MOTION_BASE_Y);
  const enterTransform = getMotionTransform(MOTION_ENTER_X, MOTION_ENTER_Y);

  return {
    ...(centerPlacementCls && {
      [centerPlacementCls]: {
        marginInline: 0,
      },
    }),

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

    ...placements.reduce<CSSObject>(
      (styles, placement) => ({
        ...styles,
        ...genPlacementStyle(token, getPlacementStyleConfig(placement, motionOffset)),
      }),
      {},
    ),
  };
};

const genNotificationPlacementStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: genNotificationPlacementRootStyle(token),
  };
};

export default genNotificationPlacementStyle;
