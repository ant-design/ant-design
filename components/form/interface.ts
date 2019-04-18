import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Omit } from '../_util/type';
import { FormComponentProps } from './Form';

// Copy from @types/react-redux https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts
export type ConnectedComponentClass<
  C extends React.ComponentType<any>,
  P
> = React.ComponentClass<JSX.LibraryManagedAttributes<C, P>> & hoistNonReactStatics.NonReactStatics<C> & {
  WrappedComponent: C;
};

export type FormWrappedProps<TOwnProps extends FormComponentProps> =
  <
    C extends React.ComponentType
  >(component: C)
  => ConnectedComponentClass<C, Omit<TOwnProps, keyof FormComponentProps>>;
