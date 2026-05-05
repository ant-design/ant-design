import type { CSSMotionProps } from '@rc-component/motion';
import type { AnimatedConfig } from '@rc-component/tabs/lib/interface';

import type { TabsProps } from '..';
import { isPlainObject } from '../../_util/is';
import { getTransitionName } from '../../_util/motion';

const motion: CSSMotionProps = {
  motionAppear: false,
  motionEnter: true,
  motionLeave: true,
};

export default function useAnimateConfig(
  prefixCls: string,
  animated: TabsProps['animated'] = {
    inkBar: true,
    tabPane: false,
  },
): AnimatedConfig {
  let mergedAnimated: AnimatedConfig;

  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false,
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true,
    };
  } else {
    mergedAnimated = {
      inkBar: true,
      ...(isPlainObject(animated) ? animated : {}),
    };
  }

  if (mergedAnimated.tabPane) {
    mergedAnimated.tabPaneMotion = {
      ...motion,
      motionName: getTransitionName(prefixCls, 'switch'),
    };
  }

  return mergedAnimated;
}
