import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const NpmIcon: React.FC<IconProps> = (props) => {
  const { className, style } = props;
  return (
    <svg
      className={className}
      style={style}
      fill="#E53E3E"
      focusable="false"
      height="1em"
      stroke="#E53E3E"
      strokeWidth="0"
      viewBox="0 0 16 16"
      width="1em"
    >
      <path d="M0 0v16h16v-16h-16zM13 13h-2v-8h-3v8h-5v-10h10v10z" />
    </svg>
  );
};

export default NpmIcon;
