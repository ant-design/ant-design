import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';
import type { ColorInput } from '@ant-design/fast-color';
import { createStyles } from 'antd-style';

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
    margin-inline-end: ${token.marginXXS}px;
    border: 1px solid ${token.colorSplit};
  `,
}));

interface ColorChunkProps {
  value: ColorInput;
}

const ColorChunk: React.FC<React.PropsWithChildren<ColorChunkProps>> = (props) => {
  const { styles } = useStyle();
  const { value, children } = props;

  const dotColor = React.useMemo(() => {
    const _color = new FastColor(value).toHexString();
    return _color.endsWith('ff') ? _color.slice(0, -2) : _color;
  }, [value]);

  return (
    <span className={styles.codeSpan}>
      <span className={styles.dot} style={{ backgroundColor: dotColor }} />
      {children ?? dotColor}
    </span>
  );
};

export default ColorChunk;
