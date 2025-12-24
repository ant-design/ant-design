import React from 'react';
import type { PortalProps, PortalRef } from '@rc-component/util/lib/Portal';
import { TriggerMockContext } from '../../../shared/demoTestContext';

const OriginPortalModule = jest.requireActual('@rc-component/util/lib/Portal');

const OriginPortal = OriginPortalModule.default ?? OriginPortalModule;

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

const CustomPortal = React.forwardRef<PortalRef, React.PropsWithChildren<PortalProps>>(
  (props, ref) => {
    const context = React.useContext(TriggerMockContext);
    if (context?.mock === false) {
      return <OriginPortal {...props} ref={ref} />;
    }
    return <MockPortal {...props} />;
  },
);

export default CustomPortal;
