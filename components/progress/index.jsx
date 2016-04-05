import React from 'react';
import Line from './Line';
import Circle from './Circle';

const Progress = Line;
Progress.Line = Line;

Progress.Circle = (props) => {
  return <Circle {...props} />;
};

export default Progress;
