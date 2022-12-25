import * as React from 'react';
import Trigger from 'rc-trigger/lib/mock';
import type { TriggerProps } from 'rc-trigger';
import { TriggerMockContext } from '../shared/demoTestContext';

const ForwardTrigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const mergedPopupVisible = React.useContext(TriggerMockContext) ?? props.popupVisible;
  (global as any).triggerProps = props;
  return <Trigger {...props} ref={ref} popupVisible={mergedPopupVisible as boolean} />;
});

export default ForwardTrigger;
