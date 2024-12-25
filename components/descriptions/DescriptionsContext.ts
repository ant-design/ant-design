import React from 'react';

export interface DescriptionsContextProps {
  /** @deprecated Please use `styles={{ label: {} }}` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles={{ content: {} }}` instead */
  contentStyle?: React.CSSProperties;
  styles?: {
    label?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  classNames?: {
    label?: string;
    content?: string;
  };
}

const DescriptionsContext = React.createContext<DescriptionsContextProps>({});

export default DescriptionsContext;
