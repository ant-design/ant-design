import type { CSSMotionProps, MotionEndEventHandler, MotionEventHandler } from 'rc-motion';
import type { MotionEvent } from 'rc-motion/lib/interface';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionEventHandler = (node) => {
  const { scrollHeight } = node;
  return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight: MotionEventHandler = (node) => ({ height: node ? node.offsetHeight : 0 });
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
  event?.deadline === true || (event as TransitionEvent).propertyName === 'height';

const initCollapseMotion = (rootCls: string = 'ant'): CSSMotionProps => ({
  motionName: `${rootCls}-motion-collapse`,
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
});

const SelectPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const;

export type SelectCommonPlacement = typeof SelectPlacements[number];

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};

export { getTransitionName };
export default initCollapseMotion;
