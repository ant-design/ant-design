import type React from 'react';

import type { AlertProps } from './Alert';
import InternalAlert from './Alert';
import ErrorBoundary from './ErrorBoundary';

export type { AlertProps } from './Alert';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AlertProps & React.RefAttributes<HTMLDivElement>
> & {
  ErrorBoundary: typeof ErrorBoundary;
};

const Alert = InternalAlert as CompoundedComponent;

Alert.ErrorBoundary = ErrorBoundary;

export default Alert;
