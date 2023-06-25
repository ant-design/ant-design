import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const PnpmIcon: React.FC<IconProps> = (props) => {
  const { className, style } = props;
  return (
    <svg
      className={className}
      style={style}
      aria-hidden="true"
      fill="#F69220"
      focusable="false"
      height="1em"
      role="img"
      stroke="#F69220"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
    </svg>
  );
};

export default PnpmIcon;
