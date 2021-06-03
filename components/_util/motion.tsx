import { CSSMotionProps, MotionEventHandler, MotionEndEventHandler } from 'rc-motion';
import { MotionEvent } from 'rc-motion/lib/interface';

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionEventHandler = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionEventHandler = node => {
  const { overflow } = node.style;

  // Force set `overflow` to `hidden` to get correct `scrollHeight`
  node.style.overflow = 'hidden';
  const target = { height: node.scrollHeight, opacity: 1 };

  node.style.overflow = overflow;

  return target;
};
const getCurrentHeight: MotionEventHandler = node => ({ height: node.offsetHeight });
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
  event?.deadline === true || (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  // motionDeadline: 500,
};

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
  if (transitionName !== undefined) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
export { getTransitionName };
export default collapseMotion;
