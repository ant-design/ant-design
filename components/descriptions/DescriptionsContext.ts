import React from 'react';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';

export type SemanticName = 'label' | 'content';

export interface DescriptionsContextProps {
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  styles: SemanticStyles<SemanticName>;
  classNames: SemanticClassNames<SemanticName>;
}

const DescriptionsContext = React.createContext<DescriptionsContextProps>(null!);

export default DescriptionsContext;
