import * as React from 'react';
import { createStyles } from 'antd-style';
import { toHex } from 'color2k';

interface ColorChunkProps {
  children?: React.ReactNode;
  value: string;
}

const useStyle = createStyles(({ token, css }) => ({
  codeSpan: css`
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    background: ${token.siteMarkdownCodeBg};
    border-radius: ${token.borderRadius}px;
    font-family: monospace;
  `,
  dot: css`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-inline-end: 4px;
    border: 1px solid ${token.colorSplit};
  `,
}));

const ColorChunk: React.FC<ColorChunkProps> = (props) => {
  const { styles } = useStyle();
  const { value, children } = props;

  const dotColor = React.useMemo(() => toHex(value || '#fff'), [value]);

  return (
    <span className={styles.codeSpan}>
      <span className={styles.dot} style={{ backgroundColor: dotColor }} />
      {children ?? dotColor}
    </span>
  );
};

export default ColorChunk;
