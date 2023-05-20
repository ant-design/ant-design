import type { TriggerProps } from 'rc-trigger';
import MockTrigger from 'rc-trigger/es/mock';
import * as React from 'react';
import { TriggerMockContext } from '../tests/shared/demoTestContext';

const { default: OriginTrigger } = await vi.importActual<typeof import('rc-trigger')>('rc-trigger');

const ForwardTrigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  globalThis.triggerProps = props as any;

  const mergedProps = {
    ...props,
    ref,
    popupVisible: mergedPopupVisible as boolean,
  };

  if (context?.mock === false) {
    return <OriginTrigger {...mergedProps} />;
  }
  return <MockTrigger {...mergedProps} />;
});

export default ForwardTrigger;
