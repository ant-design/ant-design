import React from 'react';

export interface DescriptionsContextProps {
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const DescriptionsContext = React.createContext<DescriptionsContextProps>({});

export default DescriptionsContext;
