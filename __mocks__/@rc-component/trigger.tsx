import type { TriggerProps } from '@rc-component/trigger';
import MockTrigger from '@rc-component/trigger/es/mock';
import * as React from 'react';
import { TriggerMockContext } from '../../tests/shared/demoTestContext';

const { default: OriginTrigger } = await vi.importActual<typeof import('@rc-component/trigger')>(
  '@rc-component/trigger',
);

const ForwardTrigger = React.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  globalThis.triggerProps = props;

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
