import React from 'react';

export type SemanticName = 'label' | 'content';

export interface DescriptionsContextProps {
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  styles: Required<Record<SemanticName, React.CSSProperties>>;
  classNames: Required<Record<SemanticName, string>>;
}

const DescriptionsContext = React.createContext<DescriptionsContextProps>(null!);

export default DescriptionsContext;
