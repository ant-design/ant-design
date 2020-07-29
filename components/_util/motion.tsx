import * as React from 'react';

type MotionFunc = (element: HTMLElement) => React.CSSProperties;
type MotionEndFunc = (element: HTMLElement, event: TransitionEvent) => boolean;

interface Motion {
  visible?: boolean;
  motionName?: string; // It also support object, but we only use string here.
  motionAppear?: boolean;
  motionEnter?: boolean;
  motionLeave?: boolean;
  motionLeaveImmediately?: boolean; // Trigger leave motion immediately
  motionDeadline?: number;
  removeOnLeave?: boolean;
  leavedClassName?: string;
  onAppearStart?: MotionFunc;
  onAppearActive?: MotionFunc;
  onAppearEnd?: MotionEndFunc;
  onEnterStart?: MotionFunc;
  onEnterActive?: MotionFunc;
  onEnterEnd?: MotionEndFunc;
  onLeaveStart?: MotionFunc;
  onLeaveActive?: MotionFunc;
  onLeaveEnd?: MotionEndFunc;
}

// ================== Collapse Motion ==================
const getCollapsedHeight: MotionFunc = () => ({ height: 0, opacity: 0 });
const getRealHeight: MotionFunc = node => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight: MotionFunc = node => ({ height: node.offsetHeight });
const skipOpacityTransition: MotionEndFunc = (_, event) => event.propertyName === 'height';

const collapseMotion: Motion = {
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
  motionDeadline: 500,
};

export default collapseMotion;
