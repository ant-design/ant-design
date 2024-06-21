import { createStyles, css } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyle = createStyles(() => ({
  iconWrap: css`
    display: inline-flex;
    align-items: center;
    line-height: 0;
    text-align: center;
    vertical-align: -0.125em;
  `,
}));

const NpmIcon: React.FC<IconProps> = (props) => {
  const { className, style } = props;
  const { styles } = useStyle();
  return (
    <span className={classNames(styles.iconWrap, className)} style={style}>
      <svg
        fill="#E53E3E"
        focusable="false"
        height="1em"
        stroke="#E53E3E"
        strokeWidth="0"
        viewBox="0 0 16 16"
        width="1em"
      >
        <title>npm icon</title>
        <path d="M0 0v16h16v-16h-16zM13 13h-2v-8h-3v8h-5v-10h10v10z" />
      </svg>
    </span>
  );
};

export default NpmIcon;
