import React from 'react';

export const useForceUpdate = () => {
  return React.useReducer((ori) => ori + 1, 0);
};
