import React from 'react';
import Icon from '@ant-design/icons';

const SVGIcon: React.FC = () => (
  <svg viewBox="0 0 1024 1024" fill="currentColor">
    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
  </svg>
);

const CodeSandboxIcon: React.FC<{ className?: string }> = (props) => (
  <Icon component={SVGIcon} {...props} />
);

export default CodeSandboxIcon;
