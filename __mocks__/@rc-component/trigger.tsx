import type { TriggerProps } from '@rc-component/trigger';
import MockTrigger from '@rc-component/trigger/es/mock';
import * as React from 'react';
import { TriggerMockContext } from '../../tests/shared/demoTestContext';

const { default: OriginTrigger } = await vi.importActual<typeof import('@rc-component/trigger')>(
  '@rc-component/trigger',
);

const ForwardTrigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  globalThis.triggerProps = props;

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
