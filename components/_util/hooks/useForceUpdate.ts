import * as React from 'react';

const useForceUpdate = () => {
  return React.useReducer((ori) => ori + 1, 0);
};

export default useForceUpdate;
