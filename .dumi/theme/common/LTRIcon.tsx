import Icon from '@ant-design/icons';
import React from 'react';

const SVGIcon: React.FC = () => (
  <svg viewBox="0 0 1024 1024" fill="currentColor">
    <path d="M448 64l512 0 0 128-128 0 0 768-128 0 0-768-128 0 0 768-128 0 0-448c-123.712 0-224-100.288-224-224s100.288-224 224-224zM64 448l256 224-256 224z" />
  </svg>
);

const LTRIcon: React.FC<{ className?: string }> = (props) => (
  <Icon component={SVGIcon} {...props} />
);

export default LTRIcon;
