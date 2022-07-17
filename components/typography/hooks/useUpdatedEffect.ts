import * as React from 'react';

/** Similar with `useEffect` but only trigger after mounted */
export default (callback: () => void, conditions: any[]) => {
  const mountRef = React.useRef(false);

  React.useEffect(() => {
    if (mountRef.current) {
      callback();
    } else {
      mountRef.current = true;
    }
  }, conditions);
};
