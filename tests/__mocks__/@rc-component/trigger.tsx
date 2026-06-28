import { createRequire } from 'node:module';
import * as React from 'react';
import type { TriggerProps, TriggerRef } from '@rc-component/trigger';
import MockTrigger from '@rc-component/trigger/lib/mock';

import { TriggerMockContext } from '../../shared/demoTestContext';

const require = createRequire(import.meta.url);
let OriginTrigger: React.ComponentType<TriggerProps> | undefined;

function getOriginTrigger() {
  if (!OriginTrigger) {
    const TriggerModule = require('@rc-component/trigger/lib');
    OriginTrigger = TriggerModule.default ?? TriggerModule;
  }

  return OriginTrigger;
}

const ForwardTrigger = React.forwardRef<TriggerRef, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  (global as any).triggerProps = props;

  const mergedProps: TriggerProps = {
    ...props,
    popupVisible: mergedPopupVisible,
  };

  if (context?.mock === false) {
    const Trigger = getOriginTrigger() as React.ComponentType<
      TriggerProps & React.RefAttributes<TriggerRef>
    >;
    return <Trigger ref={ref} {...mergedProps} />;
  }

  return <MockTrigger ref={ref} {...mergedProps} />;
});

export * from '@rc-component/trigger/lib/mock';

export default ForwardTrigger;
