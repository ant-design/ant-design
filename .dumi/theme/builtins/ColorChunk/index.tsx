import * as React from 'react';
import { TinyColor, type ColorInput } from '@ctrl/tinycolor';
import { css } from '@emotion/react';
import useSiteToken from '../../../hooks/useSiteToken';

interface ColorChunkProps {
  children?: React.ReactNode;
  color?: ColorInput;
}

const useStyle = () => {
  const { token } = useSiteToken();

  return {
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
      border-radius: ${token.borderRadiusSM}px;
      margin-inline-end: 4px;
      border: 1px solid ${token.colorSplit};
    `,
  };
};

const ColorChunk: React.FC<ColorChunkProps> = (props) => {
  const styles = useStyle();
  const { color, children } = props;

  const dotColor = React.useMemo(() => {
    const _color = new TinyColor(color).toHex8String();
    return _color.endsWith('ff') ? _color.slice(0, -2) : _color;
  }, [color]);

  return (
    <span css={styles.codeSpan}>
      <span css={styles.dot} style={{ backgroundColor: dotColor }} />
      {children ?? dotColor}
    </span>
  );
};

export default ColorChunk;
