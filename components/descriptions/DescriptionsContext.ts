import React from 'react';

export type CellSemanticType = {
  classNames?: {
    label?: string;
    content?: string;
  };
  styles?: {
    label?: React.CSSProperties;
    content?: React.CSSProperties;
  };
};

export interface DescriptionsContextProps {
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  classNames?: CellSemanticType['classNames'];
  styles?: CellSemanticType['styles'];
}

const DescriptionsContext = React.createContext<DescriptionsContextProps>(null!);

export default DescriptionsContext;
