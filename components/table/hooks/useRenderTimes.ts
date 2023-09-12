import React from 'react';

const useRenderTimes = () => {
  const renderTimes = React.useRef<number>(0);
  renderTimes.current += 1;
  return renderTimes.current;
};

export default useRenderTimes;
