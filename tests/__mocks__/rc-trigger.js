import * as React from 'react';
import Trigger from 'rc-trigger/lib/mock';
import { TriggerMockContext } from '../shared/demoTest';

export default function WrapperTrigger(props) {
  const mergedPopupVisible = React.useContext(TriggerMockContext) ?? props.popupVisible;
  return <Trigger {...props} popupVisible={mergedPopupVisible} />;
}
