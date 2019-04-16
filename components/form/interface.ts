import * as React from 'react';
import { Omit } from '../_util/type';
import hoistNonReactStatics from 'hoist-non-react-statics';

// Copy from @types/react-redux https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts
export type Matching<DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: DecorationTargetProps[P];
};

export type GetProps<C> = C extends React.ComponentType<infer P> ? P : never;

export type ConnectedComponentClass<
    C extends React.ComponentType<any>,
    P
> = React.ComponentClass<JSX.LibraryManagedAttributes<C, P>> & hoistNonReactStatics.NonReactStatics<C> & {
    WrappedComponent: C;
};

export type Shared<
    DecorationTargetProps
    > = {
        [P in keyof DecorationTargetProps]?: never;
    };

export type InferableComponentEnhancerWithProps<TNeedsProps> =
    <C extends React.ComponentType<Matching<GetProps<C>>>>(
        component: C
    ) => ConnectedComponentClass<C, Omit<GetProps<C>, keyof Shared<GetProps<C>>> & TNeedsProps>;
