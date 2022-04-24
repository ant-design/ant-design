import * as React from 'react';
import Trigger from 'rc-trigger/lib/mock';
import { TriggerMockContext } from '../shared/demoTest';

export default React.forwardRef((props, ref) => {
  const mergedPopupVisible = React.useContext(TriggerMockContext) ?? props.popupVisible;
  return <Trigger {...props} ref={ref} popupVisible={mergedPopupVisible} />;
});
