import type { PropsWithChildren, ComponentType } from 'react';
import React from 'react';

type Components = ComponentType | [ComponentType, { [key: string]: any }];

export type ComposeProps = PropsWithChildren<{
  components: Components[];
}>;

// https://juliuskoronci.medium.com/avoid-a-long-list-of-react-providers-c45a269d80c1
const Compose = ({ components, children }: ComposeProps) =>
  components.reverse().reduce((acc, curr) => {
    const [Provider, props] = Array.isArray(curr) ? [curr[0], curr[1]] : [curr, {}];
    return React.createElement(Provider, props, acc);
  }, children);

export default Compose;
