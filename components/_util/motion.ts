import type {
  CSSMotionProps,
  MotionEndEventHandler,
  MotionEventHandler,
} from '@rc-component/motion';

import { defaultPrefixCls } from '../config-provider';
import { isPlainObject } from './is';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({
  height: 0,
  opacity: 0,
});

const getRealHeight: MotionEventHandler = (node) => ({
  height: node?.scrollHeight ?? 0,
  opacity: node ? 1 : 0,
});

const getCurrentHeight: MotionEventHandler = (node) => ({
  height: node?.offsetHeight ?? 0,
});

const isTransitionEvent = (event: Event): event is TransitionEvent => {
  return isPlainObject(event) && 'propertyName' in event;
};

const skipOpacityTransition: MotionEndEventHandler = (_, event) => {
  return (
    event?.deadline === true || (isTransitionEvent(event) ? event.propertyName === 'height' : false)
  );
};

const initCollapseMotion = (rootCls = defaultPrefixCls): CSSMotionProps => ({
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

const _SelectPlacements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const;

export type SelectCommonPlacement = (typeof _SelectPlacements)[number];

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};

export { getTransitionName };
export default initCollapseMotion;
