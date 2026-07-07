import React from 'react';

interface SereneIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SereneIcon: React.FC<SereneIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      fill="none"
      role="img"
      focusable={false}
      {...props}
    >
      <circle cx="32" cy="32" r="31" fill="#f8f6f2" stroke="#e2dcd5" strokeWidth="1" />
      <circle cx="32" cy="30" r="14" fill="none" stroke="#312721" strokeWidth="2" />
      <circle cx="32" cy="46" r="3" fill="#c7a56b" />
    </svg>
  );
};
