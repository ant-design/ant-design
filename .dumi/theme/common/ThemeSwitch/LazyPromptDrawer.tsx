import React from 'react';

import type { PromptDrawerProps } from './PromptDrawer';

const PromptDrawer = React.lazy(() => import('./PromptDrawer'));

const LazyPromptDrawer: React.FC<PromptDrawerProps> = (props) => {
  const [hasOpened, setHasOpened] = React.useState(props.open);

  if (props.open && !hasOpened) {
    setHasOpened(true);
  }

  return hasOpened ? (
    <>
      <script async src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
      <React.Suspense fallback={null}>
        <PromptDrawer {...props} />
      </React.Suspense>
    </>
  ) : null;
};

export default LazyPromptDrawer;
