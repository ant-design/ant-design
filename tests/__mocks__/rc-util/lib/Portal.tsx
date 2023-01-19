import React from 'react';
import OriginPortal from 'rc-util/lib/Portal';
import { TriggerMockContext } from '../../../shared/demoTestContext';

class MockPortal extends React.Component<{ children?: React.ReactNode }> {
  container: boolean;

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

export default React.forwardRef((props: any, ref: any) => {
  const context = React.useContext(TriggerMockContext);

  if (context?.mock === false) {
    return <OriginPortal {...props} ref={ref} />;
  }

  return <MockPortal {...props} />;
});
