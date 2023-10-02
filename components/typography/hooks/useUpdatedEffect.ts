import * as React from 'react';

/** Similar with `useEffect` but only trigger after mounted */
const useUpdatedEffect = (callback: () => void, conditions?: React.DependencyList) => {
  const mountRef = React.useRef(false);

  React.useEffect(() => {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  }, conditions);
};

export default useUpdatedEffect;
