import type React from 'react';

import type { AlertProps, AlertRef } from './Alert';
import InternalAlert from './Alert';
import ErrorBoundary from './ErrorBoundary';

export type { AlertProps } from './Alert';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AlertProps & React.RefAttributes<AlertRef>
> & {
  ErrorBoundary: typeof ErrorBoundary;
};

const Alert = InternalAlert as CompoundedComponent;

Alert.ErrorBoundary = ErrorBoundary;

export default Alert;
