import React from 'react';
import type { PortalProps, PortalRef } from 'rc-util/lib/Portal';
import { TriggerMockContext } from '../../../shared/demoTestContext';

let OriginPortal = jest.requireActual('rc-util/lib/Portal');
OriginPortal = OriginPortal.default ?? OriginPortal;

class MockPortal extends React.Component<React.PropsWithChildren> {
  container: boolean | undefined;

  static contextType = TriggerMockContext;

  componentDidMount() {
    this.createContainer();
  }

  createContainer() {
    this.container = true;
    this.forceUpdate();
  }

  render() {
    const { children } = this.props;
    if (this.container) {
      return children;
    }
    return null;
  }
}

const CustomPortal = React.forwardRef<PortalRef, PortalProps | React.PropsWithChildren>((props, ref) => {
  const context = React.useContext(TriggerMockContext);
  if (context?.mock === false) {
    return <OriginPortal {...props} ref={ref} />;
  }
  return <MockPortal {...props} />;
});

export default CustomPortal;