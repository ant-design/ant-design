import * as React from 'react';

interface HolderProps {
  onMount: () => void;
  onUnmount: () => void;
}
/**
 * A wrapper component to detect whether holder rendered in the view
 */
const Holder: React.FC<HolderProps> = ({ onMount, onUnmount, children }) => {
  React.useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

  return <>{children}</>;
};

export default Holder;
