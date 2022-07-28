import * as React from 'react';
import Trigger from 'rc-trigger/lib/mock';
import { TriggerMockContext } from '../shared/demoTestContext';

export default React.forwardRef((props, ref) => {
  const mergedPopupVisible = React.useContext(TriggerMockContext) ?? props.popupVisible;
  global.triggerProps = props;
  return <Trigger {...props} ref={ref} popupVisible={mergedPopupVisible} />;
});
