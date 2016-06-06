import React from 'react';
import Progress from './progress';
import warning from 'warning';

const AntProgress = Progress;

// For downward compatibility
AntProgress.Line = (props) => {
  warning(false, '<Progress.Line /> is deprecated, use <Progress type="line" /> instead.');
  return <Progress {...props} type="line" />;
};
AntProgress.Circle = (props) => {
  warning(false, '<Progress.Circle /> is deprecated, use <Progress type="circle" /> instead.');
  return <Progress {...props} type="circle" />;
};

export default AntProgress;
