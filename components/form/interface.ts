import * as React from 'react';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
import { Omit } from '../_util/type';
import { WrappedFormInternalProps } from './Form';

// Copy from @types/react-redux https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts
export type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
      ? InjectedProps[P] extends DecorationTargetProps[P]
          ? DecorationTargetProps[P]
          : InjectedProps[P]
      : DecorationTargetProps[P];
};

export type GetProps<C> = C extends React.ComponentType<infer P> ? P : never;

export type ConnectedComponentClass<
  C extends React.ComponentType<any>,
  P
> = React.ComponentClass<JSX.LibraryManagedAttributes<C, P>> & hoistNonReactStatics.NonReactStatics<C> & {
  WrappedComponent: C;
};

export type FormWrappedProps<TOwnProps extends WrappedFormInternalProps> =
  <
    C extends React.ComponentType<Matching<TOwnProps, GetProps<C>>>
  >(component: C)
  => ConnectedComponentClass<C, Omit<TOwnProps, keyof WrappedFormInternalProps>>;
