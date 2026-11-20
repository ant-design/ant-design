import type {
  CSSMotionProps,
  MotionEndEventHandler,
  MotionEventHandler,
} from '@rc-component/motion';

import { defaultPrefixCls } from '../config-provider';
import { isTransitionEvent } from './is';

// ================== Collapse Motion ==================
const getCurrentHeight: MotionEventHandler = (node) => ({
  height: node?.offsetHeight ?? 0,
});

const skipOpacityTransition: MotionEndEventHandler = (_, event) => {
  return event?.deadline === true || (isTransitionEvent(event) && event.propertyName === 'height');
};

const initCollapseMotion = (rootCls = defaultPrefixCls, { fade = true } = {}): CSSMotionProps => {
  const getCollapsedHeight: MotionEventHandler = () => ({
    height: 0,
    opacity: fade ? 0 : undefined,
  });

  const getRealHeight: MotionEventHandler = (node) => ({
    height: node?.scrollHeight ?? 0,
    opacity: fade ? Number(Boolean(node)) : undefined,
  });

  return {
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
  };
};

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
