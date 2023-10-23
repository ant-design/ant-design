import type { TriggerProps, TriggerRef } from '@rc-component/trigger';
import MockTrigger from '@rc-component/trigger/lib/mock';
import * as React from 'react';
import { TriggerMockContext } from '../../shared/demoTestContext';

let OriginTrigger = jest.requireActual('@rc-component/trigger');
OriginTrigger = OriginTrigger.default ?? OriginTrigger;

const ForwardTrigger = React.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  (global as any).triggerProps = props;

  const mergedProps: TriggerProps = {
    ...props,
    popupVisible: mergedPopupVisible,
  };

  if (context?.mock === false) {
    return <OriginTrigger ref={ref} {...mergedProps} />;
  }
  return <MockTrigger ref={ref} {...mergedProps} />;
});

export default ForwardTrigger;
